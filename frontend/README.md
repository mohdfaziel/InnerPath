# InnerPath Frontend

Frontend application for InnerPath - a wellness sessions platform where users can create, share, and discover meditation, yoga, and wellness content.

## 🌟 Live Demo

- **Production App**: [https://inner-path.vercel.app/](https://inner-path.vercel.app/)
- **Backend API**: [https://inner-path-backend.vercel.app/](https://inner-path-backend.vercel.app/)

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Public Dashboard**: Browse wellness sessions shared by the community
- **Session Management**: Create, edit, auto-save, and publish your own sessions
- **Auto-save**: Drafts are automatically saved every 5 seconds during editing
- **Responsive Design**: Beautiful, mobile-friendly interface with Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions
- **Protected Routes**: Authentication-gated pages for user content

## Tech Stack

- **React 18** - Modern functional components with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - Global state management for authentication

## Pages

1. **Home** (`/`) - Landing page with app introduction
2. **Login** (`/login`) - User authentication
3. **Register** (`/register`) - New user registration
4. **Dashboard** (`/dashboard`) - Browse public wellness sessions
5. **My Sessions** (`/my-sessions`) - Manage your draft and published sessions
6. **Session Editor** (`/session-editor`) - Create and edit wellness sessions

## Key Features

### Authentication System
- JWT token-based authentication
- Automatic token refresh and error handling
- Protected routes that redirect to login when needed
- Auto-redirect for authenticated users accessing login/register

### Session Management
- Create wellness sessions with title, tags, and JSON URL
- Auto-save drafts every 5 seconds during editing
- Publish sessions to make them public
- Edit existing sessions
- Visual status indicators (draft/published)

### Auto-save Functionality
- Debounced auto-save after 5 seconds of inactivity
- Visual feedback showing save status
- Prevents data loss during editing

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Clean, modern interface
- Consistent color scheme and typography
- Loading states and error handling

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173` (or next available port).

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── LoadingSpinner.jsx
│   │   ├── Toast.jsx       # Notification component
│   │   ├── SessionCard.jsx # Session display card
│   │   └── ProtectedRoute.jsx
│   ├── context/            # React Context providers
│   │   └── AuthContext.jsx # Authentication state management
│   ├── pages/              # Main page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Authentication
│   │   ├── Register.jsx    # User registration
│   │   ├── Dashboard.jsx   # Public sessions
│   │   ├── MySessions.jsx  # User's sessions
│   │   └── SessionEditor.jsx # Create/edit sessions
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API client and endpoints
│   │   └── helpers.js      # Common helper functions
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # React app entry point
│   └── index.css           # Tailwind CSS imports
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

## API Integration

The frontend communicates with the backend API through:

- **Authentication**: Login/register with JWT token storage
- **Session CRUD**: Create, read, update, and publish sessions
- **Auto-save**: Debounced draft saving during editing
- **Error Handling**: Automatic token refresh and error responses

### API Client Configuration

```javascript
// Automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('innerpath_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic auth error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on auth failure
      localStorage.removeItem('innerpath_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## User Experience Features

### Auto-save System
- **Trigger**: 5 seconds after user stops typing
- **Visual Feedback**: Status indicator showing "Saving...", "Saved", or "Save failed"
- **Smart Logic**: Only saves when required fields are present
- **Session Management**: Creates new session ID for new drafts

### Toast Notifications
- **Success Messages**: Login, registration, save, publish actions
- **Error Messages**: API failures, validation errors
- **Auto-dismiss**: 3-second timeout with manual close option
- **Visual Types**: Success (green), Error (red), Info (blue)

### Loading States
- **Page Loading**: Full-page spinner during data fetching
- **Button Loading**: Inline spinners during form submissions
- **Skeleton States**: Placeholder content while loading

## Styling with Tailwind CSS

The app uses Tailwind CSS 4 with Vite integration:

### Color Scheme
- **Primary**: Indigo (indigo-600, indigo-700)
- **Success**: Green (green-600, green-700)
- **Warning**: Yellow (yellow-600, yellow-700)
- **Error**: Red (red-600, red-700)
- **Neutral**: Gray scale (gray-50 to gray-900)

### Key Design Patterns
- **Cards**: White background with shadow and rounded corners
- **Buttons**: Consistent padding, rounded corners, transition effects
- **Forms**: Clean inputs with focus states
- **Layout**: Max-width containers with responsive padding

## Development Guidelines

### Component Structure
- Use functional components with hooks
- Implement proper error boundaries
- Add loading states for async operations
- Include accessibility attributes

### State Management
- **Local State**: `useState` for component-specific state
- **Global State**: Context API for authentication
- **Server State**: Direct API calls with proper error handling

### Error Handling
- **API Errors**: Display user-friendly error messages
- **Network Errors**: Graceful degradation with retry options
- **Validation Errors**: Real-time form validation feedback

## 🚀 Deployment

### Production Deployment (Vercel)

The frontend is deployed on Vercel at: [https://inner-path.vercel.app/](https://inner-path.vercel.app/)

#### Deployment Features
- **Automatic Deployments**: Connected to GitHub for continuous deployment
- **Production Optimizations**: Build optimized for performance
- **CDN Distribution**: Global edge network for fast loading
- **HTTPS**: Secure connections with automatic SSL certificates

#### Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite (automatically detected)
- **Node.js Version**: 18.x

#### Environment Configuration
The app is configured to use the production backend:
```javascript
const API_BASE_URL = 'https://inner-path-backend.vercel.app/api';
```

### Local Development

#### Build for Production
```bash
npm run build
```

#### Deploy Options
- **Vercel**: Zero-config deployment for Vite apps (recommended)
- **Netlify**: Static site hosting with form handling
- **GitHub Pages**: Free hosting for static sites
- **Custom Server**: Deploy `dist/` folder to any web server

#### Environment Variables
Create a `.env` file for local development:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add appropriate comments and documentation
5. Test your changes thoroughly
6. Submit a pull request

## License

This project is licensed under the ISC License.
