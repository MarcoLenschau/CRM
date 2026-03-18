# Authentication

Details about authentication and role-based access control.

## How Authentication Works

1. User Login: email + password
2. Password Verification: bcryptjs
3. Token Generation: JWT token sent to client
4. Token Storage: HTTP-only cookie
5. Protected Routes: include token in Authorization header
6. Token Verification: verified using `JWT_SECRET`

## Role-Based Access Control

- Admin: Full access (user management, audit logs)
- User: Access to customer management, event scheduling, personal features

Admin-only routes are protected with `protectRoute(request, true)`.

## JWT Token Structure

Payload example:

```json
{
  "userId": "60d5ec49f1b2c5a8f3e2d1c0",
  "email": "user@example.com",
  "isAdmin": true,
  "iat": 1773568646,
  "exp": 1773655046
}
```

## JWT Token Configuration

Tokens expire after 24 hours. Keep `JWT_SECRET` secure and rotate periodically.