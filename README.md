# InnerPath - Create Your Own Path to Inner Peace

A full-stack web application where users can create, share, and discover wellness sessions including meditation, yoga, and mindfulness practices.

## 🌟 Project Overview

InnerPath is a community-driven wellness platform that allows users to:
- **Register and Login** securely with JWT authentication
- **Browse Public Sessions** shared by the community
- **Create and Edit** their own wellness sessions
- **Auto-save Drafts** with intelligent 5-second debouncing
- **Publish Sessions** to share with the community

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern functional components
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** + **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **JWT** (jsonwebtoken) - Authentication
- **bcryptjs** - Password hashing
- **Mongoose** - MongoDB ODM

## 📁 Project Structure

```
InnerPath/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context providers
│   │   ├── pages/            # Main page components
│   │   ├── utils/            # API client and helpers
│   │   └── App.jsx           # Main app with routing
│   ├── package.json
│   └── README.md
├── backend/                  # Express API server
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Authentication middleware
│   ├── .env.example          # Environment template
│   ├── package.json
│   └── README.md
└── README.md                 # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd InnerPath
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/innerpath?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Sessions
- `GET /api/sessions` - Get all public sessions
- `GET /api/my-sessions` - Get user's sessions (protected)
- `GET /api/my-sessions/:id` - Get specific session (protected)
- `POST /api/my-sessions/save-draft` - Save draft session (protected)
- `POST /api/my-sessions/publish` - Publish session (protected)

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password_hash: String,
  created_at: Date
}
```

### Session Model
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

## ✨ Key Features

### 🔐 Secure Authentication
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes and middleware
- Automatic token refresh handling

### 💾 Auto-save Functionality
- Debounced auto-save every 5 seconds
- Visual feedback for save status
- Prevents data loss during editing
- Smart save logic (only when required fields are present)

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Loading states and error handling
- Toast notifications for user feedback
- Clean, accessible interface

### 📱 Responsive Design
- Mobile-first approach
- Consistent design system
- Intuitive navigation
- Cross-browser compatibility

## 🎯 User Flow

1. **Registration/Login**: New users register, existing users login
2. **Dashboard**: Browse public wellness sessions from the community
3. **Create Session**: Use the session editor to create new content
4. **Auto-save**: Drafts are automatically saved during editing
5. **Publish**: Share completed sessions with the community
6. **Manage**: Edit and republish existing sessions

## 🔨 Development Scripts

### Backend
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to Heroku, Railway, or similar platform

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Update API base URL for production

## 📈 Potential Enhancements

### Immediate Improvements
- [ ] Image upload for session thumbnails
- [ ] Session categories and filtering
- [ ] User profiles and avatars
- [ ] Session rating and reviews

### Advanced Features
- [ ] Real-time collaboration on sessions
- [ ] Video/audio content integration
- [ ] Social features (following, sharing)
- [ ] Analytics dashboard for session creators

### Technical Improvements
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the individual README files for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first approach
- MongoDB Atlas for database hosting
- Vite for fast development experience

---

**InnerPath** - Empowering individuals to create and share their journey to inner peace through technology. 🧘‍♀️✨
