👟 ShoesX MERN Project

🚀 Overview

🔐 Admin Panel – MERN Stack E-commerce App
A robust and secure full-stack e-commerce admin dashboard built with MongoDB, Express.js, React.js, and Node.js. It allows admins to manage:

🏷️ Categories

🏭 Brands

🎨 Colors

📏 Sizes

📦 Product Variants

Includes secure JWT-based authentication and full CRUD operations for all resources.

📁 Project Structure
```bash
├── frontend/  
│ ├── src/
│ │ ├── pages/  
│ │ ├── components/  
│ │ ├── App.jsx  
│ │ └── ...
│ └── package.json
│
├── backend/  
│ ├── controllers/  
│ ├── models/  
│ ├── routes/  
│ ├── middlewares/  
│ ├── index.js
│ ├── db/
│ │ └── db.js  
│ └── .env
│
├── README.md
└── package.json
```

🛠️ Technologies Used

🔹 Frontend (React):
React Router DOM

Axios

Bootstrap

Toast Notifications

React Select

Protected Routes with JWT

ApexCharts

Swiper

React Toastify

🔹 Backend (Node.js + Express):
JWT (Authentication)

Bcrypt (Password Hashing)

Mongoose (ORM)

Express.js

CORS

Multer

Cloudinary

Nodemailer

Joi

dotenv

🔹 Database:
MongoDB

🔐 Authentication Features
✅ Admin Sign Up
✅ Admin Login with JWT
✅ Forgot Password (email simulation or token)
✅ Change Password
✅ Protected Routes using Middleware
✅ Token Storage in LocalStorage

🗃️ Admin Panel Functionalities

📦 Product Management
➕ Add Product with multiple variants (color, size, price, stock, images)

📝 Edit Product and Variants

❌ Delete Product

👁️ View Product Details

🏷️ Category Management
➕ Create Category

📝 Edit Category

❌ Delete Category

📋 List All Categories

🏭 Brand Management
➕ Add Brand

📝 Edit Brand

❌ Delete Brand

🎨 Color Management
➕ Add Color (name + HEX code)

📝 Edit Color

❌ Delete Color

📏 Size Management
➕ Add Size

📝 Edit Size

❌ Delete Size

🚀 Bonus Features
🔍 Search in all tables

🔃 Sorting and Filtering

☁️ Cloudinary & Multer image uploads

🔐 Admin-only access to dashboard

📱 Responsive design

🔔 Toast alerts for user feedback

🧭 Sidebar, Navbar, and Clean UI

⚙️ Installation

▶️ Backend Setup

```bash
cd ShoesX_backend
npm install
npm start
```

▶️ Frontend Setup

```bash
cd ShoesX_react_frontend
npm install
npm start
```

🔑 Environment Variables

Create a `.env` file in the backend directory with the following (example):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

📜 License

This project is licensed under the ISC License.

