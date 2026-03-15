# CRM Installation Guide

Complete step-by-step installation and setup guide for the CRM application. This guide covers local development setup, Docker deployment, and production deployment.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start (Local Development)](#quick-start-local-development)
3. [Local Installation (Detailed)](#local-installation-detailed)
4. [MongoDB Setup](#mongodb-setup)
5. [Docker Installation](#docker-installation)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Verification](#verification)

---

## System Requirements

### Minimum Requirements

| Component | Version | Requirement |
|-----------|---------|------------|
| Node.js | 18.x or higher | Required |
| npm | 9.x or higher | Required |
| Git | 2.x or higher | Required |
| MongoDB | 6.x or higher | Required (Local or Atlas) |
| RAM | 2GB minimum | For development |
| Disk Space | 500MB | For dependencies and database |

### Recommended Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20.x LTS | Better performance |
| Docker | Latest | For containerized deployment |
| Docker Compose | 2.x | For multi-container setup |
| VS Code | Latest | Development IDE |
| Postman | Latest | API testing |

### Supported Operating Systems

- ✅ Ubuntu 20.04 LTS or higher
- ✅ Debian 11 or higher
- ✅ macOS 12 or higher
- ✅ Windows 11 with WSL2
- ✅ Windows Server 2019 or higher

---

## Quick Start (Local Development)

Get the CRM running in 5 minutes:

### 1. Clone Repository

```bash
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cat > .env.local << EOF
MONGODB_URI=mongodb://localhost:27017/crm
JWT_SECRET=Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2#
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
EOF
```

### 4. Start MongoDB (if local)

```bash
# Ubuntu/Debian
sudo systemctl start mongodb

# macOS with Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Access Application

```
http://<IP-ADDRESS>:3000
```

> **Note:** There are no default credentials. You must register a user first via the registration page or API endpoint to login.

---

## Local Installation (Detailed)

Step-by-step detailed installation guide for different operating systems.

### Prerequisites Installation

#### Ubuntu/Debian

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # v20.x.x
npm --version   # 10.x.x
git --version   # 2.x.x
```

#### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node@20

# Verify installation
node --version  # v20.x.x
npm --version   # 10.x.x
git --version   # 2.x.x
```

#### Windows 11 (with WSL2)

```powershell
# Install WSL2
wsl --install

# Install Ubuntu 22.04 in WSL2
wsl --install -d Ubuntu-22.04

# Then follow Ubuntu/Debian instructions
```

### Application Installation

#### Step 1: Clone Repository

```bash
# Via HTTPS
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM

# Via SSH (requires SSH key configured)
git clone git@github.com:MarcoLenschau/CRM.git
cd CRM
```

#### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

**Expected Dependencies:**

```
├── bcryptjs@^3.0.3          (Password hashing)
├── jsonwebtoken@^9.0.3      (JWT authentication)
├── mongoose@^9.3.0          (MongoDB ORM)
├── next@16.1.6              (React framework)
├── react@19.2.3             (UI library)
├── react-dom@19.2.3         (React DOM)
└── sass@^1.97.3             (CSS preprocessing)
```

#### Step 3: Configure Environment Variables

**Create `.env.local` file:**

```bash
cat > .env.local << EOF
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/crm

# JWT Configuration
JWT_SECRET=Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2#

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Environment
NODE_ENV=development
EOF
```

**Secure permissions:**

```bash
chmod 600 .env.local
```

#### Step 4: Verify Configuration

```bash
# Check if environment variables are loaded
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.JWT_SECRET ? '✓ JWT_SECRET loaded' : '✗ Missing JWT_SECRET')"
```

#### Step 5: Start Development Server

```bash
npm run dev
```

**Expected Output:**

```
  ▲ Next.js 16.1.6
  - Local:        http://<IP-ADDRESS>:3000
  - Environments: .env.local

 ✓ Ready in 3.2s
```

#### Step 6: Verify Application

Open browser and test:

```
http://<IP-ADDRESS>:3000/
```

You should see the CRM login page.

---

## MongoDB Setup

### Option 1: Local MongoDB (Linux/macOS)

#### Install MongoDB

**Ubuntu/Debian:**

```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh --version
```

**macOS:**

```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh --version
```

#### Create Database

```bash
# Connect to MongoDB
mongosh

# Create database and user
use crm

db.createUser({
  user: "crm_user",
  pwd: "your_secure_password",
  roles: ["readWrite"]
})

# Verify user creation
db.system.users.find()

# Exit
exit
```

#### Update Environment Variable

```bash
# For authenticated connection
MONGODB_URI=mongodb://crm_user:your_secure_password@localhost:27017/crm?authSource=admin
```

### Option 2: MongoDB Atlas (Cloud)

#### Create MongoDB Atlas Cluster

1. **Visit** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Sign up** or login
3. **Create Project** → "Create Project" button
4. **Build Cluster** → Select free tier
5. **Configure**:
   - Provider: AWS
   - Region: Choose nearest to you
   - Tier: M0 (free)
6. **Create Cluster** (takes 2-5 minutes)

#### Setup Database Access

1. **Go to** Database Access
2. **Add New Database User**:
   - Username: `crm_user`
   - Password: Generate secure password
   - Role: `readWrite` for `crm` database
3. **Add User**
4. **Copy Password** (you won't see it again)

#### Setup Network Access

1. **Go to** Network Access
2. **Add IP Address**:
   - For development: Allow from anywhere (0.0.0.0/0)
   - For production: Add your server IP only
3. **Confirm**

#### Get Connection String

1. **Go to** Databases → Clusters
2. **Click** "Connect" button
3. **Select** "Drivers" → "Node.js"
4. **Copy** connection string

**Example:**

```
mongodb+srv://crm_user:PASSWORD@cluster.mongodb.net/crm?retryWrites=true&w=majority
```

#### Update Environment Variable

```bash
# Replace PASSWORD with your actual password
MONGODB_URI=mongodb+srv://crm_user:your_password@cluster.mongodb.net/crm?retryWrites=true&w=majority
```

#### Verify Connection

```bash
node << 'EOF'
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => console.error('✗ Connection failed:', err.message));
EOF
```

---

## Docker Installation

Deploy CRM using Docker and Docker Compose.

### Prerequisites

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker --version
docker-compose --version
```

### Using Docker Compose

#### 1. Create .env.local for Docker

```bash
cat > .env.local << EOF
# MongoDB Configuration
MONGODB_URI=mongodb://mongodb:27017/crm
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=rootpassword
MONGO_INITDB_DATABASE=crm

# JWT Configuration
JWT_SECRET=Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2#

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Environment
NODE_ENV=development
EOF
```

#### 2. Review docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: crm_mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_INITDB_DATABASE}
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - crm_network

  app:
    build: .
    container_name: crm_app
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: ${MONGODB_URI}
      JWT_SECRET: ${JWT_SECRET}
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
      NODE_ENV: ${NODE_ENV}
    depends_on:
      - mongodb
    networks:
      - crm_network

volumes:
  mongodb_data:

networks:
  crm_network:
```

#### 3. Build and Start

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Verify services are running
docker-compose ps
```

**Expected Output:**

```
NAME                STATUS              PORTS
crm_mongodb        Up 2 seconds        27017/tcp
crm_app           Up 2 seconds        0.0.0.0:3000->3000/tcp
```

#### 4. View Logs

```bash
# View all logs
docker-compose logs -f

# View app logs only
docker-compose logs -f app

# View MongoDB logs
docker-compose logs -f mongodb
```

#### 5. Stop Services

```bash
# Stop without removing
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove volumes too
docker-compose down -v
```

### Build Custom Docker Image

#### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy application
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://<IP-ADDRESS>:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["npm", "run", "start"]
```

#### 2. Build Image

```bash
docker build -t crm:latest .
```

#### 3. Run Container

```bash
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/crm \
  -e JWT_SECRET=Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2# \
  --name crm_container \
  crm:latest
```

---

## Production Deployment

Complete production deployment guide for AWS EC2, DigitalOcean, or any Linux server.

### 1. Server Preparation

#### Create Deployment User

```bash
# Create dedicated user
sudo useradd -m -s /bin/bash crm-app

# Grant sudo privileges (optional)
sudo usermod -aG sudo crm-app

# Switch to new user
sudo su - crm-app
```

#### Update System

```bash
# Update packages
sudo apt-get update
sudo apt-get upgrade -y

# Install essential tools
sudo apt-get install -y \
  curl \
  wget \
  git \
  build-essential \
  python3 \
  pm2
```

### 2. Install Node.js

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### 3. Install MongoDB (or use Atlas)

**Option A: Local MongoDB**

```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Enable and start
sudo systemctl enable mongod
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**

No installation needed - use cloud connection string in `.env.local`.

### 4. Deploy Application

#### Clone Repository

```bash
cd /home/crm-app
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM
```

#### Create Environment File

```bash
cat > .env.local << EOF
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/crm

# JWT
JWT_SECRET=$(openssl rand -base64 32)

# API
NEXT_PUBLIC_API_URL=https://crm.example.com

# Environment
NODE_ENV=production
EOF

# Secure
chmod 600 .env.local
```

#### Install Dependencies

```bash
npm install --production
```

#### Build Application

```bash
npm run build
```

#### Start with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start npm --name "crm" -- run start

# Configure startup
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs crm
```

### 5. Setup Nginx Reverse Proxy

#### Install Nginx

```bash
sudo apt-get install -y nginx
```

#### Create Configuration

```bash
sudo cat > /etc/nginx/sites-available/crm << 'EOF'
server {
    listen 80;
    server_name crm.example.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name crm.example.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/crm.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crm.example.com/privkey.pem;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    
    # Logging
    access_log /var/log/nginx/crm.access.log;
    error_log /var/log/nginx/crm.error.log;
    
    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

#### Enable Configuration

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/crm /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 6. Setup SSL Certificate

#### Install Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

#### Get Certificate

```bash
sudo certbot certonly --standalone -d crm.example.com
```

#### Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Cron job (automatic)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 7. Setup Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

### 8. Monitoring Setup

#### Install PM2 Monitoring

```bash
# Link PM2 account
pm2 web
pm2 link <secret> <public_id>

# View dashboard at https://app.pm2.io
```

#### Setup Log Rotation

```bash
sudo cat > /etc/logrotate.d/crm << EOF
/var/log/nginx/crm.access.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
EOF
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "MongoDB connection refused"

**Cause:** MongoDB service not running or wrong connection string

**Solution:**

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# If not running, start it
sudo systemctl start mongod

# Verify connection string in .env.local
cat .env.local | grep MONGODB_URI

# Test connection
mongosh "MONGODB_URI"
```

#### Issue: "JWT_SECRET is not defined"

**Cause:** Environment variable not set

**Solution:**

```bash
# Check if .env.local exists
ls -la .env.local

# If not found, create it
cat > .env.local << EOF
JWT_SECRET=$(openssl rand -base64 32)
MONGODB_URI=mongodb://localhost:27017/crm
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
EOF

# Restart development server
npm run dev
```

#### Issue: "Port 3000 already in use"

**Cause:** Another process using port 3000

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000
# or
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### Issue: "Dependencies not installed"

**Cause:** npm install failed or incomplete

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: "Authentication failed (401)"

**Cause:** Invalid token or not sent

**Solution:**

```bash
# Verify token is in cookie
curl -v http://<IP-ADDRESS>:3000/api/event

# Or send token in header
curl -H "Authorization: Bearer YOUR_TOKEN" http://<IP-ADDRESS>:3000/api/event

# Re-login to get new token
curl -X POST http://<IP-ADDRESS>:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"info@example.com","password":"Wp"avNd-J+/E£y|98CiW4Cy{p'"pd"}'
```

#### Issue: "Build fails with 'out of memory'"

**Cause:** Insufficient RAM

**Solution:**

```bash
# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Or use a server with more RAM
```

#### Issue: "Nginx returns 502 Bad Gateway"

**Cause:** Node.js application not running or Nginx can't reach it

**Solution:**

```bash
# Check if app is running
pm2 status

# Check app logs
pm2 logs crm

# Verify Nginx configuration
sudo nginx -t

# Check port accessibility
curl -i http://127.0.0.1:3000

# Restart Nginx
sudo systemctl restart nginx
```

---

## Verification

### Verify Installation

#### 1. Check Environment

```bash
# Verify Node.js
node --version    # Should be 18.x or higher
npm --version     # Should be 9.x or higher

# Verify npm packages
npm list --depth=0 | grep -E "(bcryptjs|jsonwebtoken|mongoose|next)"
```

#### 2. Check Database Connection

```bash
# Test MongoDB connection
node << 'EOF'
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected');
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });
EOF
```

#### 3. Test API Endpoints

```bash
# Test Login (no auth required)
curl -X POST http://<IP-ADDRESS>:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"info@example.com","password":"Wp"avNd-J+/E£y|98CiW4Cy{p'"pd"}'

# Expected response:
# {"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# Get token from response and test protected route
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Test Get Events (requires auth)
curl -X GET http://<IP-ADDRESS>:3000/api/event \
  -H "Cookie: token=$TOKEN"

# Expected response:
# {"success":true,"events":[...]}
```

#### 4. Check Application Logs

```bash
# Development
npm run dev
# Look for: "✓ Ready in X.Xs"

# Docker
docker-compose logs -f app

# Production (PM2)
pm2 logs crm
```

#### 5. Browser Access

```
Development:  http://<IP-ADDRESS>:3000
Production:   https://crm.example.com
```

You should see the CRM login page.


## Next Steps

After successful installation:

1. ✅ Read [README.md](./README.md) for usage guide
2. ✅ Read [API.md](./API.md) for API documentation
3. ✅ Read [SECURITY.md](./SECURITY.md) for security practices
4. ✅ Setup monitoring and backups
5. ✅ Configure GitHub Secrets (see README.md)
6. ✅ Start building features!


**Last Updated:** March 15, 2026  
**Version:** 1.0.0  
**Status:** Production Ready

**Support:** For issues, see Troubleshooting section or open an issue on GitHub
