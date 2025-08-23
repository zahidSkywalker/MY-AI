const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.getByUser(req.user.id);
    
    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({ user: req.user.id });
      await cart.save();
    }

    // Check item availability
    await cart.checkItemAvailability();

    res.json({
      success: true,
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart'
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      cart = new Cart({ user: req.user.id });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.isInStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock'
      });
    }

    // Check if product is available in selected size/color
    if (size || color) {
      if (!product.isAvailableInVariant(size, color)) {
        return res.status(400).json({
          success: false,
          message: 'Selected variant is not available'
        });
      }
    }

    // Prepare item data
    const itemData = {
      product: productId,
      name: product.name,
      bengaliName: product.bengaliName,
      sku: product.sku,
      quantity: parseInt(quantity),
      unitPrice: product.price,
      originalPrice: product.originalPrice,
      discountPercentage: product.discountPercentage,
      discountAmount: product.discountAmount,
      finalPrice: product.discountedPrice || product.price,
      size,
      color,
      image: product.getPrimaryImage()
    };

    // Add item to cart
    await cart.addItem(itemData);

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding item to cart'
    });
  }
});

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Update item quantity
    await cart.updateItemQuantity(itemId, parseInt(quantity));

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart item'
    });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Remove item
    await cart.removeItem(itemId);

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing cart item'
    });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart
// @access  Private
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Clear cart
    await cart.clearCart();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart'
    });
  }
});

// @route   POST /api/cart/apply-coupon
// @desc    Apply coupon to cart
// @access  Private
router.post('/apply-coupon', auth, async (req, res) => {
  try {
    const { couponCode } = req.body;

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code is required'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // TODO: Validate coupon from database
    // For now, using mock coupon data
    const mockCoupon = {
      code: couponCode,
      discountType: 'percentage',
      discountValue: 10,
      minimumAmount: 1000,
      maximumDiscount: 500,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };

    // Apply coupon
    await cart.applyCoupon(mockCoupon);

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Apply coupon error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while applying coupon'
    });
  }
});

// @route   DELETE /api/cart/remove-coupon
// @desc    Remove coupon from cart
// @access  Private
router.delete('/remove-coupon', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Remove coupon
    await cart.removeCoupon();

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Coupon removed successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Remove coupon error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing coupon'
    });
  }
});

// @route   PUT /api/cart/shipping-address
// @desc    Update shipping address in cart
// @access  Private
router.put('/shipping-address', auth, async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Update shipping address
    await cart.updateShippingAddress(shippingAddress);

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Shipping address updated successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Update shipping address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating shipping address'
    });
  }
});

// @route   PUT /api/cart/shipping-method
// @desc    Update shipping method in cart
// @access  Private
router.put('/shipping-method', auth, async (req, res) => {
  try {
    const { shippingMethod } = req.body;

    if (!shippingMethod) {
      return res.status(400).json({
        success: false,
        message: 'Shipping method is required'
      });
    }

    if (!['standard', 'express', 'pickup'].includes(shippingMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shipping method'
      });
    }

    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    // Update shipping method
    await cart.updateShippingMethod(shippingMethod);

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Shipping method updated successfully',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Update shipping method error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating shipping method'
    });
  }
});

// @route   GET /api/cart/summary
// @desc    Get cart summary
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    
    if (!cart) {
      return res.json({
        success: true,
        data: { 
          cart: null,
          summary: {
            itemCount: 0,
            uniqueProductCount: 0,
            subtotal: 0,
            discountAmount: 0,
            couponDiscount: 0,
            shippingCost: 0,
            taxAmount: 0,
            totalAmount: 0,
            isEmpty: true,
            isExpired: false
          }
        }
      });
    }

    // Check item availability
    await cart.checkItemAvailability();

    res.json({
      success: true,
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Get cart summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart summary'
    });
  }
});

// @route   POST /api/cart/checkout
// @desc    Prepare cart for checkout
// @access  Private
router.post('/checkout', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id, isActive: true });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    if (cart.isEmpty) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Check item availability
    await cart.checkItemAvailability();

    // Check if all items are available
    const unavailableItems = cart.items.filter(item => !item.isAvailable);
    if (unavailableItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some items in your cart are not available',
        data: { unavailableItems }
      });
    }

    // Calculate tax (simplified - you might want to implement proper tax calculation)
    const taxRate = 0.05; // 5% tax
    cart.taxAmount = cart.subtotal * taxRate;
    await cart.save();

    // Refresh cart data
    await cart.populate('items.product', 'name bengaliName images price originalPrice discountPercentage stockQuantity isInStock');

    res.json({
      success: true,
      message: 'Cart ready for checkout',
      data: { 
        cart,
        summary: cart.getCartSummary()
      }
    });

  } catch (error) {
    console.error('Checkout preparation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while preparing checkout'
    });
  }
});

module.exports = router;