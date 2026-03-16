# CRM Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Environment Variables](#environment-variables)
7. [Project Structure](#project-structure)
8. [API Routes](#api-routes)
9. [Authentication](#authentication)
10. [Database](#database)
11. [Frontend Components](#frontend-components)
12. [Real-Time Updates](#real-time-updates)
13. [Deployment](#deployment)
14. [GitHub Secrets](#github-secrets)
15. [Usage](#usage)
16. [Troubleshooting](#troubleshooting)
17. [Downloads](#downloads)

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

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env.local` file in the project root with the following variables:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/crm
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-key-here-change-this-in-production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Configuration

### Environment Variables

All environment variables must be configured in the `.env.local` file in the project root.

#### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string for database access | `mongodb://localhost:27017/crm` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token signing and verification | `Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2#` | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL (public) | `http://localhost:3000` | ✅ Yes |

#### Environment Variable Details

**`MONGODB_URI`**
- **Purpose:** Connection string to MongoDB database
- **Local Development:** `mongodb://localhost:27017/crm`
- **MongoDB Atlas (Cloud):** `mongodb+srv://username:password@cluster.mongodb.net/crm?retryWrites=true&w=majority`
- **Note:** Ensure MongoDB service is running or Atlas cluster is accessible

**`JWT_SECRET`**
- **Purpose:** Secret key used to sign and verify JWT authentication tokens
- **Security:** Must be a long, random string (minimum 32 characters recommended)
- **Production:** Use a strong random value from a password generator
- **⚠️ Important:** This value is critical for security - never share or commit to version control
- **Token Validity:** Tokens expire after 24 hours

**`NEXT_PUBLIC_API_URL`**
- **Purpose:** Base URL for API requests from the frontend
- **Development:** `http://localhost:3000`
- **Production:** Your production domain (e.g., `https://crm.example.com`)
- **Note:** `NEXT_PUBLIC_` prefix makes this variable accessible in browser

#### Sample `.env.local` File

```bash
# Database Configuration
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/crm

# For MongoDB Atlas (replace username and password)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm?retryWrites=true&w=majority

# JWT Secret Key (change this to a strong random string in production)
JWT_SECRET=your-super-secret-key-here-change-this-in-production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Security Best Practices

> **⚠️ IMPORTANT SECURITY NOTES:**

1. **Never commit `.env.local` to version control**
   - Add to `.gitignore` to prevent accidental commits
   - Contains sensitive secrets that should not be public

2. **Use strong JWT_SECRET in production**
   - Minimum 32 random characters
   - Use: `openssl rand -base64 32` to generate

3. **Rotate secrets periodically**
   - Change `JWT_SECRET` regularly for security
   - Users will need to re-login after secret change

4. **Different secrets for environments**
   - Development, Staging, and Production should have different secrets
   - Use GitHub Secrets for production deployments

5. **MongoDB credentials**
   - Use MongoDB Atlas for cloud deployments
   - Set strong password for MongoDB user
   - Restrict IP access in MongoDB Atlas

### JWT Token Configuration

JWT tokens are used for secure API authentication. The token contains:
- `userId` - MongoDB user ID
- `email` - User email address
- `isAdmin` - Boolean flag for admin privileges
- `iat` - Issued at timestamp
- `exp` - Expiration timestamp (24 hours)

## Project Structure

```
CRM/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── event/             # Event management endpoints
│   │   ├── customer/          # Customer management endpoints
│   │   ├── user/              # User management endpoints
│   │   └── log/               # Audit log endpoints
│   ├── components/             # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── dialogs/           # Dialog components
│   │   ├── Header/            # Header component
│   │   ├── Sidebar/           # Sidebar navigation
│   │   └── EventStats/        # Event statistics component
│   ├── models/                 # MongoDB models
│   │   ├── user.model.ts
│   │   ├── customer.model.ts
│   │   ├── event.model.ts
│   │   └── log.model.ts
│   ├── interfaces/             # TypeScript interfaces
│   ├── enums/                  # Enumeration types
│   ├── utils/                  # Utility functions
│   │   ├── mongodb.ts         # MongoDB connection
│   │   ├── jwt.ts             # JWT utilities
│   │   ├── auth.ts            # Authentication helpers
│   │   └── api.ts             # API request helpers
│   ├── calendar/               # Calendar page
│   ├── customers/              # Customers page
│   ├── dashboard/              # Dashboard page
│   ├── users/                  # Users management page
│   ├── log/                    # Audit log page
│   ├── settings/               # Settings page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── db.ts                   # Database initialization
│   └── globals.scss            # Global styles
├── public/                      # Static assets
├── .env.local                   # Environment variables (DO NOT COMMIT)
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── next.config.ts               # Next.js configuration
├── middleware.ts                # Next.js middleware
├── docker-compose.yml           # Docker Compose configuration
└── README.md                    # This file
```

## API Routes

### Authentication Endpoints

#### `POST /api/auth`
Authenticate user with email and password. Returns JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `GET /api/auth`
Verify JWT token validity. Protected route.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "valid": true,
  "user": { "userId": "...", "email": "...", "isAdmin": true }
}
```

#### `POST /api/register`
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

#### `POST /api/logout`
Clear authentication token cookie and logout user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Event Management Endpoints

#### `POST /api/event`
Create a new event. Protected route (all authenticated users).

**Request:**
```json
{
  "userID": "user@example.com",
  "name": "Client Meeting",
  "description": "Monthly sync with client",
  "prio": "HIGH",
  "eventDate": "2026-03-20T14:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "event": { "_id": "...", "name": "Client Meeting", "prio": "HIGH", ... }
}
```

#### `GET /api/event`
Fetch all events. Protected route.

**Response:**
```json
{
  "success": true,
  "events": [
    { "_id": "...", "name": "Client Meeting", "prio": "HIGH", ... },
    ...
  ]
}
```

#### `DELETE /api/event/[id]`
Delete an event by ID. Protected route.

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

### Customer Management Endpoints

#### `POST /api/customer`
Create a new customer. Protected route.

**Request:**
```json
{
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": "+1-555-0123",
  "company": "Acme Corp",
  "status": "ACTIVE",
  "assignedUserId": "user@example.com"
}
```

#### `GET /api/customer`
Fetch all customers. Protected route.

#### `GET /api/customer/[id]`
Fetch a specific customer by ID.

### User Management Endpoints (Admin Only)

#### `POST /api/user`
Create a new user. Admin only.

**Request:**
```json
{
  "name": "New Admin",
  "email": "admin@example.com",
  "password": "securePassword123",
  "isAdmin": true
}
```

#### `GET /api/user`
Fetch all users (excluding password hashes). Admin only.

#### `GET /api/user/[id]`
Fetch a specific user by ID.

#### `PUT /api/user/[id]`
Update user information. Admin only.

#### `DELETE /api/user/[id]`
Delete a user. Admin only.

### Audit Logging Endpoints

#### `POST /api/log`
Create an audit log entry. Admin only.

**Request:**
```json
{
  "userID": "user@example.com",
  "action": "CREATE",
  "entity": "Event",
  "status": "SUCCESS",
  "description": "Event created successfully"
}
```

#### `GET /api/log`
Fetch all audit logs. Protected route.

## Authentication

### How Authentication Works

1. **User Login** - User provides email and password via login form
2. **Password Verification** - Server verifies password using bcryptjs
3. **Token Generation** - JWT token is generated and sent to client
4. **Token Storage** - Token is stored in HTTP-only cookie
5. **Protected Routes** - Subsequent API requests include token in Authorization header
6. **Token Verification** - Server verifies token validity using JWT_SECRET

### Role-Based Access Control

The application supports two roles:

- **Admin** - Full access to all features including user management and audit logs
- **User** - Access to customer management, event scheduling, and personal features

Admin-only routes are protected with `protectRoute(request, true)`.

### JWT Token Structure

```
Header.Payload.Signature

Payload contains:
{
  "userId": "60d5ec49f1b2c5a8f3e2d1c0",
  "email": "user@example.com",
  "isAdmin": true,
  "iat": 1773568646,
  "exp": 1773655046
}
```

## Database

### MongoDB Collections

#### Users Collection
Stores user account information.

```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  hash: string (bcrypt hashed password),
  isAdmin: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Customers Collection
Stores customer information.

```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  company: string,
  status: string (ACTIVE|INACTIVE|PENDING),
  assignedUserId: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Events Collection
Stores scheduled events.

```typescript
{
  _id: ObjectId,
  userID: string (user email),
  name: string,
  description: string (optional),
  prio: string (HIGH|MEDIUM|LOW),
  createdAt: Date,
  updatedAt: Date
}
```

#### Logs Collection
Stores audit log entries.

```typescript
{
  _id: ObjectId,
  userID: string,
  action: string (CREATE|READ|UPDATE|DELETE),
  entity: string (User|Customer|Event),
  status: string (SUCCESS|FAILURE),
  description: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Database Connection

The application uses MongoDB with Mongoose ORM for schema validation and type safety. Connection is managed via `app/utils/mongodb.ts`.

## Frontend Components

### Layout Components

- **Header** - Navigation and user menu
- **Sidebar** - Navigation links (admin-only routes visible only to admins)
- **Footer** - Application footer
- **Container** - Responsive layout wrapper

### Page Components

- **Dashboard** - Overview with statistics and recent events
- **Customers** - Customer list and management
- **Calendar** - Visual event calendar with month/week view
- **Users** - User management (admin only)
- **Log** - Audit log viewer (admin only)
- **Settings** - Application settings
- **Help** - Help documentation

### Dialog Components

- **CreateEventDialog** - Create new events with date/time picker
- **ShowEventDialog** - Display event details with delete option
- **DeleteConfirmDialog** - Confirmation dialog for delete actions
- **CreateCustomerDialog** - Create new customers
- **SelectContactDialog** - Contact selection dialog

### Feature Components

- **EventStats** - Real-time event statistics by priority
- **ActivityFeed** - Recent activity timeline
- **AllEventsTemplate** - Comprehensive event listing
- **QuickActions** - Quick action buttons

### UI Components

- **Calendar** - Month/week calendar view with event rendering
- **DataTable** - Sortable, filterable data table
- **Button** - Customizable buttons with variants
- **Input** - Form input components
- **Select** - Dropdown selection component
- **Modal/Dialog** - Modal dialog wrapper
- **Alert** - Alert notification component
- **Badge** - Status badge component

## Real-Time Updates

The application implements a real-time update system for UI synchronization:

### Event-Driven Architecture

When data changes (create, update, delete), the application dispatches a custom event:

```typescript
window.dispatchEvent(new Event('eventsUpdated'));
```

### Event Listeners

Components listen for the `eventsUpdated` event and refetch data:

```typescript
useEffect(() => {
  const handleEventsUpdated = () => {
    fetchEvents();
  };
  window.addEventListener('eventsUpdated', handleEventsUpdated);
  return () => window.removeEventListener('eventsUpdated', handleEventsUpdated);
}, []);
```

### Component Updates

These components automatically update when events change:
- EventStats component (statistics)
- Calendar component (calendar view)
- AllEventsTemplate (event list)
- Dashboard (overview)

## Deployment

### Local Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

A `docker-compose.yml` file is provided for containerized deployment:

```bash
docker-compose up -d --build
```

This starts:
- Next.js application on port 3000
- MongoDB on port 27017

### Environment Setup for Production

For production deployment, ensure:

1. **JWT_SECRET** is set to a strong, random value
2. **MONGODB_URI** points to production MongoDB instance
3. **NEXT_PUBLIC_API_URL** is set to production domain
4. Node environment is set to `production`

### Environment Variables


| Secret Name | Description | Example |
|-----------------------|---------------------------|---------------------------------------------------|
| `MONGODB_URI`         | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/crm` |
| `JWT_SECRET`          | JWT secret key            | `long-random-string` |
| `NEXT_PUBLIC_API_URL` | API base URL              | `https://crm.example.com` |

## GitHub Secrets

GitHub Secrets allow you to securely store sensitive environment variables for automated deployment workflows. These secrets are used to automatically generate the `.env.local` file during CI/CD pipeline execution.

### Setting Up GitHub Secrets

1. **Navigate to Repository Settings**
   - Go to your GitHub repository
   - Click **Settings** → **Secrets and variables** → **Actions**

2. **Create New Secrets**
   - Click **New repository secret**
   - Add each required secret (see table below)
   - Secrets are encrypted and never displayed in logs

3. **Using Secrets in Workflows**
   - Secrets are available in GitHub Actions as environment variables
   - Reference with `${{ secrets.SECRET_NAME }}`
   - Automatically masked in workflow logs for security

### Required GitHub Secrets for Deployment

| Secret Name | Description | Example | Required |
|-------------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string for production | `mongodb+srv://user:pass@cluster.mongodb.net/crm` | ✅ Yes |
| `JWT_SECRET` | JWT secret key for token signing | `use-openssl-rand-base64-32` | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | Production API base URL | `https://crm.example.com` | ✅ Yes |
| `HOST` | Server IP or hostname for deployment | `192.168.1.100` or `crm.example.com` | ✅ Yes |
| `USERNAME` | SSH username for server access | `deployer` | ✅ Yes |
| `PORT` | SSH port for server connection | `22` | ✅ Yes |
| `PRIVATE_KEY` | SSH private key (multiline) | `-----BEGIN RSA PRIVATE KEY-----...` | ✅ Yes |
| `DIRECTORY` | Deployment directory on server | `/home/deployer/crm` | ✅ Yes |

### Automated .env File Generation

GitHub Actions can automatically generate the `.env.local` file on your server during deployment:

#### Workflow Example (`.github/workflows/deploy.yml`)

```yaml
name: Deploy CRM Application

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Create .env.local file
        run: |
          cat > .env.local << EOF
          MONGODB_URI=${{ secrets.MONGODB_URI }}
          JWT_SECRET=${{ secrets.JWT_SECRET }}
          NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
          EOF

      - name: Install dependencies
        run: npm install

      - name: Build application
        run: npm run build

      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          port: ${{ secrets.PORT }}
          key: ${{ secrets.PRIVATE_KEY }}
          source: "./"
          target: ${{ secrets.DIRECTORY }}

      - name: Restart application
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          port: ${{ secrets.PORT }}
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            cd ${{ secrets.DIRECTORY }}
            npm install
            npm run build
            pm2 restart crm
```

### How Automated .env Generation Works

1. **Secrets Defined** - You configure secrets in GitHub repository settings
2. **Workflow Triggered** - GitHub Actions workflow runs on push or pull request
3. **Env File Created** - Workflow generates `.env.local` using secret values
4. **Application Built** - Next.js build uses environment variables
5. **Deployed to Server** - Built application deployed with all configs
6. **Application Runs** - Server runs application with production environment

### Benefits of Using GitHub Secrets

✅ **Security** - Secrets are encrypted and never exposed in logs  
✅ **Automation** - No manual `.env` file management needed  
✅ **Consistency** - Same configuration applied to all deployments  
✅ **Auditability** - GitHub tracks who accessed secrets and when  
✅ **Rotation** - Easy to update secrets without redeploying  
✅ **Environment Separation** - Different secrets for dev/staging/prod  

### Important Security Notes

> **⚠️ CRITICAL SECURITY REMINDERS:**

1. **Never commit `.env.local` to version control**
   - Add `.env.local` to `.gitignore`
   - Secrets should ONLY be in GitHub Secrets

2. **Use unique secrets per environment**
   - Development secrets != Production secrets
   - Different MongoDB databases for each environment

3. **Rotate secrets regularly**
   - Update `JWT_SECRET` periodically
   - Change `MONGODB_URI` credentials if exposed

4. **Audit secret access**
   - Review GitHub Actions logs for access patterns
   - Monitor for unauthorized deployments

5. **SSH Key Security**
   - Keep deployment SSH key secure
   - Use key-based authentication (no passwords)
   - Restrict key permissions with `chmod 600`

6. **Verify Workflow Security**
   - Only allow deployments from trusted branches
   - Require pull request reviews before production deploy
   - Use branch protection rules

### Creating an SSH Key for Deployment

```bash
# Generate RSA key pair
ssh-keygen -t rsa -b 4096 -f deploy_key -N ""

# View private key (paste into GitHub Secret)
cat deploy_key

# Add public key to server
ssh-copy-id -i deploy_key.pub user@server.com

# Or manually add to ~/.ssh/authorized_keys
cat deploy_key.pub >> ~/.ssh/authorized_keys
```

### Generating a Strong JWT_SECRET

```bash
# Generate 32-character random string
openssl rand -base64 32

# Example output:
# aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890+/=
```

## Usage

### Creating Your First Event

1. Log in with your admin credentials
2. Navigate to Dashboard or Calendar
3. Click "Create Event" button
4. Fill in event details:
   - **Event Name** - Event title
   - **Description** - Optional event details
   - **Priority** - Select HIGH, MEDIUM, or LOW
   - **Date & Time** - Choose event date and time
5. Click "Save Event"
6. Event appears immediately in Calendar and Dashboard

### Managing Customers

1. Go to Customers page
2. Click "Add Customer" button
3. Enter customer information:
   - Name, email, phone, company
   - Status (ACTIVE/INACTIVE/PENDING)
   - Assigned user
4. Save and customer is added to database
5. Click on customer to view/edit details

### User Administration (Admin Only)

1. Navigate to Users page (visible only to admins)
2. View list of all system users
3. Create new user:
   - Set name, email, password
   - Choose admin privileges
4. Update/delete existing users

### Monitoring Activity

1. Go to Log page (admin only)
2. View audit trail of all user actions
3. Filter by:
   - User
   - Action type (CREATE, UPDATE, DELETE)
   - Entity type (User, Customer, Event)
   - Status (SUCCESS, FAILURE)

## Troubleshooting

### Common Issues

#### "Failed to connect to MongoDB"

**Solution:** Ensure MongoDB is running and `MONGODB_URI` is correct:
```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/crm

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm?retryWrites=true&w=majority
```

#### "Invalid or expired token"

**Solution:** 
- Clear browser cookies and re-login
- Check JWT_SECRET matches between .env and application
- Ensure token hasn't expired (24-hour validity)

#### "Email already exists"

**Solution:** Use a unique email address during registration

#### "Not authorized to perform this action"

**Solution:** 
- Check user account has admin privileges for admin routes
- Verify JWT token is valid and included in request headers

#### "Events not showing in calendar"

**Solution:**
- Ensure events have been created in database
- Check browser console for fetch errors
- Verify API token is valid
- Try hard refresh (Ctrl+Shift+R)

#### "Styling looks broken"

**Solution:**
- Rebuild Tailwind CSS: `npm run build`
- Clear Next.js cache: `rm -rf .next && npm run build`
- Ensure Tailwind config is correct

### Debug Mode

Enable detailed logging:

```typescript
// In API routes or components
console.log('Debug:', { details });
```

Check browser console (F12) for client-side errors.
Check server terminal for server-side errors.

### Performance Tips

1. **Database Optimization** - Add indexes on frequently queried fields
2. **Lazy Loading** - Components load on demand
3. **Image Optimization** - Use Next.js Image component
4. **Code Splitting** - Next.js automatically splits bundles
5. **Caching** - Implement appropriate cache headers

---

## Downloads

### CRM Desktop Application

> **Latest Release:** [![Latest Release](https://img.shields.io/github/v/release/MarcoLenschau/CRM?style=flat-square)](https://github.com/MarcoLenschau/CRM/releases/latest)

#### Windows

- **[Setup Installer](https://github.com/MarcoLenschau/CRM/releases/download/v1.0.0-cd8c6d5/CRM-Desktop-1.0.0-Setup.exe)** - Windows installer with uninstaller
- **[Portable EXE](https://github.com/MarcoLenschau/CRM/releases/download/v1.0.0-cd8c6d5/CRM-Desktop-1.0.0-Portable.exe)** - Standalone executable (no installation needed)

**Installation:**
```bash
# Setup Installer (recommended)
CRM-Desktop-1.0.0-Setup.exe

# Or portable version
CRM-Desktop-1.0.0-Portable.exe
```

#### macOS

- **[DMG Package](https://github.com/MarcoLenschau/CRM/releases/download/latest/CRM-Desktop-1.0.0-mac.dmg)** - For Apple Silicon (M1, M2, M3+)
- **[ZIP Package](https://github.com/MarcoLenschau/CRM/releases/download/latest/CRM-Desktop-1.0.0-mac.zip)** - Portable app archive

**Installation:**
```bash
# DMG: Drag and drop to Applications folder
# ZIP: Extract and run the app
```

> **Note:** Built for Apple Silicon (arm64). For Intel Macs, you'll need to build locally or use Rosetta 2 translation

#### Linux

- **[DEB Package](https://github.com/MarcoLenschau/CRM/releases/download/v1.0.0-cd8c6d5/CRM-Desktop-1.0.0-x64.deb)** - For Debian, Ubuntu, Linux Mint
- **[RPM Package](https://github.com/MarcoLenschau/CRM/releases/download/v1.0.0-cd8c6d5/CRM-Desktop-1.0.0-x64.rpm)** - For Red Hat, Fedora, CentOS

**Installation:**
```bash
# For DEB-based systems (Debian/Ubuntu)
sudo dpkg -i CRM-Desktop-1.0.0-x64.deb

# For RPM-based systems (Red Hat/Fedora)
sudo rpm -i CRM-Desktop-1.0.0-x64.rpm
```

### 📚 Documentation

- [**CRM-Documentation-V.0.1.0**](https://github.com/MarcoLenschau/CRM/actions/runs/23138976327/artifacts/5941352569) - Complete API and project documentation

> **Note:** Visit [Releases](https://github.com/MarcoLenschau/CRM/releases) page for all versions, changelog, and previous releases 

---

**Last Updated:** March 16, 2026  
**Version:** 1.0.0  
**Maintainer:** Marco Lenschau
