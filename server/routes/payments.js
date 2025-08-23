const express = require('express');
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/process
// @desc    Process payment for order
// @access  Private
router.post('/process', auth, async (req, res) => {
  try {
    const {
      orderId,
      paymentMethod,
      paymentDetails,
      billingAddress
    } = req.body;

    if (!orderId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and payment method are required'
      });
    }

    // Get order
    const order = await Order.findById(orderId);
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

    // Check if order is ready for payment
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order is not ready for payment'
      });
    }

    let paymentResult;

    // Process payment based on method
    switch (paymentMethod) {
      case 'bkash':
        paymentResult = await processBkashPayment(order, paymentDetails);
        break;
      case 'nagad':
        paymentResult = await processNagadPayment(order, paymentDetails);
        break;
      case 'rocket':
        paymentResult = await processRocketPayment(order, paymentDetails);
        break;
      case 'card':
        paymentResult = await processCardPayment(order, paymentDetails);
        break;
      case 'cod':
        paymentResult = await processCODPayment(order, paymentDetails);
        break;
      case 'bank_transfer':
        paymentResult = await processBankTransferPayment(order, paymentDetails);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Unsupported payment method'
        });
    }

    if (paymentResult.success) {
      // Update order payment status
      order.paymentInfo = {
        method: paymentMethod,
        transactionId: paymentResult.transactionId,
        amount: order.totalAmount,
        currency: 'BDT',
        status: paymentResult.status,
        processedAt: new Date(),
        gatewayResponse: paymentResult.gatewayResponse,
        billingAddress: billingAddress || order.billingAddress
      };

      // Update order status based on payment
      if (paymentMethod === 'cod') {
        await order.updateStatus('confirmed', {
          adminNote: 'Payment pending - Cash on Delivery',
          updatedBy: 'system'
        });
      } else {
        await order.updateStatus('confirmed', {
          adminNote: 'Payment processed successfully',
          updatedBy: 'system'
        });
      }

      await order.save();

      res.json({
        success: true,
        message: 'Payment processed successfully',
        data: {
          order,
          payment: paymentResult
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: paymentResult.message || 'Payment processing failed'
      });
    }

  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing payment'
    });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify payment status
// @access  Private
router.post('/verify', auth, async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;

    if (!orderId || !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and transaction ID are required'
      });
    }

    // Get order
    const order = await Order.findById(orderId);
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

    // Verify payment with gateway
    const verificationResult = await verifyPaymentWithGateway(
      order.paymentInfo.method,
      transactionId,
      order.totalAmount
    );

    if (verificationResult.success) {
      // Update payment status
      order.paymentInfo.status = verificationResult.status;
      order.paymentInfo.verifiedAt = new Date();
      order.paymentInfo.verificationResponse = verificationResult.gatewayResponse;

      await order.save();

      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          order,
          verification: verificationResult
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: verificationResult.message || 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while verifying payment'
    });
  }
});

