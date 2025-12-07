# MegaSun CRM

A comprehensive Customer Relationship Management (CRM) system designed for managing leads, quotations, orders, follow-ups, targets, and team members. Built with a modern tech stack featuring React frontend and Node.js/Express backend with Microsoft SQL Server database.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Integrations](#integrations)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Logging & Monitoring](#logging--monitoring)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

MegaSun CRM is a full-featured CRM solution that streamlines sales processes, lead management, and customer interactions. The system provides comprehensive modules for managing the entire sales lifecycle from lead generation to order fulfillment, with advanced features like automated lead imports, follow-up scheduling, target tracking, and detailed analytics.

### Key Highlights

- **End-to-End Sales Management**: Complete workflow from lead capture to order delivery
- **Automated Lead Import**: Integration with Facebook Lead Ads and IndiaMart
- **Role-Based Access Control**: Granular permissions system for different user types
- **Real-time Analytics**: Comprehensive dashboard with charts and metrics
- **Document Generation**: Automated PDF generation for quotations and invoices
- **Follow-up Automation**: Scheduled notifications and reminders
- **Multi-source Lead Tracking**: Support for various lead sources (Website, Facebook, IndiaMart, Google, etc.)

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **React Router DOM 7.8.2** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Axios 1.11.0** - HTTP client
- **Recharts 3.2.1** - Chart library for analytics
- **React Toastify 11.0.5** - Toast notifications
- **PapaParse 5.5.3** - CSV parsing
- **XLSX 0.18.5** - Excel file handling
- **Day.js 1.11.18** - Date manipulation
- **Lucide React 0.546.0** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **Microsoft SQL Server** - Database (via `mssql` package)
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **Bcryptjs 3.0.2** - Password hashing
- **AWS SDK 2.1692.0** - S3 file storage
- **Puppeteer 24.26.1** - PDF generation
- **Winston 3.18.3** - Logging framework
- **Winston Daily Rotate File 5.0.0** - Log rotation
- **Morgan 1.10.1** - HTTP request logger
- **Multer 2.0.2** - File upload handling
- **Node-cache 5.1.2** - In-memory caching
- **Validator 13.15.15** - Input validation
- **UUID 13.0.0** - Unique identifier generation

## ✨ Features

### 1. **Lead Management**
- Create, update, and delete leads
- Lead assignment to team members
- Lead status tracking (New, Follow-up Required, Not Responding, Successful, etc.)
- Lead source tracking (Facebook, IndiaMart, Website, Google, Direct Call, etc.)
- Lead type classification (Domestic, Export)
- Product association with leads
- Advanced filtering and search
- Bulk import/export functionality
- Lead history tracking

### 2. **Follow-up Management**
- Schedule and track follow-ups
- Automatic follow-up date calculation
- Follow-up status management
- Daily notification system (runs at 9 AM)
- Follow-up history and comments
- Integration with lead management

### 3. **Quotation Management**
- Create quotations with multiple products
- Domestic and Export quotation types
- Product quantity and pricing
- GST calculation
- Expected dispatch date tracking
- Quotation status management
- PDF generation for quotations
- Export quotations to CSV
- Advanced filtering (by date, assigned user, type)

### 4. **Order Management**
- Convert quotations to orders
- Order status tracking
- Order product mapping
- Order history
- Integration with quotation system

### 5. **Invoice Management**
- Generate invoices from orders
- PDF invoice generation with company details
- Amount in words (Indian format)
- GST calculations
- Invoice numbering system

### 6. **Target Management**
- Set and track sales targets
- Target assignment to users
- Target vs Achievement tracking
- Monthly/Quarterly/Yearly target support
- Target analytics and reporting

### 7. **Product Management**
- Product catalog management
- Product categories
- Product pricing
- Product images (stored in AWS S3)
- Product import/export
- Product association with leads and quotations

### 8. **User Management**
- User creation and management
- User type system with granular permissions
- Role-based access control (Admin, Regular User)
- Page-level permissions (Read, Create, Update, Delete)
- Dashboard access control
- User activity logging
- Password management
- User profile management

### 9. **Dashboard & Analytics**
- Real-time dashboard with key metrics
- Sales performance charts
- Lead source distribution (Pie charts)
- Lead status distribution
- Target vs Achievement visualization
- Product performance analytics
- Leadership board
- Date range filtering
- Export capabilities

### 10. **Notifications**
- In-app notification system
- Follow-up reminders
- Automated daily notifications
- Notification history
- Mark as read/unread functionality

### 11. **Integrations**

#### Facebook Lead Ads Integration
- Webhook endpoint for Facebook Lead Ads
- Automatic lead import from Facebook
- Facebook access token management
- Lead source tracking
- Comprehensive logging

#### IndiaMart Integration
- Webhook endpoint for IndiaMart leads
- Scheduled cron job for lead synchronization
- Manual trigger option
- Duplicate detection
- Product matching with existing catalog
- Detailed logging and error tracking

#### AWS S3 Integration
- File upload to S3
- Product image storage
- Document storage
- Secure file access

### 12. **Additional Features**
- CSV/Excel import/export
- Advanced search and filtering
- Pagination support
- Date range pickers
- Image upload with preview
- Responsive design
- Dark mode support (via Tailwind)
- Audit logging
- Request ID tracking
- Error handling and logging

## 🏗 Architecture

### System Architecture

```
┌─────────────────┐
│   React Client  │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/REST API
         │ JWT Authentication
         ▼
┌─────────────────┐
│  Express Server │
│   (Backend)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│  MSSQL │ │  AWS S3  │
│  DB    │ │  Storage │
└────────┘ └──────────┘
    │
    │ Webhooks
    ▼
┌─────────────┐
│  Facebook   │
│  IndiaMart  │
└─────────────┘
```

### Frontend Architecture
- **Component-based**: Modular React components
- **Context API**: Global state management (AuthContext)
- **Route Protection**: Private routes with authentication
- **API Layer**: Centralized API calls with Axios interceptors
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Architecture
- **RESTful API**: Standard REST endpoints
- **MVC Pattern**: Controllers, Routes, Middlewares
- **Stored Procedures**: Database logic in SQL Server
- **Middleware Chain**: Authentication, logging, error handling
- **Cron Jobs**: Scheduled tasks for lead sync and notifications

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Microsoft SQL Server** (2019 or higher)
- **AWS Account** (for S3 storage)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MegaSunCRM
```

### 2. Install Frontend Dependencies

```bash
cd Client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../Server
npm install
```

## ⚙️ Configuration

### Environment Variables

Create environment-specific `.env` files in the `Server` directory:

#### Development: `.env.development.local`
#### Production: `.env.production.local`
#### UAT: `.env.uat.local`

### Required Environment Variables

```env
# Server Configuration
PORT=5000
SERVER_URL=http://localhost:5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
REFRESH_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Database Configuration
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=megasuncrm
DB_ENCRYPT=false
DB_TRUST_SERVER_CERT=true

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name

# Cron Job Configuration
IS_CRON_ON=true
CRON_API_KEY=your-indiamart-api-key
INTERVAL=3600000
CREATED_BY_USER_ID=default-user-id-guid
LEAD_SOURCE_NAME=India Mart

# Facebook Integration
FB_VERIFY_TOKEN=your-facebook-verify-token
FB_APP_ID=your-facebook-app-id
FB_APP_SECRET=your-facebook-app-secret
FB_ACCESS_TOKEN_ENV=your-facebook-access-token
FB_GRAPH_API_VERSION=v18.0
FACEBOOK_LEAD_SOURCE_NAME=Facebook
```

### Frontend Configuration

Update the API base URL in `Client/src/api/axios.js` if needed:

```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true
});
```

## 🗄 Database Setup

### 1. Create Database

Create a new database in SQL Server:

```sql
CREATE DATABASE megasuncrm;
```

### 2. Run Database Scripts

Execute the appropriate database script based on your environment:

**For Development:**
```bash
# Execute the script using SQL Server Management Studio or sqlcmd
sqlcmd -S localhost -d megasuncrm -i Server/src/database/dev_script_megasun_crm.sql
```

**For UAT/Production:**
```bash
sqlcmd -S localhost -d megasuncrm -i Server/src/database/uat_script_megasun_crm.sql
```

### 3. Database Tables

The database includes the following main tables:

- `Users` - User accounts
- `UserType` - User role types
- `UserTypePermissionsControl` - Page-level permissions
- `UserTypeDashboardsPermissionsControl` - Dashboard permissions
- `Leads` - Lead records
- `LeadSource` - Lead source types
- `LeadStatus` - Lead status types
- `LeadType` - Lead types (Domestic/Export)
- `LeadProductsMapping` - Lead-product associations
- `FollowUps` - Follow-up records
- `Quotations` - Quotation records
- `QuotationProductsMapping` - Quotation products
- `Orders` - Order records
- `OrderProductsMapping` - Order products
- `Targets` - Sales targets
- `Products` - Product catalog
- `AuditLogs` - Audit trail
- `UserActivityLog` - User activity tracking
- `RefreshTokens` - JWT refresh tokens
- `ImportLogs` - Import operation logs
- `IndiaMartLogs` - IndiaMart integration logs
- `FacebookLogs` - Facebook integration logs
- `Notifications` - System notifications

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd Server
npm run dev
```

