# JWT Auth Starter

### 🔐 Production-ready boilerplate for JWT-based authentication system

This repository provides a complete starter kit for implementing authentication using **Access Tokens** and **Refresh Tokens**, securely stored in **HTTP-only cookies**. It includes a fully working backend built with **Express & TypeScript** and a frontend built with **React & Vite**.

> ✅ Designed to be secure, scalable, and ready to use in real-world applications.

---

## 🌐 Live Demo

- **Frontend**: [https://jwt-auth-starter.vercel.app/](https://jwt-auth-starter.vercel.app/)
- **Docs**: [https://jwt-auth-starter.vercel.app/docs](https://jwt-auth-starter.vercel.app/docs)
---

## 📦 Features

- JWT Authentication with Refresh & Access Tokens
- Secure HTTP-only cookie storage
- Fully typed backend (TypeScript + Express)
- Frontend with React + React Hook Form
- Environment-ready CORS & cookie config
- Proper token invalidation & logout flow
- Centralized toast and API utilities
- Modular folder structure for scaling

---

## ⚙️ Technologies

| Frontend        | Backend        |
|-----------------|----------------|
| React + Vite    | Express + TypeScript |
| Axios           | MongoDB (Mongoose) |
| React Router    | JWT (`jsonwebtoken`) |
| React Hook Form | Bcrypt + Crypto |
| Lucide Icons    | dotenv, cors, cookie-parser |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jaimansoni/jwt-auth-starter.git
cd jwt-auth-starter

### 2. Install dependencies on both backend and frontend
cd backend
npm install
cp .env.sample .env
npm run dev

cd frontend
npm install
cp .env.sample .env
npm run dev