// @route   GET /api/payments/methods
// @desc    Get available payment methods
// @access  Public
router.get('/methods', async (req, res) => {
  try {
    const paymentMethods = [
      {
        id: 'bkash',
        name: 'bKash',
        bengaliName: 'বিকাশ',
        description: 'Mobile banking with bKash',
        bengaliDescription: 'মোবাইল ব্যাংকিং বিকাশের মাধ্যমে',
        icon: '/icons/bkash.png',
        minAmount: 10,
        maxAmount: 25000,
        processingTime: 'Instant',
        fees: '1.5%',
        isAvailable: true
      },
      {
        id: 'nagad',
        name: 'Nagad',
        bengaliName: 'নগদ',
        description: 'Digital financial service by Nagad',
        bengaliDescription: 'নগদের ডিজিটাল আর্থিক সেবা',
        icon: '/icons/nagad.png',
        minAmount: 10,
        maxAmount: 25000,
        processingTime: 'Instant',
        fees: '1.5%',
        isAvailable: true
      },
      {
        id: 'rocket',
        name: 'Rocket',
        bengaliName: 'রকেট',
        description: 'Mobile banking with Dutch-Bangla Bank',
        bengaliDescription: 'ডাচ-বাংলা ব্যাংকের মোবাইল ব্যাংকিং',
        icon: '/icons/rocket.png',
        minAmount: 10,
        maxAmount: 25000,
        processingTime: 'Instant',
        fees: '1.5%',
        isAvailable: true
      },
      {
        id: 'card',
        name: 'Credit/Debit Card',
        bengaliName: 'ক্রেডিট/ডেবিট কার্ড',
        description: 'Visa, Mastercard, and local bank cards',
        bengaliDescription: 'ভিসা, মাস্টারকার্ড এবং স্থানীয় ব্যাংক কার্ড',
        icon: '/icons/card.png',
        minAmount: 10,
        maxAmount: 100000,
        processingTime: '2-3 minutes',
        fees: '2.5%',
        isAvailable: true
      },
      {
        id: 'cod',
        name: 'Cash on Delivery',
        bengaliName: 'ক্যাশ অন ডেলিভারি',
        description: 'Pay when you receive your order',
        bengaliDescription: 'অর্ডার পাওয়ার সময় অর্থ প্রদান করুন',
        icon: '/icons/cod.png',
        minAmount: 0,
        maxAmount: 5000,
        processingTime: 'On delivery',
        fees: '৳50',
        isAvailable: true
      },
      {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        bengaliName: 'ব্যাংক ট্রান্সফার',
        description: 'Direct bank transfer to our account',
        bengaliDescription: 'আমাদের অ্যাকাউন্টে সরাসরি ব্যাংক ট্রান্সফার',
        icon: '/icons/bank.png',
        minAmount: 100,
        maxAmount: 1000000,
        processingTime: '1-2 business days',
        fees: '৳25',
        isAvailable: true
      }
    ];

    res.json({
      success: true,
      data: { paymentMethods }
    });

  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching payment methods'
    });
  }
});

// @route   POST /api/payments/calculate-installment
// @desc    Calculate EMI installment plans
// @access  Public
router.post('/calculate-installment', async (req, res) => {
  try {
    const { amount, tenure, bank } = req.body;

    if (!amount || !tenure) {
      return res.status(400).json({
        success: false,
        message: 'Amount and tenure are required'
      });
    }

    // Available banks for EMI
    const availableBanks = [
      {
        name: 'Dutch-Bangla Bank',
        bengaliName: 'ডাচ-বাংলা ব্যাংক',
        minAmount: 5000,
        maxAmount: 500000,
        tenures: [3, 6, 9, 12, 18, 24, 36],
        interestRates: {
          3: 12.5,
          6: 13.0,
          9: 13.5,
          12: 14.0,
          18: 14.5,
          24: 15.0,
          36: 15.5
        }
      },
      {
        name: 'BRAC Bank',
        bengaliName: 'ব্র্যাক ব্যাংক',
        minAmount: 3000,
        maxAmount: 300000,
        tenures: [3, 6, 9, 12, 18, 24],
        interestRates: {
          3: 13.0,
          6: 13.5,
          9: 14.0,
          12: 14.5,
          18: 15.0,
          24: 15.5
        }
      },
      {
        name: 'City Bank',
        bengaliName: 'সিটি ব্যাংক',
        minAmount: 5000,
        maxAmount: 400000,
        tenures: [3, 6, 9, 12, 18, 24, 36],
        interestRates: {
          3: 12.0,
          6: 12.5,
          9: 13.0,
          12: 13.5,
          18: 14.0,
          24: 14.5,
          36: 15.0
        }
      }
    ];

    let selectedBank = availableBanks[0]; // Default bank
    if (bank) {
      selectedBank = availableBanks.find(b => b.name === bank) || selectedBank;
    }

    // Check if amount and tenure are valid for selected bank
    if (amount < selectedBank.minAmount || amount > selectedBank.maxAmount) {
      return res.status(400).json({
        success: false,
        message: `Amount must be between ৳${selectedBank.minAmount} and ৳${selectedBank.maxAmount} for ${selectedBank.name}`
      });
    }

    if (!selectedBank.tenures.includes(tenure)) {
      return res.status(400).json({
        success: false,
        message: `Available tenures for ${selectedBank.name}: ${selectedBank.tenures.join(', ')} months`
      });
    }

    // Calculate EMI
    const interestRate = selectedBank.interestRates[tenure];
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / 
                (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - amount;

    const installmentPlan = {
      bank: selectedBank.name,
      bengaliBank: selectedBank.bengaliName,
      principalAmount: amount,
      tenure: tenure,
      interestRate: interestRate,
      monthlyEMI: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      processingFee: Math.round(amount * 0.02), // 2% processing fee
      totalPayable: Math.round(totalAmount + (amount * 0.02))
    };

    res.json({
      success: true,
      data: { installmentPlan }
    });

  } catch (error) {
    console.error('Calculate installment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while calculating installment'
    });
  }
});

