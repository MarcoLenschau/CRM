# CRM Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Downloads](#downloads)

## Overview

This CRM (Customer Relationship Management) application is a modern web-based solution built with cutting-edge technologies. It provides comprehensive customer management, event tracking, user administration, and activity logging capabilities. The application uses **React** and **Next.js** for the frontend, **MongoDB** for data persistence, **JWT** for secure authentication, and **Tailwind CSS** for responsive styling.

### Technology Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Cordova](https://img.shields.io/badge/Cordova-ef3b2d?style=for-the-badge&logo=apachecordova&logoColor=white)

- **Frontend Framework:** Next.js 16.1.6 with React
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB
- **Styling:** Tailwind CSS and SASS
- **Language:** TypeScript
- **Runtime:** Node.js

### Key Features

- **User Authentication & Authorization** - Secure login system with role-based access control (Admin/User)
- **Customer Management** - Create, read, update, and delete customer records
- **Event Management** - Schedule and track events with priority levels (High, Medium, Low)
- **Audit Logging** - Comprehensive logging of all user actions
- **Real-time Updates** - Live UI updates when events or data changes
- **Dashboard Analytics** - Statistics dashboard with event summaries
- **Calendar Integration** - Visual calendar view for scheduled events
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS

## Prerequisites

Before setting up the project, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**
- A text editor or IDE (VS Code recommended)

## ⚡ Quick Start

#### Get the CRM application running in 3 minutes:

### 1. Clone the repository

```bash
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cat > .env.local << EOF
MONGODB_URI=mongodb://localhost:27017/crm
JWT_SECRET=your-super-secret-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF
```

### 4. Start development server
```bash
npm run dev
```

✅ Open [http://localhost:3000](http://localhost:3000) in your browser

> **Note:** Ensure MongoDB is running locally or use MongoDB Atlas connection string. 
> You need to register a user first via the registration page or use the `/api/register` endpoint to create an account.

---

## Downloads

### CRM Desktop Application

> **Latest Release:** [![Latest Release](https://img.shields.io/github/v/release/MarcoLenschau/CRM?style=flat-square)](https://github.com/MarcoLenschau/CRM/releases/latest)

#### Windows

- **[Setup Installer](https://downloads.marco-lenschau.de/crm/CRM-Setup-1.0.0.exe)** - Windows installer with uninstaller
- **[Portable EXE](https://downloads.marco-lenschau.de/crm/CRM-Portable-1.0.0.exe)** - Standalone executable (no installation needed)

**Installation:**
```bash
# Setup Installer (recommended)
CRM-Desktop-1.0.0-Setup.exe

# Or portable version
CRM-Desktop-1.0.0-Portable.exe
```

#### macOS

- **[DMG Package](https://downloads.marco-lenschau.de/crm/CRM%20Application-1.0.0-arm64.dmg)** - For Apple Silicon (M1, M2, M3+)
- **[ZIP Package](https://downloads.marco-lenschau.de/crm/CRM%20Application-1.0.0-arm64-mac.zip)** - Portable app archive

**Installation:**
```bash
# DMG: Drag and drop to Applications folder
# ZIP: Extract and run the app
```

> **Note:** Built for Apple Silicon (arm64). For Intel Macs, you'll need to build locally or use Rosetta 2 translation

#### Linux

- **[DEB Package](https://downloads.marco-lenschau.de/crm/crm_1.0.0_amd64.deb)** - For Debian, Ubuntu, Linux Mint
- **[RPM Package](https://downloads.marco-lenschau.de/crm/crm-1.0.0.x86_64.rpm)** - For Red Hat, Fedora, CentOS

**Installation:**
```bash
# For DEB-based systems (Debian/Ubuntu)
sudo dpkg -i CRM-Desktop-1.0.0-x64.deb

# For RPM-based systems (Red Hat/Fedora)
sudo rpm -i CRM-Desktop-1.0.0-x64.rpm
```

#### Android

- **[APK Package](https://downloads.marco-lenschau.de/crm/CRM-v0.1.0.apk)** - Android application package for mobile devices

**Installation:**
```bash
# Enable installation from unknown sources on your Android device
# Then download and install the APK file
```

### 📚 Documentation

- [**CRM-Documentation**](https://marcolenschau.github.io/CRM/) - Complete online documentation without download
- [**CRM-Documentation-V.0.1.0**](https://github.com/MarcoLenschau/CRM/actions/runs/23138976327/artifacts/5941352569) - Complete API and project documentation

---

**Last Updated:** March 16, 2026  
**Version:** 1.0.0  
**Maintainer:** Marco Lenschau
