# 🧠 AI Notebook App

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-Cache-DC382D?logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-DevOps-2496ED?logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/LangGraph-AI-black" />
</p>

<p align="center">
  A modern full-stack AI-powered notebook application with rich text editing, canvas drawing, authentication, Docker deployment, and AI workflow orchestration using LangChain & LangGraph.
</p>

---

# ✨ Features

| 🚀 Feature | 📖 Description |
|---|---|
| 🔐 Authentication | Secure JWT-based authentication |
| 📧 OTP Verification | Email verification & password reset |
| 📝 Rich Text Editor | Create and manage notebook pages |
| 🎨 Canvas Drawing | Sketch diagrams and drawings |
| 🤖 AI Workflow | AI-powered notebook assistant |
| 🌙 Dark Mode | Light & dark theme support |
| ⚡ Fast State Management | Zustand + React Query |
| 📦 Redis Integration | Queue and caching support |
| 🐳 Dockerized | Full containerized deployment |
| ☁️ AWS Deployment | Production deployment on EC2 |
| 🔄 CI/CD | Automated GitHub Actions workflow |

---

# 🏗️ Tech Stack

## 🎨 Frontend

| Technology | Usage |
|---|---|
| ⚛️ React | UI Library |
| ⚡ Vite | Frontend Build Tool |
| 🎨 Tailwind CSS | Styling |
| 🧠 Zustand | State Management |
| 🔄 React Query | Server State |
| 📝 React Quill | Rich Text Editor |
| ✏️ React Sketch Canvas | Drawing Canvas |

---

## ⚙️ Backend

| Technology | Usage |
|---|---|
| 🟢 Node.js | Runtime |
| 🚀 Express.js | Backend Framework |
| 🔷 TypeScript | Type Safety |
| 🍃 MongoDB | Database |
| 🔴 Redis | Cache & Queues |
| 📦 BullMQ | Background Jobs |
| 🔐 JWT | Authentication |
| 🤖 LangChain | AI Orchestration |
| 🧠 LangGraph | Stateful AI Workflows |

---

# 🧠 AI Architecture

The AI workflow system is powered using:

- 🤖 LangChain
- 🧠 LangGraph
- 🔄 Stateful Workflow Graphs
- 💬 Message-based Processing
- 💾 Persistent Checkpointing

---

# 📁 Project Structure

```bash
note-book/
│
├── client/
│
├── server/
│
├── docker-compose.yml
│
└── .github/
    └── workflows/
```

---

# ⚙️ Environment Variables

## 🖥️ Server `.env`

```env
PORT=8080

NODE_ENV=production

ORIGIN=http://client

JWT_SECRET_KEY=your_secret

REDIS_HOST=redis
REDIS_PORT=6379

GROQ_API_KEY=your_groq_api

BREVO_API_KEY=your_brevo_api

MONGODB_URI=your_mongodb_uri
```

---

## 🌐 Client `.env`

```env
VITE_BACKEND_URL=http://localhost:8080
```

---

# 🐳 Docker Setup

```bash
docker-compose up --build
```

---

# 📡 API Routes

## 🔐 Authentication

| Method | Route |
|---|---|
| POST | `/api/auth/login` |
| POST | `/api/auth/register` |
| POST | `/api/auth/logout` |
| GET | `/api/auth/check` |

---

## 📂 Sections

| Method | Route |
|---|---|
| POST | `/api/section` |
| GET | `/api/section/all` |
| PATCH | `/api/section/:sectionId` |
| DELETE | `/api/section/:sectionId` |

---

## 📄 Pages

| Method | Route |
|---|---|
| POST | `/api/page` |
| GET | `/api/page/:pageId` |
| PATCH | `/api/page/:pageId` |
| DELETE | `/api/page/:pageId` |

---

## 🎨 Canvas

| Method | Route |
|---|---|
| POST | `/api/canvas` |
| GET | `/api/canvas/:canvasId` |
| PATCH | `/api/canvas/:canvasId` |
| DELETE | `/api/canvas/:canvasId` |

---

# 🔄 CI/CD Workflow

```text
GitHub Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
Docker Hub Push
    ↓
AWS EC2 Deploy
```

---

# 🔐 Security

| 🛡️ Security Feature | 📖 Description |
|---|---|
| 🔑 JWT Authentication | Secure user sessions |
| 🍪 HTTP Only Cookies | Safer authentication |
| 🔒 Password Hashing | Secure password storage |
| 🛡️ Helmet | Security headers protection |
| 🌐 CORS | API access protection |

---

# 👨‍💻 Author

<p align="center">
  <img src="https://img.shields.io/badge/Shiva%20Ram-Full%20Stack%20Developer-blue?style=for-the-badge" />
</p>

| Platform | Link |
|---|---|
| 💻 GitHub | https://github.com/ramavathshivaram |
| 📧 Email | ramavathshiva6300@gmail.com |

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧠 Contribute new features

---

# 📄 License

MIT License