# 🎬 Movie Management Platform

Fullstack **Movie Management Platform** berbasis **JavaScript** yang memungkinkan **Admin** mengelola data **Movies** dan **Users** dengan sistem **JWT Authentication**, **Role-Based Access Control**, serta **Admin Dashboard modern**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Login menggunakan **JSON Web Token (JWT)**
- Middleware **verifyToken**
- Middleware **isAdmin** (Admin Only Access)
- Proteksi API menggunakan **Bearer Token**
- Role management: **admin** & **user**

---

### 🎥 Movie Management (CRUD)
- ➕ Create Movie  
- 📄 Read Movie List  
- ✏️ Update Movie  
- 🗑️ Delete Movie  
- 🔍 Search Movie berdasarkan **Title** / **Director**

---

### 👥 User Management (Admin Only)
- 👀 View semua user
- ✏️ Update user (**name, email, role**)
- 🗑️ Delete user
- 🔒 Akses khusus **Admin**

---

### 📊 Admin Dashboard
- 📈 Total Movies
- 👤 Total Users
- 📋 Table Management (Movies & Users)
- 🪟 Modal Edit User & Movie
- 🎨 UI Modern menggunakan **TailwindCSS**

---

## 🧱 Tech Stack

### 🖥️ Frontend
- ⚛️ **React.js**
- 🔄 **Axios**
- 🎨 **TailwindCSS**
- 🖼️ **Lucide Icons**
- 🔐 JWT (localStorage)

---

### 🛠️ Backend
- 🟢 **Node.js**
- 🚀 **Express.js**
- 🗄️ **MySQL**
- 🔐 **JSON Web Token (JWT)**
- 🧩 Authentication & Authorization Middleware

---

## 📂 Project Structure

```bash
movie-management-platform
├── backend
│   ├── controllers
│   ├── middleware
│   │   ├── verifyToken.js
│   │   └── isAdmin.js
│   ├── routes
│   ├── models
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md
