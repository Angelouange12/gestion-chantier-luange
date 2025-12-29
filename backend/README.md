# 🏗️ Gestion Chantier Luange

Application complète de gestion de chantiers de construction avec backend Node.js et frontend React.

[![Railway Deploy](https://railway.app/button.svg)](https://railway.app/new)

---

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Déploiement Railway](#-déploiement-railway)
- [Installation Locale](#-installation-locale)
- [Configuration](#-configuration)
- [Documentation](#-documentation)

---

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- Connexion sécurisée avec JWT
- Gestion des rôles (Admin, Manager, Worker)
- Protection des routes
- Rate limiting

### 👥 Gestion des Utilisateurs
- CRUD complet des utilisateurs
- Gestion des profils
- Attribution de rôles

### 🏗️ Gestion des Chantiers
- Création et suivi des chantiers
- Statut des chantiers (Planifié, En cours, Terminé, En pause)
- Localisation et description détaillée

### 📅 Gestion des Affectations
- Attribution des workers aux chantiers
- Suivi des dates d'affectation
- Gestion des statuts

### 📊 Tableau de Bord
- Vue d'ensemble des statistiques
- Graphiques et métriques
- Activité récente

### 📝 Logs & Audit
- Traçabilité des actions
- Historique des modifications

---

## 🛠️ Technologies

### Backend
- **Node.js** + **Express.js** - API REST
- **MySQL** - Base de données
- **Sequelize** - ORM
- **JWT** - Authentification
- **Bcrypt** - Hashage des mots de passe
- **Winston** - Logging
- **Helmet** - Sécurité
- **Express Rate Limit** - Protection DDoS

### Frontend
- **React 18** - Interface utilisateur
- **React Router** - Navigation
- **Axios** - Requêtes HTTP
- **Chart.js** - Graphiques
- **React Icons** - Icônes
- **React Toastify** - Notifications
- **Vite** - Build tool

---

## 🏗️ Architecture

```
gestion-chantier-luange/
├── backend (root)
│   ├── server.js              # Point d'entrée
│   ├── package.json
│   ├── railway.json
│   ├── nixpacks.json
│   └── src/
│       ├── app.js            # Configuration Express
│       ├── config/
│       │   └── database.js   # Configuration Sequelize
│       ├── models/           # Modèles Sequelize
│       ├── controllers/      # Logique métier
│       ├── routes/           # Routes API
│       ├── middlewares/      # Auth, validation, logging
│       ├── services/         # Services (PDF, Auth)
│       ├── migrations/       # Migrations DB
│       └── seeders/          # Données initiales
│
└── frontend/
    ├── package.json
    ├── railway.json
    ├── vite.config.js
    └── src/
        ├── main.jsx          # Point d'entrée
        ├── App.jsx
        ├── components/       # Composants réutilisables
        ├── pages/            # Pages de l'application
        ├── contexts/         # Context API (Auth)
        ├── services/         # Services API
        └── styles/           # Styles CSS
```

---

## 🚀 Déploiement Railway

### 📖 Guide Complet
Consultez **[RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md)** pour le guide détaillé.

### ⚡ Quick Start
Consultez **[RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md)** pour déployer en 10 minutes.

### 🎯 Résumé Rapide

1. **Créer un projet Railway** et connecter votre repo GitHub
2. **Ajouter MySQL** database
3. **Configurer Backend**:
   ```bash
   JWT_SECRET=<votre-secret-32-chars>
   NODE_ENV=production
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   ```
4. **Déployer Backend** et obtenir l'URL
5. **Créer service Frontend** (Root: `/frontend`)
6. **Configurer Frontend**:
   ```bash
   VITE_API_URL=https://votre-backend.railway.app/api
   ```
7. **Mettre à jour CORS** dans backend avec l'URL frontend

---

## 💻 Installation Locale

### Prérequis
- Node.js 16+ 
- MySQL 5.7+
- npm ou yarn

### 1. Cloner le Repository

```bash
git clone https://github.com/yourusername/gestion-chantier-luange.git
cd gestion-chantier-luange
```

### 2. Backend Setup

```bash
# Installer les dépendances
npm install

# Copier et configurer .env
cp .env.example .env
# Éditer .env avec vos credentials MySQL

# Créer la base de données
mysql -u root -p
CREATE DATABASE gestion_chantiers;
exit;

# Exécuter les migrations
npm run db:migrate

# (Optionnel) Seed avec données de test
npm run db:seed

# Démarrer le serveur
npm run dev
```

Backend disponible sur: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Installer les dépendances
npm install

# Copier et configurer .env
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api

# Démarrer le serveur de dev
npm run dev
```

Frontend disponible sur: http://localhost:3000

---

## ⚙️ Configuration

### Backend (.env)

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=gestion_chantiers

# JWT
JWT_SECRET=your-super-secret-key-minimum-32-characters
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gestion Chantier
VITE_APP_VERSION=1.0.0
```

---

## 📚 Documentation

- **[RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md)** - Guide complet de déploiement Railway
- **[RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md)** - Guide rapide 10 minutes
- **[API_TEST_REPORT.md](./API_TEST_REPORT.md)** - Documentation de l'API
- **[DEPLOYMENT_README.md](./DEPLOYMENT_README.md)** - Notes de déploiement

---

## 🔐 Utilisateurs par Défaut

Après le seeding, utilisez ces identifiants:

**Admin**
- Email: `admin@test.com`
- Password: `Admin123!`

**Manager**
- Email: `manager@test.com`
- Password: `Manager123!`

**Worker**
- Email: `worker@test.com`
- Password: `Worker123!`

---

## 🧪 Tests

### Backend

```bash
# Exécuter tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Coverage
npm test -- --coverage
```

### Frontend

```bash
cd frontend
npm run lint
```

---

## 📦 Scripts Disponibles

### Backend

```bash
npm start           # Démarrer en production
npm run dev         # Démarrer en développement avec nodemon
npm run db:migrate  # Exécuter les migrations
npm run db:seed     # Seed la base de données
npm test            # Exécuter les tests
```

### Frontend

```bash
npm run dev         # Serveur de développement
npm run build       # Build de production
npm run preview     # Prévisualiser le build
npm run lint        # Linter le code
```

---

## 🚧 Roadmap

- [ ] Export PDF amélioré
- [ ] Notifications en temps réel
- [ ] Application mobile
- [ ] Gestion des documents
- [ ] Intégration calendrier
- [ ] Rapports avancés

---

## 🤝 Contribution

Les contributions sont les bienvenues! Veuillez:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT.

---

## 📞 Support

Pour toute question ou problème:
- Créer une issue sur GitHub
- Consulter la documentation dans `/docs`
- Voir les guides de déploiement

---

## 🙏 Remerciements

- Railway pour l'hébergement
- Toutes les bibliothèques open-source utilisées
- La communauté React et Node.js

---

**Développé avec ❤️ pour la gestion efficace des chantiers**