// @route   GET /api/payments/status/:orderId
// @desc    Get payment status for order
// @access  Private
router.get('/status/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
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

    const paymentStatus = {
      orderId: order._id,
      orderNumber: order.orderNumber,
      amount: order.totalAmount,
      currency: 'BDT',
      paymentMethod: order.paymentInfo?.method || 'Not specified',
      status: order.paymentInfo?.status || 'Pending',
      transactionId: order.paymentInfo?.transactionId,
      processedAt: order.paymentInfo?.processedAt,
      verifiedAt: order.paymentInfo?.verifiedAt,
      gatewayResponse: order.paymentInfo?.gatewayResponse
    };

    res.json({
      success: true,
      data: { paymentStatus }
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching payment status'
    });
  }
});

// Admin routes
// @route   GET /api/payments/admin/transactions
// @desc    Get all payment transactions (admin only)
// @access  Admin
router.get('/admin/transactions', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, method, dateFrom, dateTo } = req.query;
    const skip = (page - 1) * limit;

    let query = { 'paymentInfo.method': { $exists: true } };
    
    if (status) query['paymentInfo.status'] = status;
    if (method) query['paymentInfo.method'] = method;
    if (dateFrom || dateTo) {
      query['paymentInfo.processedAt'] = {};
      if (dateFrom) query['paymentInfo.processedAt'].$gte = new Date(dateFrom);
      if (dateTo) query['paymentInfo.processedAt'].$lte = new Date(dateTo);
    }

    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email phone')
      .select('orderNumber totalAmount paymentInfo createdAt')
      .sort({ 'paymentInfo.processedAt': -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      data: {
        transactions: orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalTransactions: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Admin get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching transactions'
    });
  }
});

// Payment processing functions
async function processBkashPayment(order, paymentDetails) {
  try {
    // TODO: Integrate with actual bKash API
    // For now, simulate successful payment
    
    const transactionId = `BK${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'completed',
      transactionId,
      gatewayResponse: {
        gateway: 'bKash',
        status: 'success',
        message: 'Payment processed successfully'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'bKash payment processing failed'
    };
  }
}

async function processNagadPayment(order, paymentDetails) {
  try {
    // TODO: Integrate with actual Nagad API
    const transactionId = `NG${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'completed',
      transactionId,
      gatewayResponse: {
        gateway: 'Nagad',
        status: 'success',
        message: 'Payment processed successfully'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Nagad payment processing failed'
    };
  }
}

async function processRocketPayment(order, paymentDetails) {
  try {
    // TODO: Integrate with actual Rocket API
    const transactionId = `RK${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'completed',
      transactionId,
      gatewayResponse: {
        gateway: 'Rocket',
        status: 'success',
        message: 'Payment processed successfully'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Rocket payment processing failed'
    };
  }
}

async function processCardPayment(order, paymentDetails) {
  try {
    // TODO: Integrate with actual card payment gateway (Stripe, etc.)
    const transactionId = `CD${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'completed',
      transactionId,
      gatewayResponse: {
        gateway: 'Card Gateway',
        status: 'success',
        message: 'Payment processed successfully'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Card payment processing failed'
    };
  }
}

async function processCODPayment(order, paymentDetails) {
  try {
    const transactionId = `COD${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'pending',
      transactionId,
      gatewayResponse: {
        gateway: 'COD',
        status: 'pending',
        message: 'Payment will be collected on delivery'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'COD payment processing failed'
    };
  }
}

async function processBankTransferPayment(order, paymentDetails) {
  try {
    const transactionId = `BT${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      status: 'pending',
      transactionId,
      gatewayResponse: {
        gateway: 'Bank Transfer',
        status: 'pending',
        message: 'Payment pending bank confirmation'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Bank transfer processing failed'
    };
  }
}

async function verifyPaymentWithGateway(method, transactionId, amount) {
  try {
    // TODO: Integrate with actual payment gateway verification APIs
    // For now, simulate successful verification
    
    return {
      success: true,
      status: 'completed',
      gatewayResponse: {
        gateway: method,
        status: 'verified',
        message: 'Payment verified successfully'
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Payment verification failed'
    };
  }
}

module.exports = router;