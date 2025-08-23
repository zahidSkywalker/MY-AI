# Bangladesh E-commerce Platform

A comprehensive, modern e-commerce platform built specifically for clothing businesses in Bangladesh, featuring full functionality, Bangladesh-specific payment methods, mobile-first design, and modern scalability.

## 🚀 Features

### Core E-commerce Features
- **Product Management**: Multi-category catalog, variants, inventory tracking, image gallery
- **User Management**: Registration, authentication, profiles, addresses, wishlist
- **Shopping Cart**: Smart cart with auto-discounts, save for later, guest checkout
- **Order Management**: Complete order lifecycle, tracking, returns, reviews
- **Payment Integration**: Bangladesh-focused payment methods (bKash, Nagad, Rocket, etc.)
- **Admin Panel**: Comprehensive dashboard, analytics, user/product/order management

### Bangladesh-Specific Features
- **Local Payment Methods**: bKash, Nagad, Rocket, Dutch-Bangla Bank, BRAC Bank, City Bank
- **Local Courier Integration**: Pathao, Steadfast, RedX, SA Paribahan
- **Bengali Language Support**: Full Bengali + English bilingual interface
- **Local Currency**: BDT (Bangladeshi Taka) support
- **Zone-based Shipping**: Dhaka, Chittagong, Sylhet, and other regions
- **EMI Plans**: Partner bank installment options

### Technical Features
- **PWA Support**: Progressive Web App capabilities
- **SEO Optimized**: Meta tags, sitemaps, structured data
- **Mobile-First**: Responsive design optimized for mobile devices
- **Performance**: Fast page loads, lazy loading, image optimization
- **Security**: JWT authentication, rate limiting, input validation
- **Scalability**: Redis caching, MongoDB, cloud-ready architecture

## 🛠 Tech Stack

### Frontend
- **React.js** + **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **Noto Sans Bengali** font support

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose ODM**
- **Redis** for caching
- **JWT** for authentication
- **bcryptjs** for password hashing

### Infrastructure
- **AWS/Google Cloud** ready
- **Cloudflare CDN** for Bangladesh optimization
- **Cloudinary** for image management
- **Docker** containerization support

## 📁 Project Structure

```
bangladesh-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/             # React components
│   │   ├── layout/            # Layout components
│   │   ├── home/              # Homepage components
│   │   ├── common/            # Shared components
│   │   ├── auth/              # Authentication components
│   │   ├── search/            # Search components
│   │   └── cart/              # Cart components
│   ├── lib/                   # Utility libraries
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions
├── server/                    # Backend Express server
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── middleware/            # Express middleware
│   ├── controllers/           # Route controllers
│   └── services/              # Business logic
├── public/                    # Static assets
│   ├── images/                # Product images
│   ├── icons/                 # App icons
│   └── manifest.json          # PWA manifest
├── package.json               # Dependencies
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── .env                       # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bangladesh-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB and Redis**
   ```bash
   # MongoDB
   mongod
   
   # Redis
   redis-server
   ```

5. **Run the development server**
   ```bash
   # Frontend (Next.js)
   npm run dev
   
   # Backend (Express)
   npm run dev:server
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bangladesh_ecommerce
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateways
BKASH_APP_KEY=your_bkash_key
BKASH_APP_SECRET=your_bkash_secret
NAGAD_APP_KEY=your_nagad_key
NAGAD_APP_SECRET=your_nagad_secret

# Courier APIs
PATHAO_API_KEY=your_pathao_key
STEADFAST_API_KEY=your_steadfast_key

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/products/featured` - Get featured products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/tree` - Get category tree

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove cart item

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/methods` - Get payment methods
- `POST /api/payments/calculate-installment` - Calculate EMI

### Admin (Admin only)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - Manage users
- `GET /api/admin/products` - Manage products
- `GET /api/admin/orders` - Manage orders
- `GET /api/admin/analytics/sales` - Sales analytics

## 🎨 Customization

### Styling
The platform uses Tailwind CSS with custom color schemes and Bengali font support. Customize the design in:
- `tailwind.config.js` - Theme configuration
- `src/app/globals.css` - Global styles and CSS variables

### Language Support
- Bengali language support is built-in
- Language switching component available
- All text supports both English and Bengali

### Payment Methods
Add new payment methods by:
1. Updating the payment methods list in `server/routes/payments.js`
2. Adding payment processing logic
3. Updating the frontend payment selection UI

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t bangladesh-ecommerce .

# Run container
docker run -p 3000:3000 -p 5000:5000 bangladesh-ecommerce
```

### Cloud Deployment
The platform is ready for deployment on:
- **AWS**: EC2, ECS, Lambda
- **Google Cloud**: Compute Engine, Cloud Run
- **Vercel**: Frontend deployment
- **Railway**: Backend deployment

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- Input validation with Joi
- CORS protection
- Helmet security headers
- SQL injection protection (MongoDB)

## 📊 Performance Features

- Redis caching for database queries
- Image optimization with Next.js
- Lazy loading for images
- Code splitting and bundling
- CDN integration ready
- Database indexing for fast queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ User authentication and management
- ✅ Product catalog and management
- ✅ Shopping cart and checkout
- ✅ Basic payment integration

### Phase 2 (Next)
- 🔄 Advanced payment gateways
- 🔄 Real-time inventory management
- 🔄 Advanced analytics dashboard
- 🔄 Multi-vendor support
- 🔄 Mobile app development

### Phase 3 (Future)
- 📋 AI-powered recommendations
- 📋 Virtual try-on features
- 📋 Advanced logistics integration
- 📋 International expansion
- 📋 Blockchain integration

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database
- Express.js community for the web framework
- All contributors and supporters

---

**Built with ❤️ for Bangladesh's e-commerce future**