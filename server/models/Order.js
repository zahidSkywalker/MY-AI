const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order Information
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  orderType: {
    type: String,
    enum: ['regular', 'pre-order', 'custom'],
    default: 'regular'
  },
  
  // Customer Information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerInfo: {
    firstName: String,
    lastName: String,
    bengaliName: String,
    email: String,
    phone: String
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
  
  // Billing Information
  billingAddress: {
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
  
  // Order Items
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
    }
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    required: true,
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
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  
  // Payment Information
  paymentMethod: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'paypal', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  paymentDetails: {
    transactionId: String,
    paymentGateway: String,
    paymentDate: Date,
    gatewayResponse: mongoose.Schema.Types.Mixed
  },
  
  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded'],
    default: 'pending'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Shipping Information
  shippingMethod: {
    type: String,
    enum: ['standard', 'express', 'pickup'],
    default: 'standard'
  },
  courier: {
    name: String,
    trackingNumber: String,
    trackingUrl: String
  },
  estimatedDelivery: Date,
  actualDelivery: Date,
  
  // Special Instructions
  specialInstructions: String,
  giftMessage: String,
  isGift: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  orderDate: {
    type: Date,
    default: Date.now
  },
  confirmedAt: Date,
  processedAt: Date,
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  
  // Cancellation/Return
  cancellationReason: String,
  returnReason: String,
  refundAmount: Number,
  refundDate: Date,
  
  // Admin Notes
  adminNotes: [{
    note: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Analytics
  source: {
    type: String,
    enum: ['web', 'mobile', 'app', 'phone'],
    default: 'web'
  },
  referrer: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ orderDate: -1 });
orderSchema.index({ 'courier.trackingNumber': 1 });

// Virtual for order summary
orderSchema.virtual('orderSummary').get(function() {
  return {
    orderNumber: this.orderNumber,
    status: this.status,
    totalAmount: this.totalAmount,
    itemCount: this.items.length,
    orderDate: this.orderDate
  };
});

// Virtual for is delivered
orderSchema.virtual('isDelivered').get(function() {
  return this.status === 'delivered';
});

// Virtual for is cancelled
orderSchema.virtual('isCancelled').get(function() {
  return this.status === 'cancelled';
});

// Virtual for is returnable
orderSchema.virtual('isReturnable').get(function() {
  if (this.status !== 'delivered') return false;
  
  const deliveryDate = this.actualDelivery || this.deliveredAt;
  if (!deliveryDate) return false;
  
  const returnDeadline = new Date(deliveryDate);
  returnDeadline.setDate(returnDeadline.getDate() + 14); // 14 days return policy
  
  return new Date() <= returnDeadline;
});

// Pre-save middleware to generate order number
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    this.orderNumber = `BD${year}${month}${day}${random}`;
  }
  
  // Calculate totals
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  this.totalAmount = this.subtotal + this.shippingCost + this.taxAmount - this.discountAmount - this.couponDiscount;
  
  next();
});

// Method to add status update
orderSchema.methods.addStatusUpdate = function(status, note, adminId = null) {
  this.status = status;
  this.statusHistory.push({
    status,
    note,
    updatedBy: adminId,
    timestamp: new Date()
  });
  
  // Update specific timestamps
  switch (status) {
    case 'confirmed':
      this.confirmedAt = new Date();
      break;
    case 'processing':
      this.processedAt = new Date();
      break;
    case 'shipped':
      this.shippedAt = new Date();
      break;
    case 'delivered':
      this.deliveredAt = new Date();
      break;
    case 'cancelled':
      this.cancelledAt = new Date();
      break;
  }
  
  return this.save();
};

// Method to add admin note
orderSchema.methods.addAdminNote = function(note, adminId) {
  this.adminNotes.push({
    note,
    admin: adminId,
    timestamp: new Date()
  });
  
  return this.save();
};

// Method to update payment status
orderSchema.methods.updatePaymentStatus = function(status, paymentDetails = {}) {
  this.paymentStatus = status;
  
  if (status === 'completed') {
    this.paymentDetails = {
      ...this.paymentDetails,
      ...paymentDetails,
      paymentDate: new Date()
    };
  }
  
  return this.save();
};

// Method to add tracking information
orderSchema.methods.addTrackingInfo = function(courierName, trackingNumber, trackingUrl) {
  this.courier = {
    name: courierName,
    trackingNumber,
    trackingUrl
  };
  
  return this.save();
};

// Method to calculate estimated delivery
orderSchema.methods.calculateEstimatedDelivery = function() {
  const orderDate = this.orderDate;
  const estimatedDelivery = new Date(orderDate);
  
  switch (this.shippingMethod) {
    case 'express':
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 2); // 2 days
      break;
    case 'standard':
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days
      break;
    case 'pickup':
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 1); // 1 day
      break;
    default:
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days
  }
  
  this.estimatedDelivery = estimatedDelivery;
  return this.save();
};

// Static method to get orders by status
orderSchema.statics.getByStatus = function(status, limit = 20) {
  return this.find({ status })
    .populate('customer', 'firstName lastName email phone')
    .populate('items.product', 'name bengaliName images')
    .sort({ orderDate: -1 })
    .limit(limit);
};

// Static method to get orders by customer
orderSchema.statics.getByCustomer = function(customerId, limit = 20) {
  return this.find({ customer: customerId })
    .populate('items.product', 'name bengaliName images')
    .sort({ orderDate: -1 })
    .limit(limit);
};

// Static method to get recent orders
orderSchema.statics.getRecentOrders = function(limit = 10) {
  return this.find({ status: { $nin: ['cancelled', 'returned'] } })
    .populate('customer', 'firstName lastName email')
    .populate('items.product', 'name images')
    .sort({ orderDate: -1 })
    .limit(limit);
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);
  
  return stats.reduce((acc, stat) => {
    acc[stat._id] = {
      count: stat.count,
      totalAmount: stat.totalAmount
    };
    return acc;
  }, {});
};

module.exports = mongoose.model('Order', orderSchema);