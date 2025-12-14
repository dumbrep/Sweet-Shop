# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop with authentication and inventory management.

## 📋 Features

- 🔐 JWT Authentication
- 👥 Role-based Access (User/Admin)
- 🍭 CRUD Operations for Sweets
- 🔍 Search & Filter
- 🛒 Purchase System
- 📦 Inventory Management

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT  
**Frontend:** React, React Router, Axios

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sweet-shop.git
   cd sweet-shop
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Setup Frontend**
   ```bash
   cd ../sweet-shop-frontend
   npm install
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Run Backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```

6. **Run Frontend** (Terminal 2)
   ```bash
   cd sweet-shop-frontend
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected Routes)
- `POST /api/sweets` - Add a new sweet
- `GET /api/sweets` - View all available sweets
- `GET /api/sweets/search` - Search sweets by name, category, or price range
- `PUT /api/sweets/:id` - Update sweet details
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory (Protected Routes)
- `POST /api/sweets/:id/purchase` - Purchase sweet (decreases quantity)
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only, increases quantity)

## 🔐 Environment Variables

Backend requires these variables (see `.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/sweet-shop |
| JWT_SECRET | JWT secret key | Generate with crypto |
| JWT_EXPIRE | Token expiration | 7d |

## 📁 Project Structure

```
Sweet Shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── app.js
│   ├── .env.example
│   ├── .gitignore
│   └── server.js
└── sweet-shop-frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── services/
    │   └── utils/
    └── package.json
```

## 🤖 My AI Usage

### AI Tool Used
**Claude (Anthropic)** - AI assistant for code generation and development workflow

### Backend Development (3 key uses)

1. **RESTful API Structure Design**
   - Used Claude to design and implement the complete backend API architecture including authentication endpoints (`POST /api/auth/register`, `POST /api/auth/login`) and protected sweet management routes (`POST /api/sweets`, `GET /api/sweets`, `GET /api/sweets/search`, `PUT /api/sweets/:id`, `DELETE /api/sweets/:id`)
   - Claude generated the Express.js route handlers, middleware for JWT authentication, and role-based access control for admin-only operations

2. **Database Schema and Models**
   - Utilized Claude to create Mongoose schemas for User and Sweet models with proper validation, relationships, and indexing
   - Generated the inventory management logic for purchase (`POST /api/sweets/:id/purchase`) and restock (`POST /api/sweets/:id/restock`) operations with quantity tracking

3. **Error Handling and Validation**
   - Leveraged Claude to implement comprehensive error handling middleware, request validation using express-validator, and secure password hashing with bcryptjs
   - Generated test cases for API endpoints to ensure robustness

### Frontend Development (2 key uses)

1. **React Component Architecture**
   - Used Claude to scaffold the complete React application structure including authentication flow (Login/Register components), protected routes with context API, and component hierarchy for sweets management
   - Generated reusable components like SweetCard, SearchFilter, and modal components (AddSweetModal, EditSweetModal) with modern UI patterns

2. **State Management and API Integration**
   - Leveraged Claude to implement Axios interceptors for automatic JWT token attachment, authentication context provider for global state management, and API service layer with proper error handling
   - Generated responsive CSS with glassmorphism effects, gradient backgrounds, and smooth animations for professional UI/UX

### Reflection on AI Impact

**Positive Impact:**
- **Accelerated Development:** Claude significantly reduced development time by generating boilerplate code, complete file structures, and implementing best practices instantly
- **Learning Enhancement:** Received well-documented code with inline comments explaining complex concepts like JWT authentication, middleware patterns, and React hooks
- **Code Quality:** Claude provided production-ready code following industry standards with proper error handling, security measures, and scalable architecture
- **Problem Solving:** Quickly resolved technical challenges like CORS configuration, MongoDB connection issues, and frontend-backend integration

**Workflow Transformation:**
- Shifted focus from syntax and boilerplate to business logic and feature requirements
- Enabled rapid prototyping and iterative development with instant code modifications
- Reduced debugging time through AI-suggested solutions and best practices
- Improved code consistency across the entire application

**Key Takeaway:** AI tools like Claude serve as an excellent pair programmer, enhancing productivity while maintaining code quality and enabling developers to focus on creative problem-solving rather than repetitive tasks.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License

## 👤 Author

Your Name - Prajwal Dumbre [prajwaldumbre@gmail.com]

## 🙏 Acknowledgments

- Built with React and Node.js
- MongoDB for database
- Express.js framework
- JWT authentication
- AI assistance from Claude (Anthropic)