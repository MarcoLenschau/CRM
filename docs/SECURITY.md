# CRM Security Guidelines

Comprehensive security documentation for the CRM application covering authentication, data protection, deployment security, and best practices.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Authentication Security](#authentication-security)
3. [Data Protection](#data-protection)
4. [API Security](#api-security)
5. [Database Security](#database-security)
6. [Deployment Security](#deployment-security)
7. [Environment Variables](#environment-variables)
8. [Password Security](#password-security)
9. [Session Management](#session-management)
10. [Input Validation](#input-validation)
11. [Error Handling](#error-handling)
12. [Security Headers](#security-headers)
13. [Monitoring and Logging](#monitoring-and-logging)
14. [Incident Response](#incident-response)


## Security Overview

The CRM application implements multiple layers of security to protect user data and ensure system integrity:

- **Authentication:** JWT-based authentication with secure token generation
- **Authorization:** Role-based access control (Admin/User)
- **Encryption:** Password hashing with bcryptjs, optional data encryption
- **Data Validation:** Input validation on all endpoints
- **Secure Communication:** HTTPS enforced in production
- **Audit Logging:** Comprehensive activity logging

### Security Principles

1. **Principle of Least Privilege** - Users only get permissions they need
2. **Defense in Depth** - Multiple security layers
3. **Fail Securely** - Errors don't expose sensitive information
4. **Never Trust User Input** - All input validated server-side
5. **Secure by Default** - Security features enabled by default

---

## Authentication Security

### JWT Token Security

**Token Structure:**
```
Header.Payload.Signature
```

**Token Payload:**
```json
{
  "userId": "507f1f77bcf86cd799439014",
  "email": "user@example.com",
  "isAdmin": false,
  "iat": 1773568646,
  "exp": 1773655046
}
```

**Security Features:**

1. **Token Expiration**
   - Tokens expire after **24 hours**
   - Users must re-authenticate after expiration
   - No infinite tokens issued

2. **Token Signing**
   - Tokens signed with `JWT_SECRET`
   - `HS256` algorithm used for signing
   - Invalid or tampered tokens rejected

3. **Token Storage**
   - Stored in **HTTP-only cookies**
   - Not accessible via JavaScript
   - Automatically sent with each request
   - Protected from XSS attacks

4. **Token Transmission**
   - Transmitted in **HTTP-only cookies** (production)
   - Always sent over **HTTPS only** in production
   - Credentials mode enabled in API requests
   - Never logged or exposed in errors

### Login Security

**Login Process:**

```
1. User submits email + password
2. Server validates email exists
3. Password compared with bcrypt hash
4. Match: Generate JWT token
5. Token sent in HTTP-only cookie
6. Mismatch: Generic error returned
```

**Security Measures:**

- ✅ Passwords never logged
- ✅ Generic error messages (don't reveal if email exists)
- ✅ Rate limiting recommended (implement separately)
- ✅ Failed attempts logged for monitoring

**Example Login Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Password Security

**Password Requirements:**

- Minimum 8 characters recommended
- Should include uppercase, lowercase, numbers, symbols
- Never transmitted in plain text (always HTTPS)
- Never logged or stored in plain text

**Password Hashing:**

```typescript
// bcryptjs hashing
import bcryptjs from "bcryptjs";

const hashedPassword = await bcryptjs.hash(password, 10);
// 10 = salt rounds (computational cost)
```

**Why bcryptjs?**
- Automatically salted
- Slow by design (prevents brute force)
- Industry standard
- Resistant to rainbow tables

---

## Data Protection

### Sensitive Data Classification

| Data Type | Sensitivity | Protection |
|-----------|-------------|-----------|
| Passwords | **CRITICAL** | Hashed (bcryptjs) |
| Email Addresses | **HIGH** | Encrypted/Indexed |
| User IDs | **MEDIUM** | Standard database security |
| Event Details | **MEDIUM** | Standard database security |
| Audit Logs | **HIGH** | Immutable, encrypted |
| JWT Tokens | **CRITICAL** | Signed, HTTP-only |

### Personal Data Handling

**Data Minimization:**
- Collect only necessary data
- Don't store sensitive data unnecessarily
- Implement data retention policies

**User Data Access:**
```
Regular Users:
  - Can see their own events
  - Can see customers assigned to them
  - Cannot see other users' data

Admins:
  - Can see all user data
  - Can view audit logs
  - Can manage all users
```

### Data Deletion

```bash
# Delete user (removes all associated data)
DELETE /api/user/[id]

# Delete event
DELETE /api/event/[id]

# Archive customer instead of delete
PUT /api/customer/[id]
{
  "status": "INACTIVE"
}
```

---

## API Security

### Authentication Requirements

**Protected Routes** (All require valid JWT):

- `GET /api/event` - All authenticated users
- `POST /api/event` - All authenticated users
- `DELETE /api/event/[id]` - All authenticated users
- `GET /api/customer` - All authenticated users
- `POST /api/customer` - All authenticated users
- `GET /api/log` - All authenticated users

**Admin-Only Routes:**

- `POST /api/user` - Create user
- `GET /api/user` - Fetch all users
- `PUT /api/user/[id]` - Update user
- `DELETE /api/user/[id]` - Delete user
- `POST /api/log` - Create log entry

**Public Routes** (No authentication needed):

- `POST /api/register` - User registration
- `POST /api/auth` - Login

### Token Verification

```typescript
// Middleware checks token on every protected request
export async function protectRoute(request: Request, isAdmin = false) {
  // 1. Extract token from cookie
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return { isValid: false, error: Response.json(...) };
  }
  
  // 2. Verify token signature
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { isValid: false, error: Response.json(...) };
  }
  
  // 3. Check admin requirement
  if (isAdmin && !decoded.isAdmin) {
    return { isValid: false, error: Response.json(...) };
  }
  
  return { isValid: true, user: decoded };
}
```

### Request Validation

**All API requests must include:**

1. **Content-Type Header** (for POST/PUT)
   ```
   Content-Type: application/json
   ```

2. **Valid JSON Body**
   ```json
   {
     "userID": "user@example.com",
     "name": "Event Name"
   }
   ```

3. **Authentication Token**
   - In cookie: `token=eyJ...`
   - Or header: `Authorization: Bearer eyJ...`

### Response Security

**Sensitive Data Never Returned:**

```json
// ❌ WRONG - Password exposed
{
  "user": {
    "email": "user@example.com",
    "password": "hash..."
  }
}

// ✅ CORRECT - Password excluded
{
  "user": {
    "_id": "507f...",
    "email": "user@example.com"
  }
}
```

---

## Database Security

### MongoDB Security

**Connection Security:**

```bash
# Local development
MONGODB_URI=mongodb://localhost:27017/crm

# Production (MongoDB Atlas)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/crm?retryWrites=true&w=majority
```

**MongoDB Atlas Security:**

1. **IP Whitelisting**
   - Only allow your server IPs
   - Restrict to specific ports
   - Enable VPC peering in production

2. **Authentication**
   - Use strong database passwords
   - Enable authentication for all users
   - Use read-only users where possible

3. **Encryption**
   - Enable encryption at rest
   - Use SSL/TLS for connections
   - Enable audit logging

4. **Backups**
   - Enable automated backups
   - Store backups securely
   - Test backup restoration regularly

### Database Indexing

**Create indexes for security and performance:**

```typescript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });

// Customers collection
db.customers.createIndex({ email: 1 });

// Events collection
db.events.createIndex({ userID: 1 });
db.events.createIndex({ createdAt: -1 });

// Logs collection
db.logs.createIndex({ userID: 1 });
db.logs.createIndex({ createdAt: -1 });
```

### Query Injection Prevention

The application uses Mongoose ORM which prevents SQL injection:

```typescript
// ✅ SAFE - Query object with validation
const user = await UserModel.findOne({ email: userInput });

// ❌ UNSAFE - String interpolation (NOT done)
// db.users.findOne({ email: `"${userInput}"` });
```

---

## Deployment Security

### Pre-Deployment Checklist

- [ ] **Environment Variables Set**
  - `JWT_SECRET` is strong and unique
  - `MONGODB_URI` uses production database
  - `NODE_ENV=production`

- [ ] **HTTPS Enabled**
  - SSL/TLS certificate installed
  - HTTP redirects to HTTPS
  - HSTS header enabled

- [ ] **Secrets Configured**
  - All GitHub Secrets set
  - No secrets in code/commits
  - SSH keys restricted

- [ ] **Database Secured**
  - IP whitelisting enabled
  - Backups configured
  - Credentials rotated

- [ ] **Application Hardened**
  - Error pages don't expose stack traces
  - Debug mode disabled
  - Logging configured

### Production Deployment

**1. Server Setup**

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB (or use Atlas)
sudo apt-get install -y mongodb

# Create app directory
sudo mkdir -p /var/www/crm
sudo chown $USER:$USER /var/www/crm
```

**2. Environment Setup**

```bash
# Create .env.local on server
cat > /var/www/crm/.env.local << EOF
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/crm
JWT_SECRET=$(openssl rand -base64 32)
NEXT_PUBLIC_API_URL=https://crm.example.com
NODE_ENV=production
EOF

# Restrict file permissions
chmod 600 /var/www/crm/.env.local
```

**3. Application Deployment**

```bash
# Clone repository
cd /var/www/crm
git clone https://github.com/MarcoLenschau/CRM.git .

# Install dependencies
npm install --production

# Build application
npm run build

# Start with process manager
npm install -g pm2
pm2 start npm --name "crm" -- run start
pm2 startup
pm2 save
```

**4. Nginx Reverse Proxy**

```nginx
server {
    listen 80;
    server_name crm.example.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name crm.example.com;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/crm.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crm.example.com/privkey.pem;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Security
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Environment Variables

### Required Environment Variables

| Variable | Purpose | Example | Security Level |
|----------|---------|---------|-----------------|
| `JWT_SECRET` | Token signing key | `openssl rand -base64 32` | 🔴 CRITICAL |
| `MONGODB_URI` | Database connection | `mongodb+srv://user:pass@...` | 🔴 CRITICAL |
| `NODE_ENV` | Application mode | `production` | 🟡 HIGH |
| `NEXT_PUBLIC_API_URL` | API base URL | `https://crm.example.com` | 🟢 MEDIUM |

### Environment Variable Security

**Never:**
- ❌ Commit `.env.local` to version control
- ❌ Log environment variables
- ❌ Expose in error messages
- ❌ Send to client (except NEXT_PUBLIC_*)
- ❌ Hardcode secrets in code

**Always:**
- ✅ Use `.gitignore` for `.env.local`
- ✅ Use GitHub Secrets for CI/CD
- ✅ Rotate secrets regularly
- ✅ Use different secrets per environment
- ✅ Store in secure secret manager (production)

### Generating Secure Secrets

```bash
# Generate strong JWT_SECRET (32 bytes, base64 encoded)
openssl rand -base64 32

# Generate URL-safe random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password', 10))"
```

---

## Password Security

### Password Policy

**Minimum Requirements:**

- 8 characters minimum
- Uppercase letter (A-Z)
- Lowercase letter (a-z)
- Number (0-9)
- Special character (!@#$%^&*)

**Strong Password Examples:**
```
✅ MyP@ssw0rd123
✅ Secure#Pass2026
✅ CRM_Admin!2026
```

**Weak Password Examples:**
```
❌ password
❌ 12345678
❌ qwerty
❌ password123
```

### Password Hashing

**Implementation:**

```typescript
import bcryptjs from "bcryptjs";

// Hashing during registration/password change
export async function hashPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, 10);
}

// Verification during login
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hash);
}
```

**Bcryptjs Features:**

- Automatic salt generation
- Adaptive cost (10 rounds = ~100ms per hash)
- Resistant to GPU/ASIC attacks
- Industry standard

### Password Reset (Future Feature)

When implementing password reset:

1. Generate secure reset token
2. Send via email (not SMS)
3. Token expires after 1 hour
4. One-time use only
5. New password must differ from old
6. Log password change event

---

## Session Management

### Session Security

**Cookie Configuration:**

```typescript
// HTTP-only, Secure, SameSite
response.cookies.set({
  name: "token",
  value: jwtToken,
  httpOnly: true,        // Prevent JavaScript access
  secure: true,          // HTTPS only (production)
  sameSite: "strict",    // CSRF protection
  maxAge: 86400          // 24 hours
});
```

### Session Timeout

**24-Hour Token Expiration:**

```typescript
const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  },
  process.env.JWT_SECRET!,
  { expiresIn: "24h" }  // Token expires in 24 hours
);
```

**Idle Session Timeout:**

```typescript
// Frontend implementation (optional)
let idleTimeout;

window.addEventListener("mousemove", resetIdleTimer);
window.addEventListener("keypress", resetIdleTimer);

function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    // Auto-logout after 30 minutes idle
    window.location.href = "/login";
  }, 30 * 60 * 1000);
}
```

### Logout Security

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/logout \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Logout Process:**

1. Clear token cookie
2. Set max-age to 0
3. Client redirects to login
4. Log logout event
5. Token invalid for future requests

---

## Input Validation

### Validate All User Input

**Email Validation:**

```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(body.email)) {
  return Response.json(
    { error: "Invalid email format" },
    { status: 400 }
  );
}
```

**Event Priority Validation:**

```typescript
const validPriorities = ["HIGH", "MEDIUM", "LOW"];

if (!validPriorities.includes(body.prio)) {
  return Response.json(
    { error: "Invalid priority level" },
    { status: 400 }
  );
}
```

**Date Validation:**

```typescript
const eventDate = new Date(body.eventDate);

if (isNaN(eventDate.getTime())) {
  return Response.json(
    { error: "Invalid date format" },
    { status: 400 }
  );
}
```

### Input Sanitization

**Prevent XSS:**

```typescript
// ❌ Don't store user input as-is in database
db.insert({ message: userInput }); // Vulnerable

// ✅ Store safely, escape on output
import DOMPurify from "isomorphic-dompurify";
const clean = DOMPurify.sanitize(userInput);
db.insert({ message: clean }); // Safe
```

---

## Error Handling

### Secure Error Messages

**What NOT to reveal:**

- ❌ Database error details
- ❌ Stack traces
- ❌ File system paths
- ❌ Software versions
- ❌ User existence confirmation

**Generic Error Messages:**

```typescript
// ❌ WRONG - Reveals too much
{
  "error": "User with email admin@example.com not found",
  "stack": "Error: SELECT * FROM users..."
}

// ✅ CORRECT - Generic and safe
{
  "error": "Invalid email or password"
}
```

### Error Logging

**Log Errors Securely:**

```typescript
try {
  // API operation
} catch (error) {
  // Log full error internally
  console.error("Database error:", error);
  
  // Return generic error to client
  return Response.json(
    { error: "Operation failed" },
    { status: 500 }
  );
}
```

---

## Security Headers

### HTTP Security Headers

**Recommended Headers:**

```nginx
# Prevent content type sniffing
X-Content-Type-Options: nosniff

# Prevent clickjacking
X-Frame-Options: DENY

# Enable XSS protection
X-XSS-Protection: 1; mode=block

# Content Security Policy
Content-Security-Policy: default-src 'self'

# Force HTTPS
Strict-Transport-Security: max-age=31536000; includeSubDomains

# Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions Policy
Permissions-Policy: camera=(), microphone=(), payment=()
```

### Next.js Security Headers

**In `next.config.ts`:**

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
```

---

## Monitoring and Logging

### Audit Logging

**Log These Events:**

- User login/logout
- Failed authentication attempts
- User creation/deletion
- Permission changes
- Event creation/deletion
- Customer modifications
- Sensitive data access

**Log Entry Structure:**

```json
{
  "_id": "507f1f77bcf86cd799439016",
  "userID": "user@example.com",
  "action": "LOGIN",
  "entity": "User",
  "status": "SUCCESS",
  "description": "User logged in successfully",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "createdAt": "2026-03-15T10:30:00Z"
}
```

### Monitoring Alerts

**Configure alerts for:**

- Multiple failed login attempts
- Unauthorized access attempts
- Unusual database activity
- High error rates
- Performance degradation
- Disk space low
- Database backups failing

### Log Retention

**Retention Policy:**

- Application logs: 30 days
- Audit logs: 1 year
- Error logs: 90 days
- Access logs: 60 days
- Archive older logs securely

---

## Incident Response

### Security Incident Checklist

**Immediate Actions (0-1 hours):**

1. Identify and isolate affected systems
2. Preserve evidence/logs
3. Notify security team
4. Document incident timeline
5. Begin incident response

**Assessment (1-4 hours):**

1. Determine scope of incident
2. Identify affected users/data
3. Assess data compromise
4. Review access logs
5. Check for persistence

**Containment (4-24 hours):**

1. Reset compromised passwords
2. Revoke exposed tokens
3. Rotate credentials
4. Apply security patches
5. Update access controls

**Recovery (24 hours onwards):**

1. Restore from clean backups
2. Redeploy patched application
3. Restore normal operations
4. Monitor for issues

**Post-Incident (After recovery):**

1. Conduct forensic analysis
2. Document lessons learned
3. Update security policies
4. Implement preventative measures
5. Notify affected users if required

### Breach Notification

**If user data is compromised:**

1. **Assess breach severity**
   - What data was exposed?
   - How many users affected?
   - Was encryption used?

2. **Notify users**
   - Send email notification
   - Include exposed data type
   - Recommend password reset
   - Provide support contact

3. **Report authorities**
   - GDPR: Within 72 hours to DPA
   - CCPA: Within 45 days to residents
   - Other jurisdictions: Check local law

4. **Document response**
   - What happened
   - When discovered
   - How disclosed
   - What was done

### Emergency Contacts

Create a security incident response contact list:

```
Security Team Lead: [Name] - [Email] - [Phone]
System Administrator: [Name] - [Email] - [Phone]
Database Administrator: [Name] - [Email] - [Phone]
Legal/Compliance: [Name] - [Email] - [Phone]
External Security Firm: [Company] - [Phone]
```

---

## Security Checklist

### Development

- [ ] All input validated server-side
- [ ] No hardcoded secrets in code
- [ ] Passwords hashed with bcryptjs
- [ ] JWT tokens signed with strong secret
- [ ] Error messages don't expose details
- [ ] Sensitive data excluded from responses
- [ ] SQL/NoSQL injection prevented
- [ ] XSS protection implemented

### Testing

- [ ] Security tests included in CI/CD
- [ ] Authentication/authorization tested
- [ ] API endpoint access controls verified
- [ ] Input validation tested
- [ ] Error handling tested
- [ ] Password hashing verified
- [ ] Token expiration tested
- [ ] Logout functionality tested

### Deployment

- [ ] Environment variables configured
- [ ] HTTPS/SSL enabled
- [ ] Security headers set
- [ ] CORS configured correctly
- [ ] Database credentials secured
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Logging configured
- [ ] SSH keys secured
- [ ] Firewall rules set

### Operations

- [ ] Regular security updates
- [ ] Dependency vulnerabilities scanned
- [ ] Logs monitored for incidents
- [ ] Access logs reviewed
- [ ] Backup integrity verified
- [ ] Credentials rotated periodically
- [ ] Incident response plan documented
- [ ] Security training completed

---

## Security Resources

**Tools:**

- **npm audit** - Check JavaScript dependencies
- **OWASP ZAP** - Web application security scanner
- **SSL Labs** - SSL/TLS configuration checker
- **Have I Been Pwned** - Check compromised credentials

**Documentation:**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Top 10](https://owasp.org/www-project-api-security/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Next.js Security](https://nextjs.org/docs)

**References:**

- CWE: Common Weakness Enumeration
- CVE: Common Vulnerabilities and Exposures
- CVSS: Common Vulnerability Scoring System

---

## Reporting Security Issues

If you discover a security vulnerability, **do not** open a public issue.

**Instead:**

1. Email: contact@marco-lenschau.de
2. Include: Vulnerability description, steps to reproduce, impact
3. Wait: 90 days before public disclosure
4. Expect: Security team will investigate and patch

---

**Last Updated:** March 15, 2026  
**Version:** 1.0.0  
**Status:** Production Ready

**Next Review:** March 15, 2027  
**Responsible:** Security Team
