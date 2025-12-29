# 🏗️ Gestion des Chantiers - Structure du Projet

## 📁 Structure Organisée pour Railway

Ce projet est organisé en **deux services séparés** pour un déploiement optimal sur Railway :

```
gestion-chantier-luange/
├── backend/                    # 🔧 Service Backend (API)
│   ├── src/
│   │   ├── config/            # Configuration (database, etc.)
│   │   ├── controllers/       # Contrôleurs API
│   │   ├── middlewares/       # Auth, validation, logger
│   │   ├── models/            # Modèles Sequelize
│   │   ├── services/          # Logique métier
│   │   ├── migrations/        # Migrations DB
│   │   └── seeders/           # Données initiales
│   ├── routes/                # Routes Express
│   ├── server.js              # Point d'entrée backend
│   ├── package.json           # Dépendances backend
│   └── .env                   # Variables d'environnement backend
│
├── src/                       # ⚛️ Frontend React (à la racine)
│   ├── components/            # Composants réutilisables
│   ├── pages/                 # Pages de l'application
│   ├── contexts/              # Contexts React (Auth, etc.)
│   ├── styles/                # Fichiers CSS
│   ├── utils/                 # Utilitaires
│   ├── App.jsx                # Composant principal
│   └── main.jsx               # Point d'entrée React
│
├── index.html                 # HTML principal
├── vite.config.js             # Configuration Vite
├── package.json               # Dépendances frontend
└── .env                       # Variables d'environnement frontend

```

## 🚀 Déploiement sur Railway

### Option 1 : Deux Services Séparés (Recommandé)

**Service 1 : Backend API**
- Root Directory: `backend/`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Variables d'environnement :
  ```
  NODE_ENV=production
  PORT=5000
  DB_HOST=${{MySQL.MYSQLHOST}}
  DB_PORT=${{MySQL.MYSQLPORT}}
  DB_USER=${{MySQL.MYSQLUSER}}
  DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
  DB_NAME=railway
  JWT_SECRET=your-secret-key
  ```

**Service 2 : Frontend React**
- Root Directory: `/` (racine)
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview`
- Variables d'environnement :
  ```
  VITE_API_URL=https://votre-backend.railway.app
  ```

### Option 2 : Configuration avec railway.json

Créez deux fichiers à la racine :

**backend/railway.json** :
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**railway.json** (racine, pour le frontend) :
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview"
  }
}
```

## 💻 Développement Local

### Backend
```bash
cd backend
npm install
cp .env.example .env        # Configurer les variables
npm run dev                 # Port 5000
```

### Frontend
```bash
npm install
cp .env.frontend.example .env    # Configurer VITE_API_URL
npm run dev                      # Port 3000
```

## 📦 Dépendances

### Backend
- Express.js - Framework web
- Sequelize - ORM
- MySQL2 - Driver MySQL
- JWT - Authentication
- Bcryptjs - Hash passwords
- Winston - Logging

### Frontend
- React 18 - UI Library
- Vite - Build tool
- React Router - Routing
- React Toastify - Notifications
- Axios - HTTP client

## 🔗 URLs de Production

- **Frontend** : https://gestion-chantier-frontend.railway.app
- **Backend API** : https://gestion-chantier-backend.railway.app
- **Documentation API** : https://gestion-chantier-backend.railway.app/api-docs

## 📝 Notes

- Les deux services communiquent via l'URL de l'API configurée dans `VITE_API_URL`
- Le backend doit être déployé en premier pour obtenir son URL
- Configurez le CORS dans le backend pour autoriser l'URL du frontend
- Utilisez une base de données MySQL Railway pour la production

