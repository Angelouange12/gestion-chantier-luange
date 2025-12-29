# 🚂 Guide de Déploiement Railway - PRÊT

## ✅ Projet Réorganisé avec Succès !

Votre projet **gestion-chantier-luange** est maintenant organisé comme **dairy-management-system** et prêt pour Railway.

## 📊 Structure Actuelle

```
gestion-chantier-luange/
├── backend/              # 🔧 Service Backend API (Port 5000)
│   ├── src/             # Code backend
│   ├── routes/          # Routes Express
│   ├── server.js        # Point d'entrée
│   ├── package.json     # Dépendances backend
│   └── railway.json     # Config Railway backend
│
├── src/                 # ⚛️ Service Frontend React (Port 3000)
│   ├── components/      # Composants React
│   ├── pages/           # Pages
│   ├── contexts/        # Contexts
│   ├── styles/          # CSS
│   └── utils/           # Utilitaires
│
├── index.html           # HTML principal
├── vite.config.js       # Config Vite
├── package.json         # Dépendances frontend
└── railway.json         # Config Railway frontend
```

## 🚀 Déploiement sur Railway - Étapes

### Étape 1 : Préparer le Repository

```bash
cd /home/rumariza/Documents/GitHub/gestion-chantier-luange

# Vérifier le status
git status

# Ajouter tous les changements
git add .

# Commit
git commit -m "Restructure project for Railway deployment - separate backend and frontend"

# Push vers GitHub
git push origin main
```

### Étape 2 : Déployer le Backend sur Railway

1. **Aller sur [Railway.app](https://railway.app)**
2. **Créer un nouveau projet**
3. **Connecter votre repository GitHub** : `gestion-chantier-luange`

4. **Créer le service Backend** :
   - Cliquez sur "New Service"
   - Sélectionnez "GitHub Repo"
   - Choisissez `gestion-chantier-luange`
   - **Important** : Dans les Settings du service :
     - **Root Directory** : `backend`
     - **Build Command** : `npm install && npm run build`
     - **Start Command** : `npm start`

5. **Ajouter une base de données MySQL** :
   - Cliquez sur "+ New"
   - Sélectionnez "Database"
   - Choisissez "MySQL"

6. **Configurer les variables d'environnement** :
   Allez dans l'onglet "Variables" du service backend et ajoutez :
   
   ```
   NODE_ENV=production
   PORT=5000
   
   # Ces variables seront auto-remplies par Railway MySQL
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=railway
   
   # Générez une clé secrète aléatoire pour JWT
   JWT_SECRET=votre-cle-secrete-tres-longue-et-aleatoire-ici
   JWT_EXPIRE=7d
   
   # Optionnel : pour les uploads
   MAX_FILE_SIZE=5242880
   ```

7. **Déployer** et **noter l'URL** du backend (ex: `https://backend-xxx.up.railway.app`)

### Étape 3 : Déployer le Frontend sur Railway

1. **Dans le même projet Railway**, cliquez sur "+ New"
2. **Sélectionnez "GitHub Repo"** et rechoisissez `gestion-chantier-luange`

3. **Configurer le service Frontend** :
   - Dans les Settings du service :
     - **Root Directory** : `/` (laisser vide ou mettre `/`)
     - **Build Command** : `npm install && npm run build`
     - **Start Command** : `npm run preview`

4. **Configurer la variable d'environnement** :
   Allez dans "Variables" et ajoutez :
   
   ```
   VITE_API_URL=https://votre-backend-xxx.up.railway.app
   ```
   
   **Remplacez** `votre-backend-xxx.up.railway.app` par l'URL du backend de l'étape 2 !

5. **Déployer** le frontend

### Étape 4 : Configurer le CORS dans le Backend

1. **Noter l'URL du frontend** (ex: `https://frontend-xxx.up.railway.app`)

2. **Modifier `backend/src/app.js`** localement :

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://frontend-xxx.up.railway.app'  // ⬅️ Ajoutez l'URL de votre frontend
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

3. **Commit et push** pour redéployer le backend :

```bash
git add backend/src/app.js
git commit -m "Add frontend URL to CORS configuration"
git push origin main
```

Railway redéploiera automatiquement le backend.

### Étape 5 : Tester l'Application

1. **Ouvrez l'URL du frontend** : `https://frontend-xxx.up.railway.app`
2. **Testez la connexion** avec les credentials par défaut (voir backend/README.md)
3. **Vérifiez** que toutes les pages fonctionnent

## 🔍 Dépannage

### Le backend ne démarre pas ?
- Vérifiez les logs Railway
- Assurez-vous que toutes les variables d'environnement sont configurées
- Vérifiez que la base de données MySQL est connectée

### Le frontend ne peut pas communiquer avec le backend ?
- Vérifiez que `VITE_API_URL` pointe vers la bonne URL du backend
- Vérifiez le CORS dans `backend/src/app.js`
- Ouvrez la console du navigateur pour voir les erreurs

### Erreur 404 sur le frontend ?
- Vérifiez que le Root Directory est `/` (racine)
- Vérifiez que `npm run build` fonctionne localement

## 📝 Commandes Utiles Railway CLI

```bash
# Installer Railway CLI
npm install -g @railway/cli

# Login
railway login

# Voir les logs
railway logs

# Ouvrir le dashboard
railway open
```

## 🎉 Félicitations !

Votre application est maintenant déployée sur Railway avec :
- ✅ Backend API séparé
- ✅ Frontend React séparé
- ✅ Base de données MySQL
- ✅ Variables d'environnement configurées
- ✅ Structure organisée et maintenable

---

**Structure inspirée de dairy-management-system** ✅
**Prêt pour Railway** ✅
