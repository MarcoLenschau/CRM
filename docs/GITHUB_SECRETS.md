# GitHub Secrets & CI/CD

How to use GitHub Secrets for automated deployments and CI/CD workflows.

## Setting Up GitHub Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each required secret (see table below)

## Required Secrets

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `MONGODB_URI` | Production MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | JWT secret used in production | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | Production API base URL | ✅ Yes |
| `HOST` | Server IP or hostname | ✅ Yes |
| `USERNAME` | SSH username for server access | ✅ Yes |
| `PORT` | SSH port for server connection | ✅ Yes |
| `PRIVATE_KEY` | SSH private key (multiline) | ✅ Yes |
| `DIRECTORY` | Deployment directory on server | ✅ Yes |

## Example Workflow Snippet

The workflow can generate `.env.local` using secrets and then build/deploy the app. See `.github/workflows/deploy.yml` example in the original README for details.

## Security Notes

- Never expose secrets in logs
- Use branch protections and require reviews for production deployments
- Rotate secrets regularly