The server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd Client
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd Client
npm run build
```

The build output will be in `Client/dist`

#### Start Production Server

```bash
cd Server
npm start
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signin` - User login
- `POST /api/auth/refreshToken` - Refresh access token
- `POST /api/auth/signout` - User logout

### Lead Management

- `GET /api/lead` - Get all leads (with pagination, filters)
- `GET /api/lead/:id` - Get lead by ID
- `POST /api/lead` - Create new lead
- `PUT /api/lead/:id` - Update lead
- `DELETE /api/lead/:id` - Delete lead
- `POST /api/lead/import` - Import leads from CSV/Excel
- `GET /api/lead/export` - Export leads to CSV

### Follow-up Management

- `GET /api/followUp` - Get all follow-ups
- `GET /api/followUp/:id` - Get follow-up by ID
- `POST /api/followUp` - Create follow-up
- `PUT /api/followUp/:id` - Update follow-up
- `DELETE /api/followUp/:id` - Delete follow-up

### Quotation Management

- `GET /api/quotation` - Get all quotations
- `GET /api/quotation/:id` - Get quotation by ID
- `POST /api/quotation` - Create quotation
- `PUT /api/quotation/:id` - Update quotation
- `DELETE /api/quotation/:id` - Delete quotation
- `GET /api/quotation/:id/pdf` - Generate quotation PDF
- `GET /api/quotation/export` - Export quotations to CSV

### Order Management

- `GET /api/order` - Get all orders
- `GET /api/order/:id` - Get order by ID
- `POST /api/order` - Create order
- `PUT /api/order/:id` - Update order
- `DELETE /api/order/:id` - Delete order

### Invoice Management

- `GET /api/invoice/:id` - Get invoice by ID
- `GET /api/invoice/:id/pdf` - Generate invoice PDF

### Target Management

- `GET /api/target` - Get all targets
- `POST /api/target` - Create target
- `PUT /api/target/:id` - Update target
- `DELETE /api/target/:id` - Delete target

### Product Management

- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product by ID
- `POST /api/product` - Create product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product
- `POST /api/product/upload` - Upload product image

### User Management

- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `POST /api/user` - Create user
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user
- `POST /api/user/changePassword` - Change password
- `GET /api/user/types` - Get user types
- `POST /api/user/types` - Create user type
- `PUT /api/user/types/:id` - Update user type

### Dashboard

- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/leadership` - Get leadership board
- `GET /api/dashboard/products` - Get product analytics

