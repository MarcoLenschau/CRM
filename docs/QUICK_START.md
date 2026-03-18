# Quick Start

Get the CRM application running quickly.

## 1. Clone the repository

```bash
git clone https://github.com/MarcoLenschau/CRM.git
cd CRM
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Create a `.env.local` in the project root with:

```bash
cat > .env.local << EOF
MONGODB_URI=mongodb://localhost:27017/crm
JWT_SECRET=your-super-secret-key-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF
```

## 4. Start development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

> Note: Ensure MongoDB is running locally or use MongoDB Atlas. Register a user first via the registration page or use the `/api/register` endpoint to create an account.