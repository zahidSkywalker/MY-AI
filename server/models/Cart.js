const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // User Information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Cart Items
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    bengaliName: String,
    sku: String,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, 'Unit price cannot be negative']
    },
    originalPrice: Number,
    discountPercentage: Number,
    discountAmount: Number,
    finalPrice: {
      type: Number,
      required: true
    },
    size: String,
    color: String,
    image: String,
    totalPrice: {
      type: Number,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    availabilityNote: String
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    default: 0,
    min: [0, 'Subtotal cannot be negative']
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, 'Discount amount cannot be negative']
  },
  couponCode: String,
  couponDiscount: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cost cannot be negative']
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: [0, 'Tax amount cannot be negative']
  },
  totalAmount: {
    type: Number,
    default: 0,
    min: [0, 'Total amount cannot be negative']
  },
  
  // Cart Settings
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: function() {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // Cart expires in 30 days
      return expiryDate;
    }
  },
  
  // Shipping Information
  shippingAddress: {
    type: {
      type: String,
      enum: ['home', 'office', 'other'],
      default: 'home'
    },
    name: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    district: String,
    postalCode: String,
    country: {
      type: String,
      default: 'Bangladesh'
    }
  },
  
  // Shipping Method
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'pickup'],
    default: 'standard'
  },
  
  // Coupon Information
  appliedCoupon: {
    code: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      default: 'percentage'
    },
    discountValue: Number,
    minimumAmount: Number,
    maximumDiscount: Number,
    validUntil: Date
  },
  
  // Timestamps
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
cartSchema.index({ user: 1 });
cartSchema.index({ expiresAt: 1 });
cartSchema.index({ isActive: 1 });

// Virtual for item count
cartSchema.virtual('itemCount').get(function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Virtual for unique product count
cartSchema.virtual('uniqueProductCount').get(function() {
  return this.items.length;
});

// Virtual for is empty
cartSchema.virtual('isEmpty').get(function() {
  return this.items.length === 0;
});

// Virtual for is expired
cartSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiresAt;
});

// Virtual for can apply coupon
cartSchema.virtual('canApplyCoupon').get(function() {
  if (!this.appliedCoupon) return true;
  return this.subtotal >= (this.appliedCoupon.minimumAmount || 0);
});

// Pre-save middleware to calculate totals
cartSchema.pre('save', function(next) {
  // Calculate item totals
  this.items.forEach(item => {
    item.totalPrice = item.finalPrice * item.quantity;
  });
  
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Calculate total amount
  this.totalAmount = this.subtotal + this.shippingCost + this.taxAmount - this.discountAmount - this.couponDiscount;
  
  // Update last updated timestamp
  this.lastUpdated = new Date();
  
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = function(productData) {
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === productData.product.toString() &&
    item.size === productData.size &&
    item.color === productData.color
  );
  
  if (existingItemIndex !== -1) {
    // Update existing item quantity
    this.items[existingItemIndex].quantity += productData.quantity;
    this.items[existingItemIndex].totalPrice = this.items[existingItemIndex].finalPrice * this.items[existingItemIndex].quantity;
  } else {
    // Add new item
    this.items.push({
      ...productData,
      totalPrice: productData.finalPrice * productData.quantity
    });
  }
  
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateItemQuantity = function(itemId, newQuantity) {
  if (newQuantity < 1) {
    return this.removeItem(itemId);
  }
  
  const item = this.items.id(itemId);
  if (item) {
    item.quantity = newQuantity;
    item.totalPrice = item.finalPrice * newQuantity;
  }
  
  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId);
  return this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.subtotal = 0;
  this.discountAmount = 0;
  this.couponCode = null;
  this.couponDiscount = 0;
  this.shippingCost = 0;
  this.taxAmount = 0;
  this.totalAmount = 0;
  this.appliedCoupon = null;
  
  return this.save();
};

// Method to apply coupon
cartSchema.methods.applyCoupon = function(coupon) {
  if (this.subtotal < (coupon.minimumAmount || 0)) {
    throw new Error(`Minimum order amount of ৳${coupon.minimumAmount} required`);
  }
  
  this.appliedCoupon = {
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    minimumAmount: coupon.minimumAmount,
    maximumDiscount: coupon.maximumDiscount,
    validUntil: coupon.validUntil
  };
  
  if (coupon.discountType === 'percentage') {
    this.couponDiscount = Math.min(
      (this.subtotal * coupon.discountValue) / 100,
      coupon.maximumDiscount || Infinity
    );
  } else {
    this.couponDiscount = Math.min(coupon.discountValue, this.subtotal);
  }
  
  return this.save();
};

// Method to remove coupon
cartSchema.methods.removeCoupon = function() {
  this.appliedCoupon = null;
  this.couponDiscount = 0;
  return this.save();
};

// Method to update shipping address
cartSchema.methods.updateShippingAddress = function(address) {
  this.shippingAddress = address;
  return this.save();
};

// Method to update shipping method
cartSchema.methods.updateShippingMethod = function(method) {
  this.shippingMethod = method;
  
  // Update shipping cost based on method
  switch (method) {
    case 'express':
      this.shippingCost = 200; // Express shipping cost
      break;
    case 'standard':
      this.shippingCost = this.subtotal >= 1000 ? 0 : 100; // Free shipping above ৳1000
      break;
    case 'pickup':
      this.shippingCost = 0; // No shipping cost for pickup
      break;
  }
  
  return this.save();
};

// Method to check item availability
cartSchema.methods.checkItemAvailability = async function() {
  const Product = mongoose.model('Product');
  
  for (let item of this.items) {
    try {
      const product = await Product.findById(item.product);
      if (!product || !product.isInStock) {
        item.isAvailable = false;
        item.availabilityNote = 'Product out of stock';
      } else if (item.size && !product.isAvailableInVariant(item.size, item.color)) {
        item.isAvailable = false;
        item.availabilityNote = 'Selected variant not available';
      } else {
        item.isAvailable = true;
        item.availabilityNote = '';
      }
    } catch (error) {
      item.isAvailable = false;
      item.availabilityNote = 'Product not found';
    }
  }
  
  return this.save();
};

// Method to get cart summary
cartSchema.methods.getCartSummary = function() {
  return {
    itemCount: this.itemCount,
    uniqueProductCount: this.uniqueProductCount,
    subtotal: this.subtotal,
    discountAmount: this.discountAmount,
    couponDiscount: this.couponDiscount,
    shippingCost: this.shippingCost,
    taxAmount: this.taxAmount,
    totalAmount: this.totalAmount,
    isEmpty: this.isEmpty,
    isExpired: this.isExpired
  };
};

// Static method to get cart by user
cartSchema.statics.getByUser = function(userId) {
  return this.findOne({ user: userId, isActive: true })
    .populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock')
    .populate('user', 'firstName lastName email phone');
};

// Static method to get expired carts
cartSchema.statics.getExpiredCarts = function() {
  return this.find({ 
    expiresAt: { $lt: new Date() },
    isActive: true 
  });
};

// Static method to clean expired carts
cartSchema.statics.cleanExpiredCarts = async function() {
  const expiredCarts = await this.getExpiredCarts();
  
  for (const cart of expiredCarts) {
    cart.isActive = false;
    await cart.save();
  }
  
  return expiredCarts.length;
};

module.exports = mongoose.model('Cart', cartSchema);