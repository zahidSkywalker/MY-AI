const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { auth, optionalAuth } = require('../middleware/auth');
const { validateProduct, validateSearch } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', validateSearch, async (req, res) => {
  try {
    const {
      q,
      category,
      gender,
      minPrice,
      maxPrice,
      brand,
      material,
      season,
      festival,
      isNew,
      isFeatured,
      isBestSeller,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { status: 'published' };

    // Search query
    if (q) {
      filter.$text = { $search: q };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Gender filter
    if (gender) {
      filter.gender = gender;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Brand filter
    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }

    // Material filter
    if (material) {
      filter.material = { $regex: material, $options: 'i' };
    }

    // Season filter
    if (season) {
      filter.season = season;
    }

    // Festival filter
    if (festival) {
      filter.festival = festival;
    }

    // Special filters
    if (isNew === 'true') filter.isNew = true;
    if (isFeatured === 'true') filter.isFeatured = true;
    if (isBestSeller === 'true') filter.isBestSeller = true;

    // Build sort object
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

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
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
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
});

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.findFeatured(parseInt(limit));
    
    res.json({
      success: true,
      data: { products }
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured products'
    });
  }
});

// @route   GET /api/products/new-arrivals
// @desc    Get new arrival products
// @access  Public
router.get('/new-arrivals', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.findNewArrivals(parseInt(limit));
    
    res.json({
      success: true,
      data: { products }
    });

  } catch (error) {
    console.error('Get new arrivals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching new arrivals'
    });
  }
});

// @route   GET /api/products/best-sellers
// @desc    Get best seller products
// @access  Public
router.get('/best-sellers', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = await Product.findBestSellers(parseInt(limit));
    
    res.json({
      success: true,
      data: { products }
    });

  } catch (error) {
    console.error('Get best sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching best sellers'
    });
  }
});

// @route   GET /api/products/search
// @desc    Search products with advanced filters
// @access  Public
router.get('/search', validateSearch, async (req, res) => {
  try {
    const {
      q,
      category,
      gender,
      minPrice,
      maxPrice,
      brand,
      material,
      season,
      festival,
      size,
      color,
      sortBy = 'relevance',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    if (!q && !category && !gender && !brand) {
      return res.status(400).json({
        success: false,
        message: 'At least one search parameter is required'
      });
    }

    // Build filter object
    const filter = { status: 'published' };

    // Text search
    if (q) {
      filter.$text = { $search: q };
    }

    // Apply other filters
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (material) filter.material = { $regex: material, $options: 'i' };
    if (season) filter.season = season;
    if (festival) filter.festival = festival;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Size and color filters
    if (size) {
      filter['sizes.size'] = size;
      filter['sizes.available'] = true;
    }
    if (color) {
      filter['colors.name'] = { $regex: color, $options: 'i' };
      filter['colors.available'] = true;
    }

    // Build sort object
    let sort = {};
    if (sortBy === 'relevance' && q) {
      // Sort by text score if searching
      sort = { score: { $meta: 'textScore' } };
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute search
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
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts: total,
          hasNextPage,
          hasPrevPage,
          limit: parseInt(limit)
        },
        filters: {
          query: q,
          category,
          gender,
          priceRange: { min: minPrice, max: maxPrice },
          brand,
          material,
          season,
          festival,
          size,
          color
        }
      }
    });

  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching products'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name bengaliName slug')
      .populate('subcategory', 'name bengaliName slug')
      .select('-__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is published
    if (product.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count (you can implement this as needed)
    // product.viewCount = (product.viewCount || 0) + 1;
    // await product.save();

    res.json({
      success: true,
      data: { product }
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
});

// @route   GET /api/products/slug/:slug
// @desc    Get product by slug
// @access  Public
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category', 'name bengaliName slug')
      .populate('subcategory', 'name bengaliName slug')
      .select('-__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if product is published
    if (product.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });

  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
});

// @route   GET /api/products/category/:categorySlug
// @desc    Get products by category
// @access  Public
router.get('/category/:categorySlug', validateSearch, async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const {
      gender,
      minPrice,
      maxPrice,
      brand,
      material,
      season,
      festival,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    // Find category by slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Build filter object
    const filter = { 
      status: 'published',
      category: category._id
    };

    // Apply filters
    if (gender) filter.gender = gender;
    if (brand) filter.brand = { $regex: brand, $options: 'i' };
    if (material) filter.material = { $regex: material, $options: 'i' };
    if (season) filter.season = season;
    if (festival) filter.festival = festival;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Build sort object
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
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products by category'
    });
  }
});

// @route   GET /api/products/related/:id
// @desc    Get related products
// @access  Public
router.get('/related/:id', async (req, res) => {
  try {
    const { limit = 8 } = req.query;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find related products based on category, gender, and brand
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      status: 'published',
      $or: [
        { category: product.category },
        { gender: product.gender },
        { brand: product.brand }
      ]
    })
    .populate('category', 'name bengaliName slug')
    .sort({ averageRating: -1, totalReviews: -1 })
    .limit(parseInt(limit))
    .select('-__v');

    res.json({
      success: true,
      data: { products: relatedProducts }
    });

  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching related products'
    });
  }
});

// @route   GET /api/products/trending
// @desc    Get trending products based on views and sales
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    // This is a simplified trending algorithm
    // In production, you might want to use more sophisticated metrics
    const trendingProducts = await Product.find({
      status: 'published',
      isInStock: true
    })
    .populate('category', 'name bengaliName slug')
    .sort({ 
      averageRating: -1, 
      totalReviews: -1, 
      createdAt: -1 
    })
    .limit(parseInt(limit))
    .select('-__v');

    res.json({
      success: true,
      data: { products: trendingProducts }
    });

  } catch (error) {
    console.error('Get trending products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching trending products'
    });
  }
});

module.exports = router;