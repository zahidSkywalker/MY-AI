# 🚀 Deployment Guide: Backend to Render

## 📋 Prerequisites

- [GitHub account](https://github.com) with your project repository
- [Render account](https://render.com) (free signup)
- [MongoDB Atlas account](https://mongodb.com/atlas) for database
- [Cloudinary account](https://cloudinary.com) for image storage (optional)

## 🔧 Step 1: Prepare Your Backend

### 1.1 Environment Variables
Copy `.env.example` to `.env` and fill in your values:

```bash
cd server
cp .env.example .env
```

### 1.2 Update package.json Scripts
Ensure your `server/package.json` has these scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm install"
  }
}
```

## 🌐 Step 2: Deploy to Render

### 2.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `zahidSkywalker/MY-AI`

### 2.3 Configure Service Settings

#### **Basic Settings:**
- **Name**: `banglafashion-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users (e.g., Singapore for Bangladesh)
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)

#### **Build & Deploy:**
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`

#### **Plan:**
- **Free**: $0/month (good for development)
- **Starter**: $7/month (recommended for production)

### 2.4 Environment Variables
Add these environment variables in Render dashboard:

#### **Required Variables:**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/banglafashion?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
```

#### **Optional Variables (add as needed):**
```
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2.5 Deploy
1. Click **"Create Web Service"**
2. Wait for build to complete (usually 2-5 minutes)
3. Your service will be available at: `https://your-service-name.onrender.com`

## 🗄️ Step 3: Set Up MongoDB Atlas

### 3.1 Create Cluster
1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create free cluster (M0)
3. Choose cloud provider (AWS/Google Cloud)
4. Select region closest to Render (e.g., Singapore)

### 3.2 Database Access
1. Go to **"Database Access"**
2. Create new user with password
3. Give **"Read and write to any database"** permissions

### 3.3 Network Access
1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (or add Render's IP)

### 3.4 Get Connection String
1. Go to **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Copy connection string
4. Replace `<password>` with your user password
5. Add database name: `banglafashion`

## 🔗 Step 4: Update Frontend Configuration

### 4.1 Update API Configuration
Edit `src/config/api.ts`:

```typescript
production: {
  baseURL: 'https://your-backend-name.onrender.com', // Your Render backend URL
  timeout: 15000,
},
```

### 4.2 Update CORS in Backend
In your backend, ensure CORS allows your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## 🧪 Step 5: Test Your Deployment

### 5.1 Health Check
Visit: `https://your-backend-name.onrender.com/health`

Should return: `{"status":"ok","timestamp":"..."}`

### 5.2 API Test
Test a simple endpoint:
```bash
curl https://your-backend-name.onrender.com/api/products
```

## 📱 Step 6: Deploy Frontend to Vercel

### 6.1 Update Environment Variables
In Vercel, add:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```

### 6.2 Redeploy
Push changes to trigger Vercel deployment

## 🔄 Step 7: Continuous Deployment

### 7.1 Automatic Deployments
- Render automatically deploys when you push to `main` branch
- Build time: 2-5 minutes
- Zero downtime deployments

### 7.2 Manual Deployments
- Go to Render dashboard
- Click **"Manual Deploy"** → **"Deploy latest commit"**

## 📊 Step 8: Monitor Your Service

### 8.1 Render Dashboard
- **Logs**: View real-time logs
- **Metrics**: CPU, memory usage
- **Deployments**: Deployment history

### 8.2 Health Monitoring
- Render automatically monitors your service
- Sends notifications if service goes down

## 🚨 Troubleshooting

### Common Issues:

#### **Build Fails:**
- Check build command: `cd server && npm install`
- Ensure `package.json` exists in server folder
- Check Node.js version compatibility

#### **Service Won't Start:**
- Check start command: `cd server && npm start`
- Verify `server.js` exists
- Check environment variables

#### **Database Connection Fails:**
- Verify MongoDB URI format
- Check network access in Atlas
- Ensure username/password are correct

#### **CORS Errors:**
- Update CORS origin in backend
- Check frontend API configuration
- Verify environment variables

## 💰 Cost Optimization

### Free Tier Limits:
- **Sleep after 15 minutes** of inactivity
- **512 MB RAM**
- **Shared CPU**
- **750 hours/month**

### Upgrade to Starter ($7/month):
- **Always on** (no sleep)
- **1 GB RAM**
- **Shared CPU**
- **Unlimited hours**

## 🎯 Next Steps

1. **Deploy backend to Render** using this guide
2. **Set up MongoDB Atlas** database
3. **Update frontend configuration** with Render backend URL
4. **Deploy frontend to Vercel**
5. **Test full application**
6. **Go live!** 🚀

## 📞 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Community**: [Render Discord](https://discord.gg/render)

---

**Your e-commerce platform will be live and fully functional!** 🎉