// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'vendor';
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  addresses: Address[];
  preferences: UserPreferences;
  wishlist: string[];
  recentlyViewed: string[];
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'gift';
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  language: 'en' | 'bn';
  currency: 'BDT' | 'USD';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  marketing: {
    newsletter: boolean;
    promotions: boolean;
  };
}

// Product Types
export interface Product {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  bengaliDescription: string;
  sku: string;
  category: string;
  subcategory?: string;
  brand?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
  attributes: ProductAttributes;
  inventory: InventoryInfo;
  ratings: RatingInfo;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  fabric?: string;
  style?: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
}

export interface ProductAttributes {
  gender: 'men' | 'women' | 'children' | 'unisex';
  ageGroup?: 'toddler' | 'kids' | 'teen' | 'adult';
  occasion: string[];
  season: string[];
  material: string[];
  care: string[];
  fit: string[];
}

export interface InventoryInfo {
  totalStock: number;
  lowStockThreshold: number;
  isInStock: boolean;
  allowBackorder: boolean;
  maxOrderQuantity: number;
}

export interface RatingInfo {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

// Category Types
export interface Category {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  bengaliDescription: string;
  slug: string;
  parentId?: string;
  level: number;
  displayOrder: number;
  image: string;
  icon?: string;
  isActive: boolean;
  showInMenu: boolean;
  children?: Category[];
  productCount: number;
}

// Cart Types
export interface CartItem {
  id: string;
  product: string | Product;
  name: string;
  bengaliName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  size: string;
  color: string;
  image: string;
  isAvailable: boolean;
}

export interface Cart {
  id: string;
  user: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponDiscount: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  appliedCoupon?: Coupon;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customer: string | User;
  customerInfo: CustomerInfo;
  orderItems: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  discountAmount: number;
  couponDiscount: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  trackingInfo?: TrackingInfo;
  specialInstructions?: string;
  appliedCoupon?: Coupon;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  product: string | Product;
  name: string;
  bengaliName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  size: string;
  color: string;
  image: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  transactionId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  processedAt: Date;
  gatewayResponse?: any;
  billingAddress: Address;
}

export interface TrackingInfo {
  courier: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery: Date;
  history: TrackingEvent[];
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: Date;
  description: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export type PaymentMethod = 
  | 'bkash'
  | 'nagad'
  | 'rocket'
  | 'card'
  | 'cod'
  | 'bank_transfer';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories?: string[];
  applicableProducts?: string[];
  userLimit?: number;
  userUsageLimit?: number;
}

// Review Types
export interface Review {
  id: string;
  product: string | Product;
  user: string | User;
  order: string | Order;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  isHelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// Search Types
export interface SearchFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  size?: string[];
  color?: string[];
  material?: string[];
  occasion?: string[];
  season?: string[];
  rating?: number;
  availability?: 'in_stock' | 'out_of_stock' | 'backorder';
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'newest' | 'rating' | 'popularity';
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  filters: SearchFilters;
  suggestions: string[];
  relatedSearches: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  marketingConsent?: boolean;
}

export interface CheckoutForm {
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
  couponCode?: string;
}

// Notification Types
export interface Notification {
  id: string;
  user: string;
  type: 'order' | 'payment' | 'shipping' | 'promotion' | 'system';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// Admin Types
export interface DashboardStats {
  counts: {
    users: number;
    products: number;
    categories: number;
    orders: number;
  };
  revenue: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  recentOrders: Order[];
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
}

export interface MonthlyRevenue {
  month: number;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  name: string;
  bengaliName: string;
  sku: string;
  totalSold: number;
  revenue: number;
}