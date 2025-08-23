const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  bengaliName: {
    type: String,
    required: [true, 'Bengali category name is required'],
    trim: true,
    maxlength: [150, 'Bengali category name cannot exceed 150 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  bengaliDescription: {
    type: String,
    maxlength: [750, 'Bengali description cannot exceed 750 characters']
  },
  
  // Hierarchy
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  ancestors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  level: {
    type: Number,
    default: 0,
    min: [0, 'Level cannot be negative']
  },
  
  // SEO and URL
  slug: {
    type: String,
    unique: true,
    required: [true, 'Category slug is required'],
    lowercase: true,
    trim: true
  },
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  
  // Visual Elements
  icon: String,
  image: {
    url: String,
    alt: String
  },
  banner: {
    url: String,
    alt: String
  },
  
  // Display Settings
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  showInMenu: {
    type: Boolean,
    default: true
  },
  showInFooter: {
    type: Boolean,
    default: false
  },
  
  // Product Counts
  productCount: {
    type: Number,
    default: 0
  },
  publishedProductCount: {
    type: Number,
    default: 0
  },
  
  // Category Type
  type: {
    type: String,
    enum: ['main', 'sub', 'sub-sub'],
    default: 'main'
  },
  
  // Target Audience
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex', 'children', 'all'],
    default: 'all'
  },
  ageGroup: {
    type: String,
    enum: ['infant', 'toddler', 'children', 'teen', 'adult', 'senior', 'all'],
    default: 'all'
  },
  
  // Seasonal Categories
  season: {
    type: String,
    enum: ['summer', 'winter', 'spring', 'autumn', 'all-season', 'festival'],
    default: 'all-season'
  },
  
  // Festival Categories (Bangladesh specific)
  festival: {
    type: String,
    enum: ['eid', 'pohela-boishakh', 'durga-puja', 'christmas', 'none'],
    default: 'none'
  },
  
  // Size Guide
  sizeGuide: {
    hasSizeGuide: {
      type: Boolean,
      default: false
    },
    guideUrl: String,
    sizeChart: [{
      size: String,
      chest: Number,
      waist: Number,
      length: Number,
      shoulder: Number
    }]
  },
  
  // Filters and Attributes
  filters: [{
    name: String,
    type: {
      type: String,
      enum: ['range', 'checkbox', 'radio', 'select']
    },
    values: [String],
    isRequired: {
      type: Boolean,
      default: false
    }
  }],
  
  // Timestamps
  lastProductUpdate: Date
}, {
  timestamps: true
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ level: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ isActive: 1, showInMenu: 1 });
categorySchema.index({ type: 1, gender: 1 });
categorySchema.index({ season: 1, festival: 1 });

// Virtual for full path
categorySchema.virtual('fullPath').get(function() {
  if (this.ancestors.length === 0) {
    return this.name;
  }
  
  const ancestorNames = this.ancestors.map(ancestor => ancestor.name);
  return [...ancestorNames, this.name].join(' > ');
});

// Virtual for bengali full path
categorySchema.virtual('bengaliFullPath').get(function() {
  if (this.ancestors.length === 0) {
    return this.bengaliName;
  }
  
  const ancestorNames = this.ancestors.map(ancestor => ancestor.bengaliName);
  return [...ancestorNames, this.bengaliName].join(' > ');
});

// Virtual for has children
categorySchema.virtual('hasChildren').get(function() {
  return this.type !== 'sub-sub';
});

// Pre-save middleware to update ancestors and level
categorySchema.pre('save', async function(next) {
  if (this.isModified('parent')) {
    if (this.parent) {
      const parentCategory = await this.constructor.findById(this.parent);
      if (parentCategory) {
        this.level = parentCategory.level + 1;
        this.ancestors = [...parentCategory.ancestors, parentCategory._id];
      }
    } else {
      this.level = 0;
      this.ancestors = [];
    }
  }
  
  // Update type based on level
  if (this.level === 0) {
    this.type = 'main';
  } else if (this.level === 1) {
    this.type = 'sub';
  } else {
    this.type = 'sub-sub';
  }
  
  next();
});

// Method to get children
categorySchema.methods.getChildren = function() {
  return this.constructor.find({ parent: this._id, isActive: true })
    .sort({ displayOrder: 1, name: 1 });
};

// Method to get all descendants
categorySchema.methods.getAllDescendants = async function() {
  const descendants = [];
  
  const getDescendants = async (categoryId) => {
    const children = await this.constructor.find({ parent: categoryId, isActive: true });
    for (const child of children) {
      descendants.push(child);
      await getDescendants(child._id);
    }
  };
  
  await getDescendants(this._id);
  return descendants;
};

// Method to get siblings
categorySchema.methods.getSiblings = function() {
  return this.constructor.find({ 
    parent: this.parent, 
    _id: { $ne: this._id },
    isActive: true 
  }).sort({ displayOrder: 1, name: 1 });
};

// Method to update product count
categorySchema.methods.updateProductCount = async function() {
  const Product = mongoose.model('Product');
  
  const totalCount = await Product.countDocuments({ category: this._id });
  const publishedCount = await Product.countDocuments({ 
    category: this._id, 
    status: 'published' 
  });
  
  this.productCount = totalCount;
  this.publishedProductCount = publishedCount;
  this.lastProductUpdate = new Date();
  
  return this.save();
};

// Static method to get main categories
categorySchema.statics.getMainCategories = function() {
  return this.find({ 
    level: 0, 
    isActive: true,
    showInMenu: true 
  })
  .sort({ displayOrder: 1, name: 1 })
  .populate('children', 'name bengaliName slug image isActive');
};

// Static method to get category tree
categorySchema.statics.getCategoryTree = function() {
  return this.find({ 
    level: 0, 
    isActive: true 
  })
  .sort({ displayOrder: 1, name: 1 })
  .populate({
    path: 'children',
    match: { isActive: true },
    options: { sort: { displayOrder: 1, name: 1 } },
    populate: {
      path: 'children',
      match: { isActive: true },
      options: { sort: { displayOrder: 1, name: 1 } }
    }
  });
};

// Static method to get featured categories
categorySchema.statics.getFeaturedCategories = function(limit = 6) {
  return this.find({ 
    isFeatured: true, 
    isActive: true,
    level: 0 
  })
  .sort({ displayOrder: 1, name: 1 })
  .limit(limit);
};

// Static method to get categories by gender
categorySchema.statics.getByGender = function(gender) {
  return this.find({ 
    gender: { $in: [gender, 'all'] },
    isActive: true,
    level: 0 
  })
  .sort({ displayOrder: 1, name: 1 });
};

// Static method to get seasonal categories
categorySchema.statics.getSeasonalCategories = function(season) {
  return this.find({ 
    season: { $in: [season, 'all-season'] },
    isActive: true,
    level: 0 
  })
  .sort({ displayOrder: 1, name: 1 });
};

// Static method to get festival categories
categorySchema.statics.getFestivalCategories = function() {
  return this.find({ 
    festival: { $ne: 'none' },
    isActive: true,
    level: 0 
  })
  .sort({ displayOrder: 1, name: 1 });
};

module.exports = mongoose.model('Category', categorySchema);