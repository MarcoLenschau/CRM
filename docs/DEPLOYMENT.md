# Deployment

Guidance for deploying the CRM application.

## Local Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

A `docker-compose.yml` file is provided for containerized deployment:

```bash
docker-compose up -d --build
```

This starts:
- Next.js application on port 3000
- MongoDB on port 27017

## Production Checklist

1. Set `JWT_SECRET` to a strong, random value
2. Set `MONGODB_URI` to your production database
3. Set `NEXT_PUBLIC_API_URL` to the production domain
4. Run in `production` Node environment

## Environment Variables

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/crm` |
| `JWT_SECRET` | JWT secret key | `long-random-string` |
| `NEXT_PUBLIC_API_URL` | API base URL | `https://crm.example.com` |