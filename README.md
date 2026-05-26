# 🧠 AI Notebook App

A modern full-stack AI-powered notebook application built using the MERN stack with rich text editing, canvas drawing, authentication, AI integrations, Redis caching, Docker deployment, and CI/CD automation.

---

# 🚀 Features

- 🔐 JWT Authentication
- 📧 Email OTP Verification
- 📝 Rich Text Notebook Editor
- 🎨 Canvas Drawing Support
- 🤖 AI Assistant Integration
- 🌙 Dark Mode Support
- ⚡ React Query Data Fetching
- 📦 Redis Integration
- 🐳 Dockerized Setup
- ☁️ AWS EC2 Deployment
- 🔄 GitHub Actions CI/CD
- 📱 Fully Responsive UI

---

# 🏗️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Zustand
- React Query
- React Hook Form
- Motion
- React Quill
- React Sketch Canvas
- Axios
- Zod

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Redis
- BullMQ
- JWT Authentication
- Nodemailer
- LangChain
- Groq AI
- Winston Logger

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- NGINX

---

# 📁 Project Structure

```bash
note-book/
│
├── client/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── server/
│   ├── src/
│   ├── dist/
│   └── Dockerfile
│
├── docker-compose.yml
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── README.md
```

---

# ⚙️ Environment Variables

## Server `.env`

```env
PORT=8080

NODE_ENV=production

ORIGIN=http://client

JWT_SECRET_KEY=your_secure_secret

REDIS_HOST=redis
REDIS_PORT=6379

GROQ_API_KEY=your_groq_api_key

BREVO_API_KEY=your_brevo_api_key

MONGODB_URI=your_mongodb_uri
```

---

## Client `.env`

```env
VITE_BACKEND_URL=http://localhost:8080
```

---

# 🐳 Docker Compose

```yaml
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - server
    networks:
      - public

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    env_file:
      - ./server/.env
    restart: unless-stopped
    depends_on:
      - redis
    networks:
      - public
      - private

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - private

volumes:
  redis_data:

networks:
  public:
    driver: bridge

  private:
    driver: bridge
    internal: true
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ramavathshivaram/notebook.git
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🐳 Run with Docker

```bash
docker-compose up --build
```

---

# 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated deployment.

## Workflow

```text
GitHub Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
Docker Hub Push
    ↓
EC2 Deployment
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/check
GET  /api/auth/refresh
```

---

## Sections

```http
POST   /api/section
GET    /api/section/all
PATCH  /api/section/:sectionId
DELETE /api/section/:sectionId
```

---

## Pages

```http
POST   /api/page
GET    /api/page/:pageId
PATCH  /api/page/:pageId
DELETE /api/page/:pageId
```

---

## Canvas

```http
POST   /api/canvas
GET    /api/canvas/:canvasId
PATCH  /api/canvas/:canvasId
DELETE /api/canvas/:canvasId
```

---

## AI

```http
POST /api/ai/ask
```

---

# 🤖 AI Features

The application integrates:

- Groq AI
- LangChain
- OpenRouter Compatible APIs

## Capabilities

- AI Note Generation
- Smart Writing Assistance
- Context-aware Responses
- AI Canvas Support

---

# 🔐 Security Features

- JWT Authentication
- HTTP Only Cookies
- Password Hashing
- OTP Verification
- Helmet Protection
- CORS Protection
- Environment Variable Security

---

# 🖥️ Production Architecture

```text
React Client
     ↓
NGINX Reverse Proxy
     ↓
Express API Server
     ↓
Redis + MongoDB Atlas
     ↓
AI Services
```

---

# 📜 Scripts

## Server

```bash
npm run dev
npm run build
npm run start
```

---

## Client

```bash
npm run dev
npm run build
npm run preview
```

---

# 🌟 Future Improvements

- WebSocket Realtime Collaboration
- AI Voice Notes
- PDF Export
- Shared Workspaces
- Mobile App
- Microservices Architecture
- Kubernetes Deployment

---

# 👨‍💻 Author

## Shiva Ram

- GitHub: https://github.com/ramavathshivaram
- Email: ramavathshiva6300@gmail.com

---

# 📄 License

MIT License

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧠 Contribute new features

---

# 💙 Project Highlights

This project demonstrates:

- Full Stack Development
- Docker & DevOps
- CI/CD Automation
- AI Integration
- Redis Caching
- Secure Authentication
- Production Deployment
- Scalable Architecture

Perfect for portfolios, internships, and placement showcases.
