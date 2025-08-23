const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const { adminAuth } = require('../middleware/auth');
const { validateProduct, validateCategory } = require('../middleware/validation');

const router = express.Router();

// Dashboard Statistics
// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Admin
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('customer', 'firstName lastName email')
      .populate('orderItems.product', 'name sku')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get revenue statistics
    const revenueStats = await Order.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    // Get monthly revenue for chart
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Get top selling products
    const topProducts = await Product.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'orderItems.product',
          as: 'orders'
        }
      },
      {
        $project: {
          name: 1,
          bengaliName: 1,
          sku: 1,
          totalSold: { $size: '$orders' },
          revenue: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'order',
                in: {
                  $multiply: [
                    { $arrayElemAt: ['$order.orderItems.quantity', 0] },
                    { $arrayElemAt: ['$order.orderItems.finalPrice', 0] }
                  ]
                }
              }
            }
          }
        }
      },
      {
        $sort: { totalSold: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const dashboardData = {
      counts: {
        users: totalUsers,
        products: totalProducts,
        categories: totalCategories,
        orders: totalOrders
      },
      revenue: revenueStats[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0
      },
      recentOrders,
      monthlyRevenue,
      topProducts
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
});

// User Management
// @route   GET /api/admin/users
// @desc    Get all users with pagination and filters
// @access  Admin
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, role, status, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(query)
      .select('-password')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalUsers: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status
// @access  Admin
router.put('/users/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.status = status;
    if (adminNote) {
      user.adminNotes = user.adminNotes || [];
      user.adminNotes.push({
        note: adminNote,
        addedBy: req.user.id,
        addedAt: new Date()
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'User status updated successfully',
      data: { user }
    });

  } catch (error) {
    console.error('Admin update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status'
    });
  }
});

// Product Management
// @route   POST /api/admin/products
// @desc    Create new product
// @access  Admin
router.post('/products', [adminAuth, validateProduct], async (req, res) => {
  try {
    const productData = req.body;
    
    // Generate SKU if not provided
    if (!productData.sku) {
      productData.sku = await generateSKU(productData.category, productData.name);
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Admin create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Admin
router.put('/products/:id', [adminAuth, validateProduct], async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    Object.assign(product, updateData);
    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Admin update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Admin
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product has orders
    const hasOrders = await Order.exists({ 'orderItems.product': id });
    if (hasOrders) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete product with existing orders'
      });
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Admin delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
});

// @route   PUT /api/admin/products/:id/status
// @desc    Update product status
// @access  Admin
router.put('/products/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.status = status;
    await product.save();

    res.json({
      success: true,
      message: 'Product status updated successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Admin update product status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product status'
    });
  }
});

// Category Management
// @route   POST /api/admin/categories
// @desc    Create new category
// @access  Admin
router.post('/categories', [adminAuth, validateCategory], async (req, res) => {
  try {
    const categoryData = req.body;
    
    // Generate slug if not provided
    if (!categoryData.slug) {
      categoryData.slug = generateSlug(categoryData.name);
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Admin create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating category'
    });
  }
});

// @route   PUT /api/admin/categories/:id
// @desc    Update category
// @access  Admin
router.put('/categories/:id', [adminAuth, validateCategory], async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Update category
    Object.assign(category, updateData);
    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Admin update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
});

// @route   DELETE /api/admin/categories/:id
// @desc    Delete category
// @access  Admin
router.delete('/categories/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has products
    const hasProducts = await Product.exists({ category: id });
    if (hasProducts) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with existing products'
      });
    }

    // Check if category has children
    const hasChildren = await Category.exists({ parent: id });
    if (hasChildren) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with subcategories'
      });
    }

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Admin delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
});

// Order Management
// @route   GET /api/admin/orders
// @desc    Get all orders with filters
// @access  Admin
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, customer, dateFrom, dateTo, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (status) query.status = status;
    if (customer) query.customer = customer;
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email phone')
      .populate('orderItems.product', 'name bengaliName sku')
      .sort(sortOptions)
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
    console.error('Admin get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote, trackingInfo } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const order = await Order.findById(id);
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

    // Update tracking info if provided
    if (trackingInfo) {
      order.shippingInfo = {
        ...order.shippingInfo,
        ...trackingInfo,
        lastUpdate: new Date()
      };
    }

    await order.save();

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

// Analytics and Reports
// @route   GET /api/admin/analytics/sales
// @desc    Get sales analytics
// @access  Admin
router.get('/analytics/sales', adminAuth, async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    } else {
      // Default to current period
      const now = new Date();
      let start;
      
      switch (period) {
        case 'week':
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          start = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
        case 'year':
          start = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          start = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      dateFilter = {
        createdAt: { $gte: start }
      };
    }

    // Sales data
    const salesData = await Order.aggregate([
      { $match: { ...dateFilter, status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          items: { $sum: { $size: '$orderItems' } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Top products by revenue
    const topProducts = await Order.aggregate([
      { $match: { ...dateFilter, status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          revenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.finalPrice'] } },
          quantity: { $sum: '$orderItems.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          bengaliName: '$product.bengaliName',
          sku: '$product.sku',
          revenue: 1,
          quantity: 1
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 }
    ]);

    // Customer analytics
    const customerAnalytics = await Order.aggregate([
      { $match: { ...dateFilter, status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] } } },
      {
        $group: {
          _id: '$customer',
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          averageOrderValue: { $avg: '$totalAmount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          email: '$user.email',
          totalOrders: 1,
          totalSpent: 1,
          averageOrderValue: 1
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 }
    ]);

    const analytics = {
      salesData,
      topProducts,
      customerAnalytics,
      period,
      dateRange: {
        start: dateFilter.createdAt?.$gte || new Date(),
        end: dateFilter.createdAt?.$lte || new Date()
      }
    };

    res.json({
      success: true,
      data: analytics
    });

  } catch (error) {
    console.error('Admin get sales analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sales analytics'
    });
  }
});

// Utility functions
async function generateSKU(categoryId, productName) {
  try {
    const category = await Category.findById(categoryId);
    const categoryCode = category ? category.code || category.name.substring(0, 3).toUpperCase() : 'GEN';
    const productCode = productName.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    
    return `${categoryCode}-${productCode}-${timestamp}-${random}`;
  } catch (error) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `GEN-${timestamp}-${random}`;
  }
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

module.exports = router;