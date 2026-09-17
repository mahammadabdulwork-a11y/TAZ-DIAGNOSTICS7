# 🏥 TAZ DIAGNOSTIC — Laboratory Management System & Retest Engine

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-Supported-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Vercel-Deployable-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Mobile-Optimized-FF4081?style=for-the-badge&logo=responsive&logoColor=white" alt="Mobile Optimized" />
</p>

---

## 📌 Executive Summary

**TAZ DIAGNOSTIC** (by TAZ COMPANY) is an enterprise-grade Laboratory Management System (LMS) designed for medical diagnostic labs. It streamlines end-to-end clinical pathology workflows—from patient registration and diagnostic test ordering to automated billing, medical report generation, and automated monthly **WhatsApp retest reminders**.

Designed with a **Premium Maroon Medical UI Theme** (`#5B0A1A`), the application is fully responsive, touch-optimized for smartphones, phablets, and tablets, and supports hybrid storage (MySQL DB + Local JSON fallback).

---

## ✨ Key Features

### 👨‍⚕️ Clinical & Operational Modules
- **📊 Interactive Dashboard**: Real-time stats on patients, reports generated, monthly revenue, pending retests, and quick action shortcuts.
- **👤 Patient Entry & Management**: Complete demographic tracking, referral doctor assignment, and historical diagnostic test records.
- **🩸 Test Master & Catalogs**: Pre-configured test catalog with pathology categories, measurement units, normal reference ranges, and test pricing.
- **📄 Medical Report Generator**: High-fidelity printable laboratory test reports with automatic abnormal value highlighting, pathologist signatures, and QR codes.
- **💳 Billing & Payments**: Multi-item diagnostic billing, instant invoice generation, discount calculation, and payment status tracking.
- **⏰ Automated WhatsApp Retest Reminders**: Intelligent reminder engine that tracks chronic or routine test cycles and dispatches WhatsApp follow-up reminders.
- **🏢 Branch & Role Management**: Multi-branch support and role-based permissions (Admin, Receptionist, Pathologist, Billing clerk).

### 📱 Mobile & Responsive UI Features
- **Slide-out Navigation Drawer**: Touch-friendly drawer sidebar with blurred backdrop overlay.
- **Swipeable Data Tables**: Touch-optimized horizontal scrolling for dense patient lists and financial reports on narrow viewports.
- **Adaptive Action Headers & Form Grids**: Auto-stacking layout columns for portrait smartphones (`< 600px`).

---

## 🏗️ Architecture Overview

```
TAZ-DIAGNOSTIC/
├── client/                   # React 18 + Vite Frontend Application
│   ├── public/               # Static assets & brand media
│   ├── src/
│   │   ├── pages/            # Page components (Dashboard, Patients, Reports, etc.)
│   │   ├── data/             # Seed data & test master definitions
│   │   ├── App.jsx           # Main SPA Shell, State & Routing
│   │   └── styles.css        # Premium Maroon Medical Design System
│   ├── index.html            # HTML entry point with viewport meta tags
│   ├── vercel.json           # Single-Page Application route rewrites for Vercel
│   └── package.json
│
├── server/                   # Node.js + Express Backend Service
│   ├── api/index.js          # Serverless entry point for Vercel
│   ├── data/                 # JSON file fallback database storage
│   ├── src/
│   │   ├── routes/           # Express API endpoints (/api/reminders, /api/whatsapp)
│   │   ├── services/         # WhatsApp messaging & reminder scheduler engines
│   │   ├── db.js             # Hybrid MySQL / JSON storage manager
│   │   ├── scheduler.js      # node-cron daily reminder background service
│   │   └── server.js         # Express server application entry point
│   ├── vercel.json           # Serverless API deployment routing
│   └── package.json
│
├── database/                 # Database initialization & SQL migrations
│   ├── 001_initial_schema.sql
│   └── 002_whatsapp_reminders.sql
│
└── docs/                     # Comprehensive documentation references
    ├── API_DOCUMENTATION.md  # Express API endpoints reference
    ├── DATABASE_SCHEMA.md   # MySQL schema & fallback architecture
    └── DEPLOYMENT.md        # Vercel deployment instructions
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### 1. Run Frontend (Client)
```powershell
cd client
npm install
npm run dev
```
Local URL: `http://localhost:5173`

### 2. Run Backend (Server)
In a second terminal window:
```powershell
cd server
npm install
npm run dev
```
Backend URL: `http://localhost:5000`

---

## 🌐 Deploying to Vercel

The repository is pre-configured with `vercel.json` files in both `client/` and `server/` directories.

1. Import repository `woonnajeevan7-coder/TAZ-DIAGNOSTIC` on Vercel.
2. For the **Frontend**: Select `client` as the Root Directory. Vercel auto-detects Vite and builds `dist`.
3. For details on backend deployment or database setup, refer to the [Deployment Guide](docs/DEPLOYMENT.md).

---

## 📚 Documentation Links
- 📡 [API Documentation](docs/API_DOCUMENTATION.md)
- 🗄️ [Database Schema & Architecture](docs/DATABASE_SCHEMA.md)
- 🚀 [Vercel Deployment Guide](docs/DEPLOYMENT.md)

---

## 🛡️ License
Copyright © 2026 TAZ COMPANY — TAZ DIAGNOSTIC. All rights reserved.
