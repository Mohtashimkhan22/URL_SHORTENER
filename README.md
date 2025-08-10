# 🚀 URL Shortener with Admin Dashboard

A full-stack URL Shortener application built with **Node.js + Express + MongoDB** for the backend  
and **React** for the frontend, featuring an **Admin Dashboard** to monitor shortened links.

---

## ✨ Features

- Shorten long URLs into compact links
- Redirect to original URLs instantly
- URL validation to ensure proper format
- Tracks number of clicks for each short link
- Admin Dashboard with:
  - List of all shortened URLs
  - Click statistics
  - Creation timestamps
- Protected admin access via token
- Responsive and modern UI

---

## 📂 Project Structure

root/
├── backend/ # Express API
│ ├── server.js
│ ├── models/Url.js
│ ├── routes/urlRoutes.js
│ └── package.json
│
├── frontend/ # React App
│ ├── src/
│ │ ├── components/
│ │ │ ├── UrlForm.js
│ │ │ ├── AdminLogin.js
│ │ │ ├── AdminDashboard.js
│ │ │ ├── UrlForm.css
│ │ │ └── AdminDashboard.css
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── README.md
└── .env.example
