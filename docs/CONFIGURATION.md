# Configuration

## Environment Variables

All environment variables must be configured in the `.env.local` file in the project root.

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string for database access | `mongodb://localhost:27017/crm` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token signing and verification | `Bp?!(Z=x`2g&h=~-(X1|SY;K!<d(e8~0tP75O<0/$3RO(HRE2#` | ✅ Yes |
| `NEXT_PUBLIC_API_URL` | Frontend API base URL (public) | `http://localhost:3000` | ✅ Yes |

### Environment Variable Details

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

### Sample `.env.local` File

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

### Security Best Practices

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

## JWT Token Configuration

JWT tokens are used for secure API authentication. The token contains:
- `userId` - MongoDB user ID
- `email` - User email address
- `isAdmin` - Boolean flag for admin privileges
- `iat` - Issued at timestamp
- `exp` - Expiration timestamp (24 hours)
