const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  bengaliName: {
    type: String,
    trim: true,
    maxlength: [100, 'Bengali name cannot exceed 100 characters']
  },
  
  // Authentication
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^(\+880|880|0)?1[3456789]\d{8}$/, 'Please enter a valid Bangladeshi phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  
  // Addresses
  addresses: [{
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
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  
  // Preferences
  language: {
    type: String,
    enum: ['bn', 'en'],
    default: 'bn'
  },
  currency: {
    type: String,
    enum: ['BDT', 'USD'],
    default: 'BDT'
  },
  sizePreference: {
    type: String,
    enum: ['US', 'UK', 'EU', 'BD'],
    default: 'BD'
  },
  
  // Social Authentication
  googleId: String,
  facebookId: String,
  
  // Account Status
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Verification
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  phoneVerificationCode: String,
  phoneVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Timestamps
  lastLogin: Date,
  lastPasswordChange: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ facebookId: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for bengali full name
userSchema.virtual('bengaliFullName').get(function() {
  return this.bengaliName || this.fullName;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.lastPasswordChange = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role || 'user'
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d' 
    }
  );
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  delete userObject.phoneVerificationCode;
  delete userObject.phoneVerificationExpires;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  
  return userObject;
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find by phone
userSchema.statics.findByPhone = function(phone) {
  return this.findOne({ phone });
};

// Method to add address
userSchema.methods.addAddress = function(addressData) {
  if (addressData.isDefault) {
    this.addresses.forEach(addr => addr.isDefault = false);
  }
  this.addresses.push(addressData);
  return this.save();
};

// Method to update address
userSchema.methods.updateAddress = function(addressId, updateData) {
  const address = this.addresses.id(addressId);
  if (!address) {
    throw new Error('Address not found');
  }
  
  if (updateData.isDefault) {
    this.addresses.forEach(addr => addr.isDefault = false);
  }
  
  Object.assign(address, updateData);
  return this.save();
};

// Method to remove address
userSchema.methods.removeAddress = function(addressId) {
  this.addresses = this.addresses.filter(addr => addr._id.toString() !== addressId);
  return this.save();
};

// Method to set default address
userSchema.methods.setDefaultAddress = function(addressId) {
  this.addresses.forEach(addr => addr.isDefault = false);
  const address = this.addresses.id(addressId);
  if (address) {
    address.isDefault = true;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);