### Notifications

- `GET /api/notify` - Get user notifications
- `PUT /api/notify/:id/read` - Mark notification as read
- `PUT /api/notify/readAll` - Mark all notifications as read

### Integration Endpoints

- `POST /api/facebook/webhook` - Facebook Lead Ads webhook
- `POST /api/indiaMart/webhook` - IndiaMart webhook
- `POST /api/indiaMart/sync` - Manual IndiaMart sync trigger
- `GET /api/indiaMart/cron/status` - Get cron job status
- `POST /api/indiaMart/cron/toggle` - Toggle cron job

## 🔌 Integrations

### Facebook Lead Ads Integration

The system integrates with Facebook Lead Ads to automatically import leads.

**Setup:**
1. Create a Facebook App and configure Lead Ads
2. Set up webhook in Facebook App settings
3. Configure webhook URL: `https://your-domain.com/api/facebook/webhook`
4. Set verify token in environment variables
5. Configure access token for Graph API

**Features:**
- Automatic lead import via webhook
- Access token refresh handling
- Comprehensive logging
- Duplicate detection

### IndiaMart Integration

IndiaMart integration allows automatic import of leads from IndiaMart platform.

**Setup:**
1. Obtain IndiaMart API key
2. Configure webhook URL in IndiaMart dashboard
3. Set up cron job for scheduled sync
4. Configure API key in environment variables

