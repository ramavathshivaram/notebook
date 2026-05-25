# 📝 AI-Powered Notebook App

## Author

**RAMAVATH SHIVA RAM** ramavathshiva6300@gmail.com

## 🌐 Live Demo

🔗 **Frontend:** [http://ec2-65-2-177-67.ap-south-1.compute.amazonaws.com/](http://ec2-65-2-177-67.ap-south-1.compute.amazonaws.com/)

---

A full-stack **MERN notebook application** integrated with **AI note generation** and **canvas drawing** capabilities.  
This app allows users to **create**, **edit**, and **organize** text notes and sketches, while leveraging AI to automatically generate content or drawings.  
It also includes **JWT-based authentication**, **email OTP verification**, and **dark mode** personalization.

---

## ⚙️ API Endpoints Overview

### 🔐 Authentication

- `POST /api/auth` — Login or register user
- `POST /api/forgot-password/send-otp` — Send OTP email
- `POST /api/forgot-password/verify-otp` — Verify OTP code
- `POST /api/forgot-password/reset` — Reset password
- `POST /api/update-user` — Update user preferences (e.g. dark mode)

---

### 🗂️ Sections

- `POST /api/section/create` — Create a new section
- `GET /api/section/` — Fetch all user sections
- `PATCH /api/section/rename/:sectionId` — Rename section
- `DELETE /api/section/:sectionId` — Delete section

---

### 📄 Pages

- `POST /api/page/create` — Create a new page
- `GET /api/page/:pageId` — Get page by ID
- `PUT /api/page/:pageId` — Update entire page data
- `PATCH /api/page/content/:pageId` — Update page content only
- `PATCH /api/page/title/:pageId` — Update page title
- `DELETE /api/page/:sectionId/:pageId` — Delete a page

---

### 🎨 Canvas

- `POST /api/canvas/create` — Create new canvas
- `GET /api/canvas/:canvasId` — Fetch a canvas
- `PATCH /api/canvas/title/:canvasId` — Update canvas title
- `PATCH /api/canvas/content/:canvasId` — Update drawing content
- `DELETE /api/canvas/:sectionId/:canvasId` — Delete canvas

---

### 🤖 AI Integration

- `POST /api/ai/generate-ai-note` — Generate AI-based notes using OpenAI
- `POST /api/ai/generate-canvas-drawing` — Generate AI-powered drawings

> The app uses the following model for AI-powered features:  
> **`deepseek/deepseek-r1-0528-qwen3-8b:free`**  
> This model from **OpenRouter** provides advanced text and image generation capabilities while maintaining cost-efficiency and flexibility. Developers can swap the model easily in `.env` without altering code.

---

## 📦 Dependencies

### **Backend Packages**

`express` &nbsp; | &nbsp; `mongoose` &nbsp; | &nbsp; `jsonwebtoken` &nbsp; | &nbsp; `bcryptjs` &nbsp; | &nbsp; `nodemailer` &nbsp; | &nbsp; `dotenv` &nbsp; | &nbsp; `cors` &nbsp; | &nbsp; `ejs` &nbsp; | &nbsp; `openai` &nbsp; | &nbsp; `uuid` &nbsp; | &nbsp; `node-fetch`

### **Frontend Packages**

`react` &nbsp; | &nbsp; `react-dom` &nbsp; | &nbsp; `react-router-dom` &nbsp; | &nbsp; `react-hook-form` &nbsp; | &nbsp; `axios` &nbsp; | &nbsp; `zustand` &nbsp; | &nbsp; `tailwindcss` &nbsp; | &nbsp; `shadcn` &nbsp; | &nbsp; `react-quill-new` &nbsp; | &nbsp; `react-sketch-canvas` &nbsp; | &nbsp; `sonner` &nbsp; | &nbsp; `lucide-react` &nbsp; | &nbsp; `motion` &nbsp; | &nbsp; `lottie-react` &nbsp; | &nbsp; `crypto-js` &nbsp; | &nbsp; `zod` &nbsp; | &nbsp; `next-themes` &nbsp; | &nbsp; `@tanstack/react-query` &nbsp; | &nbsp; `lodash.debounce` &nbsp; | &nbsp; `tailwind-merge` &nbsp; | &nbsp; `clsx`

---

## Environment Variables

### Backend `.env` Configuration

```env
PORT=3000
FRONTEND_URL=https://notebook-frontend-v2.onrender.com     # Deployed frontend URL
FRONTEND_DEV_URL=http://localhost:5173                     # Local frontend URL

# AI Integration
OPENAI_API_KEY=your_openai_api_key_here                    # OpenAI or OpenRouter API key
AI_MODEL=deepseek/deepseek-r1-0528-qwen3-8b:free           # AI model used for text/drawing
AI_URL=https://openrouter.ai/api/v1                        # OpenRouter API endpoint

# Database
MONGODB_URI=your_mongodb_connection_string_here             # MongoDB connection string

# Authentication
JWT_SECRET_KEY=your_secret_key_here                         # Secret key for JWT tokens

# Email Configuration
EMAIL=your_email_here                                       # Email for OTP service
PASSWORD=your_email_app_password_here                       # Email app password or SMTP key
```

---

### Frontend `.env` Configuration

```
VITE_BACKEND_URL=https://notebook-oe5t.onrender.com         # Deployed backend URL
VITE_BACKEND_DEV_URL=http://localhost:3000                  # Local backend URL
```

## Clone

`git clone https://github.com/ramavathshivaram/notebook.git`

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend (in separate terminal)

```
cd frontend
npm install
npm run dev
```

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js">
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb">
  <img src="https://img.shields.io/badge/React-Frontend-blue?logo=react">
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwindcss">
  <img src="https://img.shields.io/badge/OpenRouter%20AI-Integration-purple?logo=openai">
  <img src="https://img.shields.io/badge/JWT-Auth-yellow?logo=jsonwebtokens">
  <img src="https://img.shields.io/badge/License-MIT-blue">
</p>

---

### 💬 Connect With Me

<p align="center">
  <a href="mailto:ramavathshiva6300@gmail.com"><img src="https://img.shields.io/badge/Email-Contact%20Me-red?logo=gmail&logoColor=white" alt="Email"></a>
  <a href="https://github.com/ramavathshivaram"><img src="https://img.shields.io/badge/GitHub-ramavathshivaram-black?logo=github" alt="GitHub"></a>
  <a href="https://www.linkedin.com/in/"><img src="https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin" alt="LinkedIn"></a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with❤️by-Ramavath%20Shiva%20Ram-orange?style=for-the-badge" alt="Made by Ramavath Shiva Ram">
</p>
