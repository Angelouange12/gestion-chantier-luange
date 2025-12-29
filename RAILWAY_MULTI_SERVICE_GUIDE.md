# 🚂 Guide : Déployer 2 Services sur Railway

## ⚠️ IMPORTANT : Railway NE crée PAS automatiquement 2 services !

Vous devez **configurer manuellement** les 2 services dans Railway Dashboard.

---

## 📋 Processus de Déploiement

### Étape 1️⃣ : Créer le Projet Railway

1. Allez sur https://railway.app
2. Cliquez sur **"New Project"**
3. Sélectionnez **"Deploy from GitHub repo"**
4. Choisissez votre repo : `gestion-chantier-luange`

**⚠️ À ce stade, Railway crée UN SEUL service par défaut**

---

### Étape 2️⃣ : Configurer le Premier Service (Backend)

1. Cliquez sur le service créé
2. Allez dans **"Settings"**
3. **Root Directory** → Changez en `backend`
4. **Build Command** → Changez en `npm install && npm run build`
5. **Start Command** → Changez en `npm start`
6. Renommez le service en **"Backend API"** (optionnel)

```
┌─────────────────────────────────────┐
│  Railway Service Settings           │
├─────────────────────────────────────┤
│  Service Name: Backend API          │
│  Root Directory: backend            │
│  Build Command: npm install &&      │
│                 npm run build       │
│  Start Command: npm start           │
└─────────────────────────────────────┘
```

7. Ajoutez une base de données MySQL :
   - Cliquez sur **"+ New"** dans le projet
   - Sélectionnez **"Database"** → **"MySQL"**

8. Configurez les variables d'environnement :
   - Allez dans **"Variables"** du service Backend
   - Ajoutez :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=railway
   JWT_SECRET=votre-cle-secrete-aleatoire-longue
   JWT_EXPIRE=7d
   ```

9. **Déployez** et notez l'URL du backend (ex: `https://backend-xxx.railway.app`)

---

### Étape 3️⃣ : Ajouter le Deuxième Service (Frontend)

1. Dans le même projet, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"**
3. **Rechoisissez** le même repo : `gestion-chantier-luange`
4. Railway crée un **nouveau service**

```
┌────────────────────────────────────────┐
│  Railway Project                       │
├────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐   │
│  │  Backend API │  │  Frontend    │   │
│  │  (backend/)  │  │  (/)         │   │
│  └──────────────┘  └──────────────┘   │
│                                        │
│  ┌──────────────┐                     │
│  │  MySQL DB    │                     │
│  └──────────────┘                     │
└────────────────────────────────────────┘
```

5. Configurez le Frontend :
   - Allez dans **"Settings"**
   - **Root Directory** → Laissez `/` ou vide
   - **Build Command** → Changez en `npm install && npm run build`
   - **Start Command** → Changez en `npm run preview`
   - Renommez en **"Frontend React"** (optionnel)

```
┌─────────────────────────────────────┐
│  Railway Service Settings           │
├─────────────────────────────────────┤
│  Service Name: Frontend React       │
│  Root Directory: /                  │
│  Build Command: npm install &&      │
│                 npm run build       │
│  Start Command: npm run preview     │
└─────────────────────────────────────┘
```

6. Configurez les variables d'environnement :
   - Allez dans **"Variables"** du service Frontend
   - Ajoutez :
   ```
   VITE_API_URL=https://votre-backend-xxx.railway.app
   ```
   **Remplacez par l'URL réelle du backend de l'étape 2 !**

7. **Déployez** le frontend

---

### Étape 4️⃣ : Configurer CORS

1. Notez l'URL du frontend (ex: `https://frontend-xxx.railway.app`)

2. Modifiez localement `backend/src/app.js` :

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://frontend-xxx.railway.app'  // ⬅️ Ajoutez cette ligne
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

3. Commit et push :
```bash
git add backend/src/app.js
git commit -m "Add frontend URL to CORS"
git push origin main
```

Railway redéploiera automatiquement.

---

## ❌ Ce qui NE fonctionnera PAS

### ❌ Déployer sans configurer Root Directory
```
Si vous ne changez pas Root Directory, Railway va essayer
de builder tout le projet comme un monolithe et échouera.
```

### ❌ N'ajouter qu'un seul service
```
Railway ne créera PAS automatiquement 2 services.
Vous DEVEZ ajouter manuellement le 2e service.
```

### ❌ Oublier de configurer VITE_API_URL
```
Le frontend ne saura pas où se trouve le backend
et toutes les requêtes API échoueront.
```

---

## ✅ Résultat Final

Après configuration, vous aurez :

```
Railway Project: gestion-chantier-luange
│
├── 🔧 Service 1: Backend API
│   Root: backend/
│   URL: https://backend-xxx.railway.app
│   Env: DB_HOST, JWT_SECRET, etc.
│
├── ⚛️  Service 2: Frontend React
│   Root: /
│   URL: https://frontend-xxx.railway.app
│   Env: VITE_API_URL
│
└── 🗄️  MySQL Database
    Auto-connecté au Backend
```

---

## �� Comment vérifier que tout fonctionne ?

### Backend
```bash
curl https://backend-xxx.railway.app/api/health
# Devrait retourner: {"status":"ok"}
```

### Frontend
```
Ouvrez: https://frontend-xxx.railway.app
Vous devriez voir la page de login
```

### Communication Backend ↔️ Frontend
```
Essayez de vous connecter sur le frontend.
Si ça fonctionne, la communication est OK !
```

---

## 📝 Checklist de Déploiement

- [ ] Projet Railway créé
- [ ] Service Backend configuré avec Root Directory = `backend`
- [ ] Base de données MySQL ajoutée
- [ ] Variables d'environnement Backend configurées
- [ ] Backend déployé et URL notée
- [ ] Service Frontend ajouté manuellement
- [ ] Frontend configuré avec Root Directory = `/`
- [ ] Variable VITE_API_URL configurée avec l'URL du backend
- [ ] Frontend déployé
- [ ] CORS configuré dans backend avec l'URL du frontend
- [ ] Test de connexion réussi

---

## 🆘 Besoin d'aide ?

Si vous avez des erreurs :
1. Vérifiez les logs Railway pour chaque service
2. Assurez-vous que les Root Directory sont corrects
3. Vérifiez que VITE_API_URL pointe vers le bon backend
4. Vérifiez le CORS dans backend/src/app.js

**Railway Dashboard** : https://railway.app/dashboard
**Documentation Railway** : https://docs.railway.app/

