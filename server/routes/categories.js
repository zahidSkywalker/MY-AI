const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      level = 0, 
      gender, 
      season, 
      festival, 
      isActive = true,
      showInMenu = true 
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (level !== undefined) filter.level = parseInt(level);
    if (gender) filter.gender = gender;
    if (season) filter.season = season;
    if (festival) filter.festival = festival;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (showInMenu !== undefined) filter.showInMenu = showInMenu === 'true';

    const categories = await Category.find(filter)
      .sort({ displayOrder: 1, name: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

// @route   GET /api/categories/tree
// @desc    Get category tree structure
// @access  Public
router.get('/tree', async (req, res) => {
  try {
    const categoryTree = await Category.getCategoryTree();
    
    res.json({
      success: true,
      data: { categories: categoryTree }
    });

  } catch (error) {
    console.error('Get category tree error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category tree'
    });
  }
});

// @route   GET /api/categories/main
// @desc    Get main categories for navigation
// @access  Public
router.get('/main', async (req, res) => {
  try {
    const mainCategories = await Category.getMainCategories();
    
    res.json({
      success: true,
      data: { categories: mainCategories }
    });

  } catch (error) {
    console.error('Get main categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching main categories'
    });
  }
});

// @route   GET /api/categories/featured
// @desc    Get featured categories
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const featuredCategories = await Category.getFeaturedCategories(parseInt(limit));
    
    res.json({
      success: true,
      data: { categories: featuredCategories }
    });

  } catch (error) {
    console.error('Get featured categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured categories'
    });
  }
});

// @route   GET /api/categories/gender/:gender
// @desc    Get categories by gender
// @access  Public
router.get('/gender/:gender', async (req, res) => {
  try {
    const { gender } = req.params;
    
    if (!['male', 'female', 'unisex', 'children'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid gender parameter'
      });
    }
    
    const categories = await Category.getByGender(gender);
    
    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories by gender error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories by gender'
    });
  }
});

// @route   GET /api/categories/season/:season
// @desc    Get categories by season
// @access  Public
router.get('/season/:season', async (req, res) => {
  try {
    const { season } = req.params;
    
    if (!['summer', 'winter', 'spring', 'autumn', 'all-season'].includes(season)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid season parameter'
      });
    }
    
    const categories = await Category.getSeasonalCategories(season);
    
    res.json({
      success: true,
      data: { categories }
    });

  } catch (error) {
    console.error('Get categories by season error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories by season'
    });
  }
});

// @route   GET /api/categories/festival
// @desc    Get festival categories
// @access  Public
router.get('/festival', async (req, res) => {
  try {
    const festivalCategories = await Category.getFestivalCategories();
    
    res.json({
      success: true,
      data: { categories: festivalCategories }
    });

  } catch (error) {
    console.error('Get festival categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching festival categories'
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name bengaliName slug')
      .select('-__v');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Get children categories
    const children = await category.getChildren();

    // Get products count
    const productCount = await Product.countDocuments({ 
      category: category._id, 
      status: 'published' 
    });

    res.json({
      success: true,
      data: { 
        category,
        children,
        productCount
      }
    });

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category'
    });
  }
});

// @route   GET /api/categories/slug/:slug
// @desc    Get category by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('parent', 'name bengaliName slug')
      .select('-__v');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Get children categories
    const children = await category.getChildren();

    // Get products count
    const productCount = await Product.countDocuments({ 
      category: category._id, 
      status: 'published' 
    });

    res.json({
      success: true,
      data: { 
        category,
        children,
        productCount
      }
    });

  } catch (error) {
    console.error('Get category by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category'
    });
  }
});

// @route   GET /api/categories/:id/children
// @desc    Get children categories
// @access  Public
router.get('/:id/children', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const children = await category.getChildren();
    
    res.json({
      success: true,
      data: { categories: children }
    });

  } catch (error) {
    console.error('Get children categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching children categories'
    });
  }
});

// @route   GET /api/categories/:id/descendants
// @desc    Get all descendant categories
// @access  Public
router.get('/:id/descendants', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const descendants = await category.getAllDescendants();
    
    res.json({
      success: true,
      data: { categories: descendants }
    });

  } catch (error) {
    console.error('Get descendant categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching descendant categories'
    });
  }
});

// @route   GET /api/categories/:id/siblings
// @desc    Get sibling categories
// @access  Public
router.get('/:id/siblings', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const siblings = await category.getSiblings();
    
    res.json({
      success: true,
      data: { categories: siblings }
    });

  } catch (error) {
    console.error('Get sibling categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching sibling categories'
    });
  }
});

// @route   GET /api/categories/:id/products
// @desc    Get products in a category
// @access  Public
router.get('/:id/products', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;

    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Build filter
    const filter = { 
      category: category._id, 
      status: 'published' 
    };

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(filter)
      .populate('category', 'name bengaliName slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count
    const total = await Product.countDocuments(filter);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        category,
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts: total,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category products'
    });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private (Admin only)
router.post('/', adminAuth, validateCategory, async (req, res) => {
  try {
    const categoryData = req.body;

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug: categoryData.slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this slug already exists'
      });
    }

    // Create new category
    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating category'
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Private (Admin only)
router.put('/:id', adminAuth, validateCategory, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if slug already exists (if changed)
    if (req.body.slug && req.body.slug !== category.slug) {
      const existingCategory = await Category.findOne({ slug: req.body.slug });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this slug already exists'
        });
      }
    }

    // Update category
    Object.assign(category, req.body);
    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has children
    const children = await category.getChildren();
    if (children.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with subcategories'
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with products'
      });
    }

    // Delete category
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
});

// @route   PUT /api/categories/:id/status
// @desc    Update category status
// @access  Private (Admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean value'
      });
    }

    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    category.isActive = isActive;
    await category.save();

    res.json({
      success: true,
      message: `Category ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: { category }
    });

  } catch (error) {
    console.error('Update category status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category status'
    });
  }
});

// @route   PUT /api/categories/reorder
// @desc    Reorder categories
// @access  Private (Admin only)
router.put('/reorder', adminAuth, async (req, res) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: 'Categories must be an array'
      });
    }

    // Update display order for each category
    for (const item of categories) {
      await Category.findByIdAndUpdate(item.id, { displayOrder: item.order });
    }

    res.json({
      success: true,
      message: 'Categories reordered successfully'
    });

  } catch (error) {
    console.error('Reorder categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while reordering categories'
    });
  }
});

module.exports = router;