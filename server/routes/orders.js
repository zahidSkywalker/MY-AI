const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { validateOrder, validateAddress } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order from cart
// @access  Private
router.post('/', [auth, validateOrder], async (req, res) => {
  try {
    const {
      shippingAddress,
      billingAddress,
      paymentMethod,
      specialInstructions,
      couponCode
    } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart || cart.isEmpty) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty or not found'
      });
    }

    // Check item availability
    await cart.checkItemAvailability();
    const unavailableItems = cart.items.filter(item => !item.isAvailable);
    if (unavailableItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some items in your cart are not available',
        data: { unavailableItems }
      });
    }

    // Prepare order data
    const orderData = {
      customer: req.user.id,
      customerInfo: {
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        phone: req.user.phone
      },
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      orderItems: cart.items.map(item => ({
        product: item.product,
        name: item.name,
        bengaliName: item.bengaliName,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        originalPrice: item.originalPrice,
        discountPercentage: item.discountPercentage,
        discountAmount: item.discountAmount,
        finalPrice: item.finalPrice,
        size: item.size,
        color: item.color,
        image: item.image
      })),
      subtotal: cart.subtotal,
      discountAmount: cart.discountAmount,
      couponDiscount: cart.couponDiscount,
      shippingCost: cart.shippingCost,
      taxAmount: cart.taxAmount,
      totalAmount: cart.totalAmount,
      paymentMethod,
      specialInstructions,
      appliedCoupon: cart.appliedCoupon
    };

    // Create order
    const order = new Order(orderData);
    await order.save();

    // Update product stock
    for (const item of cart.items) {
      await Product.updateStock(item.product, item.quantity, 'decrease');
    }

    // Clear cart
    await cart.clearCart();

    // Populate order with product details
    await order.populate('orderItems.product', 'name bengaliName images sku');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { customer: req.user.id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('orderItems.product', 'name bengaliName images sku')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalOrders: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product', 'name bengaliName images sku description specifications')
      .populate('customer', 'firstName lastName email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { order }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed', 'processing'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Update order status
    await order.updateStatus('cancelled', {
      reason,
      cancelledBy: req.user.id,
      cancelledAt: new Date()
    });

    // Restore product stock
    for (const item of order.orderItems) {
      await Product.updateStock(item.product, item.quantity, 'increase');
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
});

// @route   PUT /api/orders/:id/return
// @desc    Request return for order
// @access  Private
router.put('/:id/return', auth, async (req, res) => {
  try {
    const { reason, items, returnType } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order is delivered
    if (order.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order must be delivered to request return'
      });
    }

    // Check if return is within allowed timeframe (e.g., 7 days)
    const deliveryDate = new Date(order.shippingInfo.deliveredAt);
    const daysSinceDelivery = (Date.now() - deliveryDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceDelivery > 7) {
      return res.status(400).json({
        success: false,
        message: 'Return period has expired (7 days from delivery)'
      });
    }

    // Add return request
    order.returnInfo = {
      requestedAt: new Date(),
      reason,
      items: items || order.orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        returnReason: reason
      })),
      returnType: returnType || 'refund', // refund or exchange
      status: 'pending'
    };

    await order.save();

    res.json({
      success: true,
      message: 'Return request submitted successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Request return error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while requesting return'
    });
  }
});

// @route   GET /api/orders/:id/tracking
// @desc    Get order tracking information
// @access  Private
router.get('/:id/tracking', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const trackingInfo = {
      orderNumber: order.orderNumber,
      status: order.status,
      statusHistory: order.statusHistory,
      estimatedDelivery: order.getEstimatedDelivery(),
      shippingInfo: order.shippingInfo,
      currentLocation: order.shippingInfo.currentLocation,
      lastUpdate: order.shippingInfo.lastUpdate
    };

    res.json({
      success: true,
      data: { trackingInfo }
    });

  } catch (error) {
    console.error('Get tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tracking information'
    });
  }
});

// @route   POST /api/orders/:id/review
// @desc    Add review to order items
// @access  Private
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { reviews } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order is delivered
    if (order.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order must be delivered to add review'
      });
    }

    // Add reviews to order items
    for (const review of reviews) {
      const orderItem = order.orderItems.id(review.orderItemId);
      if (orderItem) {
        orderItem.review = {
          rating: review.rating,
          comment: review.comment,
          bengaliComment: review.bengaliComment,
          photos: review.photos || [],
          createdAt: new Date()
        };
      }
    }

    await order.save();

    res.json({
      success: true,
      message: 'Reviews added successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    });
  }
});

// @route   GET /api/orders/status/:status
// @desc    Get orders by status
// @access  Private
router.get('/status/:status', auth, async (req, res) => {
  try {
    const { status } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ 
      customer: req.user.id, 
      status: status 
    })
      .populate('orderItems.product', 'name bengaliName images sku')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments({ 
      customer: req.user.id, 
      status: status 
    });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalOrders: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get orders by status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders by status'
    });
  }
});

// @route   GET /api/orders/recent
// @desc    Get recent orders
// @access  Private
router.get('/recent', auth, async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const recentOrders = await Order.getRecentOrders(req.user.id, parseInt(limit));

    res.json({
      success: true,
      data: { orders: recentOrders }
    });

  } catch (error) {
    console.error('Get recent orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recent orders'
    });
  }
});

// @route   GET /api/orders/statistics
// @desc    Get order statistics for user
// @access  Private
router.get('/statistics', auth, async (req, res) => {
  try {
    const stats = await Order.getOrderStatistics(req.user.id);

    res.json({
      success: true,
      data: { statistics: stats }
    });

  } catch (error) {
    console.error('Get order statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order statistics'
    });
  }
});

// Admin routes
// @route   GET /api/orders/admin/all
// @desc    Get all orders (admin only)
// @access  Admin
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, customer, dateFrom, dateTo } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (status) query.status = status;
    if (customer) query.customer = customer;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email phone')
      .populate('orderItems.product', 'name bengaliName sku')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalOrders: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Admin get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching all orders'
    });
  }
});

// @route   PUT /api/orders/admin/:id/status
// @desc    Update order status (admin only)
// @access  Admin
router.put('/admin/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    await order.updateStatus(status, {
      adminNote,
      updatedBy: req.user.id
    });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Admin update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
});

// @route   PUT /api/orders/admin/:id/tracking
// @desc    Update order tracking (admin only)
// @access  Admin
router.put('/admin/:id/tracking', adminAuth, async (req, res) => {
  try {
    const { trackingNumber, courier, currentLocation, status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update tracking info
    order.shippingInfo = {
      ...order.shippingInfo,
      trackingNumber,
      courier,
      currentLocation,
      lastUpdate: new Date()
    };

    if (status) {
      await order.updateStatus(status, {
        adminNote: 'Tracking updated',
        updatedBy: req.user.id
      });
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order tracking updated successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Admin update tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating tracking'
    });
  }
});

module.exports = router;