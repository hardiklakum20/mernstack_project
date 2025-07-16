# 👟 ShoesX MERN Project

A robust and secure full-stack **e-commerce admin dashboard** built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**, allowing admins to manage **categories, brands, colors, sizes, and product variants**. It includes **JWT authentication**, and supports **CRUD operations** for all resources.

---

## 📁 Project Structure

```
├── frontend/  
│   ├── src/
│   │   ├── pages/  
│   │   ├── components/  
│   │   ├── App.jsx  
│   │   └── ...
│   └── package.json
│
├── backend/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── middlewares/  
│   ├── index.js
│   ├── db/
│   │   └── db.js  
│   └── .env
│
├── README.md
└── package.json
```

---

## 🛠️ Technologies Used

### 🔹 Frontend (React)

* React Router DOM
* Axios
* Bootstrap
* Toast Notifications
* React Select
* Protected Routes with JWT
* ApexCharts
* Swiper
* React Toastify

### 🔹 Backend (Node.js + Express)

* JWT (Authentication)
* Bcrypt (Password Hashing)
* Mongoose (ORM)
* Express.js
* CORS
* Multer
* Cloudinary
* Nodemailer
* Joi
* dotenv

### 🔹 Database

* MongoDB

---

## 🔐 Authentication Features

* ✅ Admin Sign Up
* ✅ Admin Login with JWT
* ✅ Forgot Password (email simulation or token)
* ✅ Change Password
* ✅ Protected Routes using Middleware
* ✅ Token Storage in LocalStorage

---

## 🗃️ Admin Panel Functionalities

### 📦 Product Management

* Add Product with multiple variants (color, size, price, stock, images)
* Edit Product and variants
* Delete Product
* View Product Details

### 🏷️ Category Management

* Create Category
* Edit Category
* Delete Category
* List All Categories

### 🏭 Brand Management

* Add Brand
* Edit Brand
* Delete Brand

### 🎨 Color Management

* Add Color (name + HEX code)
* Edit/Delete Color

### 📏 Size Management

* Add Size
* Edit/Delete Size

---

## 🚀 Bonus Features

* 🔍 Search in all data tables
* 🔃 Sorting and Filtering
* ☁️ Image Upload using Cloudinary / local storage
* 🔒 Admin-only access
* 📱 Responsive Dashboard
* 🔔 Toasts and Alerts for actions
* 🧼 Clean UI with Sidebar & Navbar

---

## 📦 Installation & Setup

### 1️⃣ Setup Backend

```bash
cd ShoesX_backend
npm install
npm start
```

#### ➕ Create `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### 2️⃣ Setup Frontend

```bash
cd ShoesX_react_frontend
npm install
npm start
```

---

## 📄 License

This project is licensed under the **ISC License**.

---
