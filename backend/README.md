# InnerPath Backend API

Backend API for InnerPath - a wellness sessions platform where users can create, share, and discover meditation, yoga, and wellness content.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Session Management**: Create, edit, and publish wellness sessions
- **Auto-save**: Draft sessions are auto-saved during editing
- **Public Discovery**: Browse published sessions from the community
- **Protected Routes**: JWT middleware protects user-specific endpoints

## Tech Stack

- **Node.js** + **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcryptjs** - Password hashing
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return JWT

### Sessions
- `GET /api/sessions` - Get all public sessions (no auth required)
- `GET /api/my-sessions` - Get logged-in user's sessions (auth required)
- `GET /api/my-sessions/:id` - Get specific session (auth required)
- `POST /api/my-sessions/save-draft` - Create or update draft session (auth required)
- `POST /api/my-sessions/publish` - Publish a session (auth required)

### Health Check
- `GET /api/health` - API health status

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password_hash: String,
  created_at: Date
}
```

### Session
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  title: String,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  created_at: Date,
  updated_at: Date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/innerpath?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

### Running the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` (or your specified PORT).

## API Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Get public sessions
```bash
curl http://localhost:5000/api/sessions
```

### Create a draft session (requires authentication)
```bash
curl -X POST http://localhost:5000/api/my-sessions/save-draft \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Morning Meditation",
    "tags": ["meditation", "morning", "mindfulness"],
    "json_file_url": "https://example.com/meditation.json"
  }'
```

### Publish a session (requires authentication)
```bash
curl -X POST http://localhost:5000/api/my-sessions/publish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "sessionId": "SESSION_ID"
  }'
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "message": "Error description",
  "errors": [...] // For validation errors
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (token expired)
- `404` - Not Found
- `409` - Conflict (user already exists)
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: express-validator for request validation
- **CORS**: Configurable cross-origin requests
- **Environment Variables**: Sensitive data stored in .env

## Development

### Project Structure
```
backend/
├── models/
│   ├── User.js          # User schema
│   └── Session.js       # Session schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── sessions.js      # Session management routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── server.js           # Main application entry point
```

### Adding New Features

1. **Add new routes** in the appropriate file under `routes/`
2. **Add middleware** in `middleware/` if needed
3. **Update models** in `models/` for new data structures
4. **Update this README** with new endpoints and examples

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.
