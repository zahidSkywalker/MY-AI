const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  bengaliName: {
    type: String,
    required: [true, 'Bengali product name is required'],
    trim: true,
    maxlength: [300, 'Bengali product name cannot exceed 300 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  bengaliDescription: {
    type: String,
    maxlength: [3000, 'Bengali description cannot exceed 3000 characters']
  },
  
  // Categorization
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discountPercentage: {
    type: Number,
    min: [0, 'Discount percentage cannot be negative'],
    max: [100, 'Discount percentage cannot exceed 100%']
  },
  discountAmount: {
    type: Number,
    min: [0, 'Discount amount cannot be negative']
  },
  
  // Inventory
  sku: {
    type: String,
    unique: true,
    required: [true, 'SKU is required']
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative'],
    default: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: [0, 'Low stock threshold cannot be negative']
  },
  isInStock: {
    type: Boolean,
    default: true
  },
  
  // Variants
  variants: [{
    name: String, // e.g., "Size", "Color", "Fabric"
    values: [String], // e.g., ["S", "M", "L"] or ["Red", "Blue", "Green"]
    required: {
      type: Boolean,
      default: false
    }
  }],
  
  // Size and Color Options
  sizes: [{
    size: String,
    available: {
      type: Boolean,
      default: true
    },
    stockQuantity: {
      type: Number,
      default: 0
    }
  }],
  colors: [{
    name: String,
    hexCode: String,
    available: {
      type: Boolean,
      default: true
    },
    stockQuantity: {
      type: Number,
      default: 0
    }
  }],
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // Specifications
  specifications: [{
    name: String,
    value: String,
    bengaliName: String,
    bengaliValue: String
  }],
  
  // Measurements
  measurements: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch', 'mm'],
      default: 'cm'
    }
  },
  
  // Material and Care
  material: {
    type: String,
    required: [true, 'Material information is required']
  },
  careInstructions: [String],
  fabricType: String,
  season: {
    type: String,
    enum: ['summer', 'winter', 'spring', 'autumn', 'all-season']
  },
  
  // Target Audience
  gender: {
    type: String,
    enum: ['male', 'female', 'unisex', 'children'],
    required: true
  },
  ageGroup: {
    type: String,
    enum: ['infant', 'toddler', 'children', 'teen', 'adult', 'senior']
  },
  
  // Brand and Origin
  brand: {
    type: String,
    required: [true, 'Brand name is required']
  },
  madeIn: {
    type: String,
    default: 'Bangladesh'
  },
  
  // Ratings and Reviews
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  
  // SEO and Marketing
  metaTitle: String,
  metaDescription: String,
  keywords: [String],
  slug: {
    type: String,
    unique: true,
    required: [true, 'Product slug is required']
  },
  
  // Status and Visibility
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  
  // Shipping and Returns
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  shippingClass: {
    type: String,
    enum: ['light', 'standard', 'heavy', 'oversized'],
    default: 'standard'
  },
  returnPolicy: {
    type: String,
    enum: ['7days', '14days', '30days', 'no-return'],
    default: '14days'
  },
  
  // Vendor Information
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  
  // Timestamps
  publishedAt: Date,
  lastStockUpdate: Date
}, {
  timestamps: true
});

// Indexes
productSchema.index({ name: 'text', bengaliName: 'text', description: 'text', bengaliDescription: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ isFeatured: 1, status: 1 });
productSchema.index({ isNew: 1, status: 1 });
productSchema.index({ isBestSeller: 1, status: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ sku: 1 });

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discountPercentage > 0) {
    return this.price - (this.price * this.discountPercentage / 100);
  }
  return this.price;
});

// Virtual for discount amount
productSchema.virtual('calculatedDiscountAmount').get(function() {
  if (this.discountPercentage > 0) {
    return this.price * this.discountPercentage / 100;
  }
  return 0;
});

// Virtual for is on sale
productSchema.virtual('isOnSale').get(function() {
  return this.discountPercentage > 0 || this.originalPrice > this.price;
});

// Pre-save middleware to calculate discount amount
productSchema.pre('save', function(next) {
  if (this.discountPercentage > 0) {
    this.discountAmount = this.price * this.discountPercentage / 100;
  }
  
  if (this.originalPrice && this.originalPrice > this.price) {
    this.discountPercentage = ((this.originalPrice - this.price) / this.originalPrice) * 100;
  }
  
  // Update stock status
  this.isInStock = this.stockQuantity > 0;
  
  next();
});

// Method to update stock
productSchema.methods.updateStock = function(quantity, operation = 'decrease') {
  if (operation === 'decrease') {
    this.stockQuantity = Math.max(0, this.stockQuantity - quantity);
  } else if (operation === 'increase') {
    this.stockQuantity += quantity;
  }
  
  this.isInStock = this.stockQuantity > 0;
  this.lastStockUpdate = new Date();
  
  return this.save();
};

// Method to check if product is available in specific size/color
productSchema.methods.isAvailableInVariant = function(size, color) {
  if (size) {
    const sizeVariant = this.sizes.find(s => s.size === size);
    if (!sizeVariant || !sizeVariant.available || sizeVariant.stockQuantity <= 0) {
      return false;
    }
  }
  
  if (color) {
    const colorVariant = this.colors.find(c => c.name === color);
    if (!colorVariant || !colorVariant.available || colorVariant.stockQuantity <= 0) {
      return false;
    }
  }
  
  return true;
};

// Method to get primary image
productSchema.methods.getPrimaryImage = function() {
  const primaryImage = this.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.url : (this.images[0] ? this.images[0].url : null);
};

// Static method to find featured products
productSchema.statics.findFeatured = function(limit = 10) {
  return this.find({ 
    status: 'published', 
    isFeatured: true,
    isInStock: true 
  })
  .populate('category', 'name bengaliName')
  .limit(limit)
  .sort({ createdAt: -1 });
};

// Static method to find new arrivals
productSchema.statics.findNewArrivals = function(limit = 10) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return this.find({ 
    status: 'published',
    isNew: true,
    createdAt: { $gte: thirtyDaysAgo },
    isInStock: true 
  })
  .populate('category', 'name bengaliName')
  .limit(limit)
  .sort({ createdAt: -1 });
};

// Static method to find best sellers
productSchema.statics.findBestSellers = function(limit = 10) {
  return this.find({ 
    status: 'published',
    isBestSeller: true,
    isInStock: true 
  })
  .populate('category', 'name bengaliName')
  .limit(limit)
  .sort({ averageRating: -1, totalReviews: -1 });
};

module.exports = mongoose.model('Product', productSchema);