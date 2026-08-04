# 🛒 AI Multi-Vendor E-Commerce Platform

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-blue?style=for-the-badge)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge)

</p>

<p align="center">

A production-ready **AI-powered Multi-Vendor E-Commerce Platform** where customers can shop online, sellers can manage products, and administrators can monitor the platform through a powerful analytics dashboard.

</p>

---

# 🌐 Live Demo

### 🖥️ Frontend

**https://ai-multi-vendor-frontend-7dk10xu91-vipra-team.vercel.app/**

### 🚀 Backend API

**https://ai-multivendor-backend.onrender.com/**

---

# ✨ Features

## 👤 Customer

- JWT Authentication
- Browse Products
- Search Products
- Filter & Sort Products
- Product Details
- Shopping Cart
- Wishlist
- Checkout
- Order History
- Reviews & Ratings
- Profile Management

---

## 🛍️ Seller

- Seller Dashboard
- Add Products
- Edit Products
- Delete Products
- Manage Inventory
- Seller Analytics

---

## 👨‍💼 Admin

- Admin Dashboard
- User Management
- Product Management
- Order Management
- Revenue Analytics
- Monthly Reports
- Top Selling Products
- Recent Orders

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Recharts

### Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT Authentication
- Multer
- Cloudinary

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL
- Image Storage → Cloudinary

---

# 📂 Project Structure

```text
AI-MultiVendor-Ecommerce
│
├── client
│   ├── src
│   ├── public
│   ├── docs
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role Based Authorization

Roles

- Customer
- Seller
- Admin

---

# 📦 Modules

- Authentication
- Product Management
- Categories
- Cart
- Wishlist
- Reviews
- Orders
- Checkout
- Profile
- Seller Dashboard
- Admin Dashboard
- Analytics Dashboard

---

# 🗄️ Database

### PostgreSQL Tables

- users
- categories
- products
- cart
- wishlist
- orders
- order_items
- reviews

---

# ☁️ Cloud Storage

All product images are securely stored using **Cloudinary**.

---

# 📊 Analytics Dashboard

- Total Users
- Total Products
- Total Orders
- Revenue Analytics
- Monthly Revenue
- Order Status Chart
- Top Selling Products
- Recent Orders

---

# 📸 Project Screenshots

## 🏠 Home Page

![Home](client/docs/images/home.png)

---

## 🏪 Product Listing

![Products](client/docs/images/products.png)

---

## 📦 Product Details

![Product Details](client/docs/images/product-details.png)

---

## 🛒 Shopping Cart

![Cart](client/docs/images/cart.png)

---

## ❤️ Wishlist

![Wishlist](client/docs/images/wishlist.png)

---

## 📦 Orders

![Orders](client/docs/images/orders.png)

---

## 👤 Profile

![Profile](client/docs/images/profile.png)

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/vipratripathi745/AI-MultiVendor-Ecommerce.git
```

## Install Frontend

```bash
cd client

npm install

npm run dev
```

## Install Backend

```bash
cd server

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Server (.env)

```env
PORT=

DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

## Client (.env)

```env
VITE_API_URL=https://ai-multivendor-backend.onrender.com/api
```

---

# 📡 REST API

## Authentication

```http
POST /api/users/register
POST /api/users/login
```

## Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Cart

```http
GET    /api/cart
POST   /api/cart
DELETE /api/cart/:id
```

## Orders

```http
GET    /api/orders
POST   /api/orders
```

## Wishlist

```http
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:id
```

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Image Storage | Cloudinary |

---

# 🛣️ Future Improvements

- Online Payment Gateway (Stripe/Razorpay)
- Email Notifications
- Invoice Generation
- AI Product Recommendations
- Real-time Notifications
- Chat Support
- Progressive Web App (PWA)

---

# 👨‍💻 Author

**Vipra Tripathi**

- GitHub: https://github.com/vipratripathi745
- LinkedIn: *(Add your LinkedIn profile URL here)*

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

<p align="center">

Made with ❤️ by **Vipra Tripathi**

</p>
