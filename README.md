# 🛒 E-commerce Platform

A full-featured e-commerce web application with role-based login (Admin & Customer), product listing, cart management, and order placement functionality using:

- Node.js + Express + MongoDB (Backend)
- HTML + CSS + JavaScript (Frontend)
- JWT-based authentication

---

## 🚀 Features

### 🔐 Authentication
- User registration and login with JWT
- Roles: `admin` and `customer`
- Role-based UI (Admin can add/update/delete products)

### 🛍️ Customer Features
- Browse products
- Search by product name
- Add to cart
- Checkout with address and contact info

### 🛠️ Admin Features
- View all products
- Add new product
- Edit product details
- Delete product

---

## 📁 Project Structure

ecommerce-project/
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Product.js
│ │ ├── Cart.js
│ │ └── Order.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── product.js
│ │ ├── cart.js
│ │ └── order.js
│ └── server.js
│
├── frontend/
│ ├── index.html # Product listing + search
│ ├── login.html # Login form
│ ├── register.html # Registration form
│ ├── cart.html # Cart and checkout page
│ ├── success.html # Order success page
│ └── admin-panel.html # Admin dashboard
│
└── .env


---

## ⚙️ How to Run the Project

### 🔧 Backend Setup

1. Clone the repo and open terminal:
   ```bash
   git clone https://github.com/yourusername/ecommerce-project.git
   cd ecommerce-project/backend

2.Install dependencies:
npm install

3.Create .env file:
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/ecommerce

4.Start the server
node server.js

server runs on http://localhost:5000


* Frontend Setup
Open frontend/index.html in a browser to start as Customer

Open frontend/admin-panel.html as Admin
