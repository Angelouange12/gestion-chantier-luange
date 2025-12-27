# 🏗️ Gestion Chantier - Construction Site Management System

A modern, full-stack web application for managing construction sites, workers, and project planning.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👥 User Management
- Multi-role system (Admin, Manager, Worker)
- User authentication with JWT
- Profile management
- User activity logging

### 🏗️ Construction Site Management
- Create and manage construction sites
- Track site status and progress
- Assign workers to sites
- Timeline planning and visualization

### 📅 Planning & Scheduling
- Interactive calendar view
- Worker assignment to sites
- Visual timeline representation
- Date range planning

### 📊 Dashboard & Analytics
- Real-time statistics
- Activity monitoring
- Quick overview of all sites
- User activity logs

### 🎨 Modern UI
- Responsive design
- Interactive components
- Smooth animations
- Teal and orange color scheme
- Mobile-friendly interface

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Node.js + Express
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **File Generation**: PDFKit

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Chart.js + React-Chartjs-2
- **Icons**: React Icons
- **Notifications**: React-Toastify
- **Date Handling**: date-fns

---

## 📁 Project Structure

```
gestion-chantier-luange/
├── Gestion-Chantier-Backend/     # Backend API
│   ├── src/
│   │   ├── config/               # Configuration files
│   │   ├── controllers/          # Route controllers
│   │   ├── middlewares/          # Express middlewares
│   │   ├── models/               # Sequelize models
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic
│   │   └── utils/                # Utility functions
│   ├── migrations/               # Database migrations
│   ├── seeders/                  # Database seeders
│   ├── tests/                    # API tests
│   ├── server.js                 # Entry point
│   └── package.json              # Backend dependencies
│
├── frontend/                     # Frontend React App
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── common/           # Shared components
│   │   │   └── layout/           # Layout components
│   │   ├── contexts/             # React contexts
│   │   ├── pages/                # Page components
│   │   ├── services/             # API services
│   │   ├── styles/               # CSS styles
│   │   └── utils/                # Utility functions
│   ├── public/                   # Static assets
│   └── package.json              # Frontend dependencies
│
├── RAILWAY_DEPLOYMENT_GUIDE.md   # Complete deployment guide
├── RAILWAY_QUICK_REFERENCE.md    # Quick reference guide
└── setup-railway.sh              # Setup script
```

---

## 📦 Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/gestion-chantier.git
cd gestion-chantier-luange
```

### 2. Install Backend Dependencies

```bash
cd Gestion-Chantier-Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

1. Create environment file:
```bash
cd Gestion-Chantier-Backend
cp .env.example .env
```

2. Update `.env` with your settings:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gestion_chantiers

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
```

3. Create database:
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE gestion_chantiers;
exit;
```

4. Run migrations:
```bash
npm run db:migrate
```

5. Seed initial data (optional):
```bash
npm run db:seed
```

### Frontend Configuration

1. Create environment file:
```bash
cd frontend
cp .env.example .env
```

2. Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gestion Chantier
VITE_APP_VERSION=1.0.0
```

---

## 🏃 Running Locally

### Start Backend Server

```bash
cd Gestion-Chantier-Backend
npm run dev
```

Backend will run on: http://localhost:5000

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

### Default Login Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@gestion-chantier.com`
- Password: `Admin123!`

**Manager Account:**
- Email: `manager@gestion-chantier.com`
- Password: `Manager123!`

**Worker Account:**
- Email: `worker@gestion-chantier.com`
- Password: `Worker123!`

---

## 🚢 Deployment

### Deploy to Railway

This project is ready for Railway deployment. Follow these steps:

1. **Read the deployment guides**:
   - Complete guide: [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md)
   - Quick reference: [RAILWAY_QUICK_REFERENCE.md](./RAILWAY_QUICK_REFERENCE.md)

2. **Run setup script**:
```bash
./setup-railway.sh
```

3. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

4. **Deploy on Railway**:
   - Create new project
   - Add MySQL database
   - Deploy backend service
   - Deploy frontend service
   - Configure environment variables

For detailed instructions, see [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md)

---

## 📖 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend.railway.app/api
```

### Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Main Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Chantiers (Sites)
- `GET /api/chantiers` - List all sites
- `POST /api/chantiers` - Create site
- `GET /api/chantiers/:id` - Get site details
- `PUT /api/chantiers/:id` - Update site
- `DELETE /api/chantiers/:id` - Delete site

#### Affectations (Assignments)
- `GET /api/affectations` - List assignments
- `POST /api/affectations` - Create assignment
- `PUT /api/affectations/:id` - Update assignment
- `DELETE /api/affectations/:id` - Delete assignment

#### Logs
- `GET /api/logs` - Get activity logs

---

## 🧪 Testing

### Backend Tests

```bash
cd Gestion-Chantier-Backend
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express team for the backend framework
- Railway for hosting platform
- All contributors who helped with the project

---

## 📞 Support

For support, email support@gestion-chantier.com or open an issue in the repository.

---

## 🗺️ Roadmap

- [ ] Mobile application (React Native)
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF/Excel)
- [ ] Multi-language support
- [ ] File upload for site documents
- [ ] GPS tracking for workers
- [ ] Time tracking system

---

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and updated.

Last Updated: December 2025
