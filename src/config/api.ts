// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://your-backend-name.onrender.com', // Replace with your Render backend URL
    timeout: 15000,
  },
};

// Get current environment
const isDevelopment = process.env.NODE_ENV === 'development';
const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

export const API_BASE_URL = currentConfig.baseURL;
export const API_TIMEOUT = currentConfig.timeout;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  
  // Users
  USER_PROFILE: '/api/users/profile',
  UPDATE_PROFILE: '/api/users/profile',
  USER_ADDRESSES: '/api/users/addresses',
  
  // Products
  PRODUCTS: '/api/products',
  PRODUCT_DETAILS: '/api/products/:id',
  PRODUCT_SEARCH: '/api/products/search',
  CATEGORIES: '/api/categories',
  
  // Cart
  CART: '/api/cart',
  ADD_TO_CART: '/api/cart/add',
  UPDATE_CART: '/api/cart/update',
  REMOVE_FROM_CART: '/api/cart/remove',
  
  // Orders
  ORDERS: '/api/orders',
  CREATE_ORDER: '/api/orders',
  ORDER_DETAILS: '/api/orders/:id',
  TRACK_ORDER: '/api/orders/:id/track',
  
  // Payments
  CREATE_PAYMENT: '/api/payments/create',
  VERIFY_PAYMENT: '/api/payments/verify',
  
  // Reviews
  PRODUCT_REVIEWS: '/api/products/:id/reviews',
  CREATE_REVIEW: '/api/products/:id/reviews',
  
  // Newsletter
  SUBSCRIBE_NEWSLETTER: '/api/newsletter/subscribe',
};

// Axios configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};