**Features:**
- Scheduled cron job for lead sync
- Manual sync trigger
- Webhook support
- Product matching with existing catalog
- Detailed logging and error tracking

**Cron Job:**
- Runs at configurable intervals
- Can be toggled on/off via API
- Logs all operations to `IndiaMartLogs` table

### AWS S3 Integration

File storage for product images and documents.

**Setup:**
1. Create AWS S3 bucket
2. Configure IAM user with S3 access
3. Set AWS credentials in environment variables
4. Configure bucket name and region

**Usage:**
- Product images are automatically uploaded to S3
- Files are stored with UUID-based naming
- Secure access via signed URLs (if configured)

## 🔐 Authentication & Authorization

### Authentication Flow

1. User logs in with email and password
2. Server validates credentials
3. JWT access token and refresh token are generated
4. Tokens are stored in HTTP-only cookies
5. Access token expires in 1 hour (configurable)
6. Refresh token expires in 7 days (configurable)

### Authorization System

The system uses a role-based access control (RBAC) system with granular permissions:

**User Types:**
- **Admin**: Full system access
- **Regular User**: Limited access based on permissions

**Permission Levels:**
- **Page Access**: Control access to modules (Leads, Quotations, Orders, etc.)
- **Action Permissions**: CRUD operations (Create, Read, Update, Delete)
- **Dashboard Access**: Control visibility of dashboard sections

**Modules with Permissions:**
- Lead Management
- Quotation Management
- Order Management
- User Management
- Follow-up Management
- Target Management
- Product Management

**Middleware:**
- `authenticate` - Validates JWT token
- `checkPermission` - Validates user permissions for specific actions

## 📁 Project Structure

