# CRM API Documentation

Complete API reference for all endpoints with parameters, request/response examples, and authentication requirements.

## Table of Contents

1. [Authentication](#authentication)
2. [Events](#events)
3. [Customers](#customers)
4. [Users](#users)
5. [Logs](#logs)
6. [Error Handling](#error-handling)
7. [Status Codes](#status-codes)

---

## Authentication

All API endpoints (except registration) require a valid JWT token. Tokens are obtained through the login endpoint and must be included in subsequent requests.

### Token Storage

- **Storage Location:** HTTP-only cookie named `token`
- **Format:** JWT (JSON Web Token)
- **Validity:** 24 hours
- **Transmission:** Automatically sent with requests via credentials

### Login Process

1. User provides email and password
2. Server validates credentials
3. JWT token is generated and returned
4. Token stored in HTTP-only cookie
5. Subsequent requests include token automatically

---

## Events

Event management endpoints for creating, reading, and deleting events.

### Create Event

**Endpoint:** `POST /api/event`

**Authentication:** Required (all authenticated users)

**Description:** Create a new event with date, time, priority, and optional description.

**Request Body:**

```json
{
  "userID": "user@example.com",
  "name": "Client Meeting",
  "description": "Quarterly review meeting",
  "prio": "HIGH",
  "eventDate": "2026-03-20T14:30:00Z"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userID` | string | ✅ Yes | Email of the user creating the event |
| `name` | string | ✅ Yes | Event title (max 255 characters) |
| `description` | string | ❌ No | Detailed event description (optional) |
| `prio` | string | ✅ Yes | Priority level: `HIGH`, `MEDIUM`, or `LOW` |
| `eventDate` | string (ISO 8601) | ✅ Yes | Event date and time in ISO format |

**Response (Success - 201):**

```json
{
  "success": true,
  "event": {
    "_id": "507f1f77bcf86cd799439011",
    "userID": "user@example.com",
    "name": "Client Meeting",
    "description": "Quarterly review meeting",
    "prio": "HIGH",
    "createdAt": "2026-03-15T10:30:00Z",
    "updatedAt": "2026-03-15T10:30:00Z"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Failed to create event",
  "details": "Priority must be HIGH, MEDIUM, or LOW"
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/event \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "userID": "contact@marco-lenschau.de",
    "name": "Test Event",
    "description": "My first test event",
    "prio": "HIGH",
    "eventDate": "2026-03-20T14:30:00Z"
  }'
```

---

### Get All Events

**Endpoint:** `GET /api/event`

**Authentication:** Required (all authenticated users)

**Description:** Retrieve all events from the database. Returns array of event objects.

**Query Parameters:** None

**Response (Success - 200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userID": "user@example.com",
    "name": "Client Meeting",
    "description": "Quarterly review",
    "prio": "HIGH",
    "createdAt": "2026-03-15T10:30:00Z",
    "updatedAt": "2026-03-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "userID": "user@example.com",
    "name": "Team Standup",
    "description": "",
    "prio": "MEDIUM",
    "createdAt": "2026-03-15T11:00:00Z",
    "updatedAt": "2026-03-15T11:00:00Z"
  }
]
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Failed to fetch events",
  "details": "Database connection error"
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/event \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Delete Event

**Endpoint:** `DELETE /api/event/[id]`

**Authentication:** Required (all authenticated users)

**Description:** Delete a specific event by its ID. Removes event from database and logs the action.

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (MongoDB ObjectId) | ✅ Yes | The event ID to delete |

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "error": "Event not found"
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Invalid request",
  "details": "Invalid event ID format"
}
```

**Example Request:**

```bash
curl -X DELETE http://<IP-ADDRESS>:3000/api/event/507f1f77bcf86cd799439011 \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Customers

Customer management endpoints for CRUD operations on customer records.

### Create Customer

**Endpoint:** `POST /api/customer`

**Authentication:** Required (all authenticated users)

**Description:** Create a new customer record with contact information and assignment.

**Request Body:**

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

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ✅ Yes | Customer name (max 255 characters) |
| `email` | string | ✅ Yes | Customer email address |
| `phone` | string | ✅ Yes | Customer phone number |
| `company` | string | ✅ Yes | Company name |
| `status` | string | ✅ Yes | Status: `ACTIVE`, `INACTIVE`, or `PENDING` |
| `assignedUserId` | string | ✅ Yes | Email of assigned user |

**Response (Success - 201):**

```json
{
  "success": true,
  "customer": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": "+1-555-0123",
    "company": "Acme Corp",
    "status": "ACTIVE",
    "assignedUserId": "user@example.com",
    "createdAt": "2026-03-15T10:30:00Z",
    "updatedAt": "2026-03-15T10:30:00Z"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "error": "Failed to create customer",
  "details": "Email already exists"
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/customer \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": "+1-555-0123",
    "company": "Acme Corp",
    "status": "ACTIVE",
    "assignedUserId": "user@example.com"
  }'
```

---

### Get All Customers

**Endpoint:** `GET /api/customer`

**Authentication:** Required (all authenticated users)

**Description:** Retrieve all customers from the database.

**Response (Success - 200):**

```json
{
  "success": true,
  "customers": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Acme Corporation",
      "email": "contact@acme.com",
      "phone": "+1-555-0123",
      "company": "Acme Corp",
      "status": "ACTIVE",
      "assignedUserId": "user@example.com",
      "createdAt": "2026-03-15T10:30:00Z",
      "updatedAt": "2026-03-15T10:30:00Z"
    }
  ]
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/customer \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Get Customer by ID

**Endpoint:** `GET /api/customer/[id]`

**Authentication:** Required

**Description:** Retrieve a specific customer by their ID.

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (MongoDB ObjectId) | ✅ Yes | The customer ID |

**Response (Success - 200):**

```json
{
  "id": "507f1f77bcf86cd799439013",
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "phone": "+1-555-0123",
  "company": "Acme Corp",
  "status": "ACTIVE",
  "assignedUserId": "user@example.com",
  "createdAt": "2026-03-15T10:30:00Z",
  "updatedAt": "2026-03-15T10:30:00Z"
}
```

**Response (Error - 404):**

```json
{
  "success": false,
  "error": "Customer not found"
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/customer/507f1f77bcf86cd799439013 \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Users

User management endpoints (admin only). Manage system users and permissions.

### Register User

**Endpoint:** `POST /api/register`

**Authentication:** Not required

**Description:** Register a new user account. First registered user becomes admin.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ✅ Yes | User full name |
| `email` | string | ✅ Yes | User email (must be unique) |
| `password` | string | ✅ Yes | User password (min 8 characters recommended) |

**Response (Success - 201):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-15T10:30:00Z"
  }
}
```

**Response (Error - 409):**

```json
{
  "success": false,
  "error": "Email already exists"
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### Login User

**Endpoint:** `POST /api/auth`

**Authentication:** Not required

**Description:** Authenticate user and obtain JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | ✅ Yes | User email address |
| `password` | string | ✅ Yes | User password |

**Response (Success - 200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWI2MmFmZjlkNzEwY2I3ODU2ZGE2MGQiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NzM1Njg2NDYsImV4cCI6MTc3MzY1NTA0Nn0.Fq2X3XIyxjSJCOoXnn4OwDQeoq-m18wlR5JRGWrZHOM"
}
```

**Response (Error - 401):**

```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

### Verify Token

**Endpoint:** `GET /api/auth`

**Authentication:** Required (bearer token in Authorization header)

**Description:** Verify JWT token validity and get user information.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (Success - 200):**

```json
{
  "valid": true,
  "user": {
    "userId": "507f1f77bcf86cd799439014",
    "email": "user@example.com",
    "isAdmin": true
  }
}
```

**Response (Error - 401):**

```json
{
  "valid": false,
  "error": "Invalid or expired token"
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/auth \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Logout User

**Endpoint:** `POST /api/logout`

**Authentication:** Required

**Description:** Clear authentication token and logout user.

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/logout \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Create User (Admin Only)

**Endpoint:** `POST /api/user`

**Authentication:** Required (admin only)

**Description:** Create a new user account with admin privileges option.

**Request Body:**

```json
{
  "name": "New Admin",
  "email": "admin@example.com",
  "password": "securePassword123",
  "isAdmin": true
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ✅ Yes | User full name |
| `email` | string | ✅ Yes | User email (must be unique) |
| `password` | string | ✅ Yes | User password |
| `isAdmin` | boolean | ❌ No | Admin privileges (default: false) |

**Response (Success - 201):**

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439015",
    "name": "New Admin",
    "email": "admin@example.com",
    "isAdmin": true,
    "createdAt": "2026-03-15T10:30:00Z"
  }
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/user \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "New Admin",
    "email": "admin@example.com",
    "password": "securePassword123",
    "isAdmin": true
  }'
```

---

### Get All Users (Admin Only)

**Endpoint:** `GET /api/user`

**Authentication:** Required (admin only)

**Description:** Retrieve all users (password hashes excluded).

**Response (Success - 200):**

```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "John Doe",
      "email": "john@example.com",
      "isAdmin": true,
      "createdAt": "2026-03-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "isAdmin": false,
      "createdAt": "2026-03-15T11:00:00Z"
    }
  ]
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/user \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Get User by ID

**Endpoint:** `GET /api/user/[id]`

**Authentication:** Required

**Description:** Retrieve a specific user by their ID (password excluded).

**URL Parameters:**

| Parameter                        | Type   | Required    |
|----------------------------------|--------|-------------|
| `id` | string (MongoDB ObjectId) | ✅ Yes | The user ID |

**Response (Success - 200):**

```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": true,
  "createdAt": "2026-03-15T10:30:00Z"
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/user/507f1f77bcf86cd799439014 \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Update User (Admin Only)

**Endpoint:** `PUT /api/user/[id]`

**Authentication:** Required (admin only)

**Description:** Update user information.

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (MongoDB ObjectId) | ✅ Yes | The user ID |

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "isAdmin": true
}
```

**Response (Success - 200):**

```json
{
  "_id": "507f1f77bcf86cd799439014",
  "name": "Updated Name",
  "email": "newemail@example.com",
  "isAdmin": true
}
```

**Example Request:**

```bash
curl -X PUT http://<IP-ADDRESS>:3000/api/user/507f1f77bcf86cd799439014 \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "Updated Name",
    "isAdmin": true
  }'
```

---

### Delete User (Admin Only)

**Endpoint:** `DELETE /api/user/[id]`

**Authentication:** Required (admin only)

**Description:** Delete a user account.

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (MongoDB ObjectId) | ✅ Yes | The user ID |

**Response (Success - 200):**

```json
{
  "message": "User deleted successfully"
}
```

**Response (Error - 404):**

```json
{
  "error": "User not found"
}
```

**Example Request:**

```bash
curl -X DELETE http://<IP-ADDRESS>:3000/api/user/507f1f77bcf86cd799439014 \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Logs

Audit logging endpoints for tracking user actions.

### Create Log Entry (Admin Only)

**Endpoint:** `POST /api/log`

**Authentication:** Required (admin only)

**Description:** Create an audit log entry for user actions.

**Request Body:**

```json
{
  "userID": "user@example.com",
  "action": "CREATE",
  "entity": "Event",
  "status": "SUCCESS",
  "description": "Event created successfully"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userID` | string | ✅ Yes | User email who performed action |
| `action` | string | ✅ Yes | Action type: `CREATE`, `READ`, `UPDATE`, `DELETE` |
| `entity` | string | ✅ Yes | Entity type: `User`, `Customer`, `Event`, `Log` |
| `status` | string | ✅ Yes | Result: `SUCCESS` or `FAILURE` |
| `description` | string | ✅ Yes | Detailed description of action |

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "userID": "user@example.com",
    "action": "CREATE",
    "entity": "Event",
    "status": "SUCCESS",
    "description": "Event created successfully"
  }
}
```

**Example Request:**

```bash
curl -X POST http://<IP-ADDRESS>:3000/api/log \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "userID": "user@example.com",
    "action": "CREATE",
    "entity": "Event",
    "status": "SUCCESS",
    "description": "Event created successfully"
  }'
```

---

### Get All Logs

**Endpoint:** `GET /api/log`

**Authentication:** Required (all authenticated users)

**Description:** Retrieve all audit log entries.

**Response (Success - 200):**

```json
{
  "success": true,
  "logs": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "userID": "user@example.com",
      "action": "CREATE",
      "entity": "Event",
      "status": "SUCCESS",
      "description": "Event created successfully",
      "createdAt": "2026-03-15T10:30:00Z",
      "updatedAt": "2026-03-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439017",
      "userID": "admin@example.com",
      "action": "DELETE",
      "entity": "User",
      "status": "SUCCESS",
      "description": "User account deleted",
      "createdAt": "2026-03-15T11:00:00Z",
      "updatedAt": "2026-03-15T11:00:00Z"
    }
  ]
}
```

**Example Request:**

```bash
curl -X GET http://<IP-ADDRESS>:3000/api/log \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Error Handling

The API returns consistent error responses with descriptive messages.

### Error Response Format

```json
{
  "success": false,
  "error": "Human-readable error message",
  "details": "Optional detailed error information"
}
```

### Common Error Scenarios

**Invalid Request Body**
```json
{
  "error": "Invalid request",
  "details": "Required field 'name' is missing"
}
```

**Authentication Failed**
```json
{
  "error": "Invalid or expired token",
  "details": "Token signature verification failed"
}
```

**Resource Not Found**
```json
{
  "error": "Event not found",
  "details": "No event with ID 507f1f77bcf86cd799439011"
}
```

**Database Error**
```json
{
  "error": "Failed to create event",
  "details": "Database connection timeout"
}
```

---

## Status Codes

Standard HTTP status codes used by the API:

| Code | Meaning | Description |
|------|---------|-------------|
| `200` | OK | Request successful, returning data |
| `201` | Created | Resource successfully created |
| `400` | Bad Request | Invalid request data or parameters |
| `401` | Unauthorized | Missing or invalid authentication token |
| `403` | Forbidden | Authenticated but lacks permissions (not admin) |
| `404` | Not Found | Resource does not exist |
| `409` | Conflict | Resource already exists (duplicate email) |
| `500` | Internal Error | Server error during processing |

---

## API Usage Examples

### Complete Authentication Flow

```bash
# 1. Register new user
curl -X POST http://<IP-ADDRESS>:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# 2. Login to get token
curl -X POST http://<IP-ADDRESS>:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# 3. Use token for protected routes
curl -X GET http://<IP-ADDRESS>:3000/api/event \
  -H "Cookie: token=<received_token>"

# 4. Logout
curl -X POST http://<IP-ADDRESS>:3000/api/logout \
  -H "Cookie: token=<received_token>"
```

### Event Management Workflow

```bash
# Create an event
curl -X POST http://<IP-ADDRESS>:3000/api/event \
  -H "Content-Type: application/json" \
  -H "Cookie: token=<token>" \
  -d '{
    "userID": "john@example.com",
    "name": "Team Meeting",
    "prio": "HIGH",
    "eventDate": "2026-03-20T14:30:00Z"
  }'

# Get all events
curl -X GET http://<IP-ADDRESS>:3000/api/event \
  -H "Cookie: token=<token>"

# Delete an event
curl -X DELETE http://<IP-ADDRESS>:3000/api/event/507f1f77bcf86cd799439011 \
  -H "Cookie: token=<token>"
```

---

**API Version:** 1.0.0  
**Last Updated:** March 15, 2026  
**Status:** Production Ready
