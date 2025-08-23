const Joi = require('joi');

// Registration validation
const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters long',
        'string.max': 'First name cannot exceed 50 characters'
      }),
    
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters long',
        'string.max': 'Last name cannot exceed 50 characters'
      }),
    
    bengaliName: Joi.string()
      .min(2)
      .max(100)
      .optional()
      .messages({
        'string.min': 'Bengali name must be at least 2 characters long',
        'string.max': 'Bengali name cannot exceed 100 characters'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address'
      }),
    
    phone: Joi.string()
      .pattern(/^(\+880|880|0)?1[3456789]\d{8}$/)
      .required()
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Please enter a valid Bangladeshi phone number'
      }),
    
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }),
    
    gender: Joi.string()
      .valid('male', 'female', 'other')
      .required()
      .messages({
        'any.only': 'Gender must be male, female, or other'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Login validation
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Password is required'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Password reset validation
const validatePasswordReset = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string()
      .required()
      .messages({
        'string.empty': 'Reset token is required'
      }),
    
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.empty': 'New password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Product validation
const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .messages({
        'string.empty': 'Product name is required',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name cannot exceed 200 characters'
      }),
    
    bengaliName: Joi.string()
      .min(3)
      .max(300)
      .required()
      .messages({
        'string.empty': 'Bengali product name is required',
        'string.min': 'Bengali product name must be at least 3 characters long',
        'string.max': 'Bengali product name cannot exceed 300 characters'
      }),
    
    description: Joi.string()
      .min(10)
      .max(2000)
      .required()
      .messages({
        'string.empty': 'Product description is required',
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description cannot exceed 2000 characters'
      }),
    
    price: Joi.number()
      .positive()
      .required()
      .messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be positive'
      }),
    
    category: Joi.string()
      .required()
      .messages({
        'string.empty': 'Product category is required'
      }),
    
    gender: Joi.string()
      .valid('male', 'female', 'unisex', 'children')
      .required()
      .messages({
        'any.only': 'Gender must be male, female, unisex, or children'
      }),
    
    brand: Joi.string()
      .required()
      .messages({
        'string.empty': 'Brand is required'
      }),
    
    material: Joi.string()
      .required()
      .messages({
        'string.empty': 'Material information is required'
      }),
    
    sku: Joi.string()
      .required()
      .messages({
        'string.empty': 'SKU is required'
      }),
    
    stockQuantity: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.base': 'Stock quantity must be a number',
        'number.integer': 'Stock quantity must be an integer',
        'number.min': 'Stock quantity cannot be negative'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Category validation
const validateCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Category name is required',
        'string.min': 'Category name must be at least 2 characters long',
        'string.max': 'Category name cannot exceed 100 characters'
      }),
    
    bengaliName: Joi.string()
      .min(2)
      .max(150)
      .required()
      .messages({
        'string.empty': 'Bengali category name is required',
        'string.min': 'Bengali category name must be at least 2 characters long',
        'string.max': 'Bengali category name cannot exceed 150 characters'
      }),
    
    slug: Joi.string()
      .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .required()
      .messages({
        'string.empty': 'Category slug is required',
        'string.pattern.base': 'Slug must contain only lowercase letters, numbers, and hyphens'
      }),
    
    parent: Joi.string()
      .optional()
      .messages({
        'string.base': 'Parent category ID must be a string'
      }),
    
    gender: Joi.string()
      .valid('male', 'female', 'unisex', 'children', 'all')
      .default('all')
      .messages({
        'any.only': 'Gender must be male, female, unisex, children, or all'
      }),
    
    season: Joi.string()
      .valid('summer', 'winter', 'spring', 'autumn', 'all-season', 'festival')
      .default('all-season')
      .messages({
        'any.only': 'Season must be summer, winter, spring, autumn, all-season, or festival'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Order validation
const validateOrder = (req, res, next) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        size: Joi.string().optional(),
        color: Joi.string().optional()
      }))
      .min(1)
      .required()
      .messages({
        'array.min': 'Order must contain at least one item'
      }),
    
    shippingAddress: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      addressLine1: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      postalCode: Joi.string().required()
    }).required(),
    
    paymentMethod: Joi.string()
      .valid('bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'paypal', 'cod')
      .required()
      .messages({
        'any.only': 'Invalid payment method'
      }),
    
    shippingMethod: Joi.string()
      .valid('standard', 'express', 'pickup')
      .default('standard')
      .messages({
        'any.only': 'Invalid shipping method'
      })
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Address validation
const validateAddress = (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string()
      .valid('home', 'office', 'other')
      .default('home')
      .messages({
        'any.only': 'Address type must be home, office, or other'
      }),
    
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 100 characters'
      }),
    
    phone: Joi.string()
      .pattern(/^(\+880|880|0)?1[3456789]\d{8}$/)
      .required()
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Please enter a valid Bangladeshi phone number'
      }),
    
    addressLine1: Joi.string()
      .min(5)
      .max(200)
      .required()
      .messages({
        'string.empty': 'Address line 1 is required',
        'string.min': 'Address must be at least 5 characters long',
        'string.max': 'Address cannot exceed 200 characters'
      }),
    
    city: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.empty': 'City is required',
        'string.min': 'City must be at least 2 characters long',
        'string.max': 'City cannot exceed 50 characters'
      }),
    
    district: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.empty': 'District is required',
        'string.min': 'District must be at least 2 characters long',
        'string.max': 'District cannot exceed 50 characters'
      }),
    
    postalCode: Joi.string()
      .pattern(/^\d{4}$/)
      .required()
      .messages({
        'string.empty': 'Postal code is required',
        'string.pattern.base': 'Postal code must be 4 digits'
      }),
    
    isDefault: Joi.boolean()
      .default(false)
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

// Search validation
const validateSearch = (req, res, next) => {
  const schema = Joi.object({
    q: Joi.string()
      .min(1)
      .max(100)
      .optional()
      .messages({
        'string.min': 'Search query must be at least 1 character long',
        'string.max': 'Search query cannot exceed 100 characters'
      }),
    
    category: Joi.string()
      .optional()
      .messages({
        'string.base': 'Category must be a string'
      }),
    
    gender: Joi.string()
      .valid('male', 'female', 'unisex', 'children')
      .optional()
      .messages({
        'any.only': 'Gender must be male, female, unisex, or children'
      }),
    
    minPrice: Joi.number()
      .positive()
      .optional()
      .messages({
        'number.base': 'Minimum price must be a number',
        'number.positive': 'Minimum price must be positive'
      }),
    
    maxPrice: Joi.number()
      .positive()
      .optional()
      .messages({
        'number.base': 'Maximum price must be a number',
        'number.positive': 'Maximum price must be positive'
      }),
    
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1'
      }),
    
    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .default(20)
      .messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
        'number.max': 'Limit cannot exceed 100'
      })
  });

  const { error } = schema.validate(req.query);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordReset,
  validateProduct,
  validateCategory,
  validateOrder,
  validateAddress,
  validateSearch
};