```
MegaSunCRM/
├── Client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   │   ├── icons/                   # Application icons
│   │   └── fonts/                   # Custom fonts
│   ├── src/
│   │   ├── api/                     # API service layer
│   │   │   ├── authApi.js
│   │   │   ├── axios.js
│   │   │   ├── dashboardApi.js
│   │   │   ├── followUpApi.js
│   │   │   ├── invoiceApi.js
│   │   │   ├── leadApi.js
│   │   │   ├── notificationApi.js
│   │   │   ├── orderApi.js
│   │   │   ├── productApi.js
│   │   │   ├── quotation.js
│   │   │   ├── targetApi.js
│   │   │   └── userApi.js
│   │   ├── assets/                  # Static assets
│   │   ├── components/              # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── SideMenu.jsx
│   │   │   ├── TopNavBar.jsx
│   │   │   ├── ChangePasswordModal.jsx
│   │   │   ├── DateRangePickerModal.jsx
│   │   │   ├── ImageUploadModal.jsx
│   │   │   └── NotificationModal.jsx
│   │   ├── context/                 # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── followUpManagement/
│   │   │   ├── leadManagement/
│   │   │   ├── orderManagement/
│   │   │   ├── productManagement/
│   │   │   ├── quotationManagement/
│   │   │   ├── targetManagement/
│   │   │   └── userManagement/
│   │   ├── routes/                  # Routing configuration
│   │   │   ├── AppRoutes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   ├── Country_Codes.js
│   │   │   ├── Country_States.json
│   │   │   ├── GetLabelColor.js
│   │   │   ├── Indian_States.js
│   │   │   └── useEscapeKey.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── Server/                          # Backend Node.js Application
│   ├── logs/                        # Application logs
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   │   ├── corsOptions.js
│   │   │   └── env.js
│   │   ├── controllers/             # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── cron.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   ├── facebook.controller.js
│   │   │   ├── followUp.controller.js
│   │   │   ├── invoice.controller.js
│   │   │   ├── lead.controller.js
│   │   │   ├── notification.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── quotation.controller.js
│   │   │   ├── target.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── webhook.controller.js
│   │   ├── database/                # Database related files
│   │   │   ├── db.js
│   │   │   ├── s3.js
│   │   │   ├── dev_script_megasun_crm.sql
│   │   │   └── uat_script_megasun_crm.sql
│   │   ├── middlewares/             # Express middlewares
│   │   │   ├── authMiddleware.js
│   │   │   ├── checkPermission.js
│   │   │   ├── requestId.js
│   │   │   └── requestLogger.js
│   │   ├── routes/                  # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── facebookRoutes.js
│   │   │   ├── followUpRoutes.js
│   │   │   ├── indiaMartRoutes.js
│   │   │   ├── invoiceRoutes.js
│   │   │   ├── leadRouter.js
│   │   │   ├── notificationRoutes.js
│   │   │   ├── orderRouter.js
│   │   │   ├── productRoutes.js
│   │   │   ├── quotationRouter.js
│   │   │   ├── targetRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/                   # Utility functions
│   │   │   ├── jwt.js
│   │   │   ├── logger.js
│   │   │   └── parseStack.js
│   │   ├── app.js                   # Express app configuration
│   │   └── server.js                # Server entry point
│   └── package.json
│
└── README.md                        # This file
```

## 🚢 Deployment

### Backend Deployment

1. **Environment Setup**
   - Set `NODE_ENV=production`
   - Configure all environment variables
   - Ensure database is accessible

2. **Build & Start**
   ```bash
   cd Server
   npm install --production
   npm start
   ```

3. **Process Management**
   - Use PM2 or similar process manager
   ```bash
   pm2 start src/server.js --name megasuncrm-api
   ```

### Frontend Deployment

1. **Build Production Bundle**
   ```bash
   cd Client
   npm run build
   ```

2. **Serve Static Files**
   - Deploy `dist` folder to static hosting (Nginx, Apache, CDN)
   - Or serve from Express server

3. **Nginx Configuration Example**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /path/to/Client/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Database Migration

1. Backup existing database
2. Run migration scripts
3. Verify data integrity
4. Update connection strings

### SSL/HTTPS Setup

- Use Let's Encrypt or similar for SSL certificates
- Configure reverse proxy (Nginx) for HTTPS
- Update CORS settings for HTTPS URLs

## 📊 Logging & Monitoring

### Logging System

The application uses Winston for structured logging:

- **Log Levels**: Error, Warn, Info
- **Log Rotation**: Daily log files
- **Log Location**: `Server/logs/`
- **Log Format**: JSON with timestamps

### Log Categories

- **Request Logs**: All HTTP requests (via Morgan)
- **Error Logs**: Application errors with stack traces
- **Integration Logs**: Facebook and IndiaMart operations
- **Activity Logs**: User activities and audit trails

### Monitoring

- Monitor application logs for errors
- Track API response times
- Monitor database connection pool
- Set up alerts for critical errors
- Monitor cron job execution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint rules for frontend
- Use consistent naming conventions
- Add comments for complex logic
- Write meaningful commit messages

## 📝 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries, please contact the development team.

---

**Built with ❤️ for efficient CRM management**

