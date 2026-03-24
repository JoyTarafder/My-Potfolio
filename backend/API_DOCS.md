# Portfolio API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Login
```
POST /auth/login
Body: { "email": "admin@joytarafder.dev", "password": "admin123" }
Response: { "success": true, "token": "jwt...", "user": {...} }
```

### Logout
```
POST /auth/logout
```

### Get Current User (Protected)
```
GET /auth/me
Headers: Authorization: Bearer <token>
```

---

## Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | No | Get profile |
| PUT | `/profile/update` | Yes | Update profile |

---

## Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/projects` | No | List all (public: published only) |
| GET | `/projects/:id` | No | Get single |
| POST | `/projects` | Yes | Create |
| PUT | `/projects/:id` | Yes | Update |
| DELETE | `/projects/:id` | Yes | Delete |

Query: `?featured=true` to filter featured projects.

---

## Experience

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/experience` | No | List all |
| POST | `/experience` | Yes | Create |
| PUT | `/experience/:id` | Yes | Update |
| DELETE | `/experience/:id` | Yes | Delete |

---

## Skills

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/skills` | No | List all |
| POST | `/skills` | Yes | Create |
| DELETE | `/skills/:id` | Yes | Delete |

Query: `?category=frontend` to filter by category.

---

## Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | No | Send message (+ email notif) |
| GET | `/contact` | Yes | Get all messages |
| PUT | `/contact/:id/read` | Yes | Mark as read |
| DELETE | `/contact/:id` | Yes | Delete message |

---

## Upload

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/upload/image` | Yes | Upload image to Cloudinary |

Body: `multipart/form-data` with field `image`.

---

## Health Check
```
GET /health
Response: { "success": true, "message": "API is running" }
```
