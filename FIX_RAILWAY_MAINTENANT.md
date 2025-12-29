# �� FIX URGENT : Route non trouvée sur Railway

## ❌ Problème Actuel

Vous obtenez :
```json
{"success":false,"message":"Route non trouvée"}
```

## 🔍 Diagnostic

Railway a déployé **UN SEUL service** au lieu de **DEUX services séparés**.

---

## ✅ SOLUTION : Créer 2 Services Manuellement

### Étape 1 : Vérifier votre situation actuelle

1. Allez sur https://railway.app/dashboard
2. Ouvrez votre projet `gestion-chantier-luange`
3. **Combien de services voyez-vous ?**

   **Si vous voyez 1 service** :
   ```
   ┌─────────────────────────┐
   │  gestion-chantier...    │  ← UN SEUL SERVICE (PROBLÈME!)
   └─────────────────────────┘
   ```
   → **PASSEZ À L'ÉTAPE 2**

   **Si vous voyez 2 services** :
   ```
   ┌──────────────┐  ┌──────────────┐
   │  Backend API │  │  Frontend    │  ← DEUX SERVICES (BON!)
   └──────────────┘  └──────────────┘
   ```
   → **PASSEZ À L'ÉTAPE 3** (configuration)

---

### Étape 2 : Créer les 2 Services

#### A) Configurer le service existant comme Backend

1. **Cliquez sur votre service actuel**
2. **Settings** → Trouvez **"Root Directory"**
3. **Changez en** : `backend`
4. **Build Command** → Changez en : `npm install && npm run build`
5. **Start Command** → Changez en : `npm start`
6. **Sauvegardez** et attendez le redéploiement

```
┌─────────────────────────────────────┐
│  Service Configuration              │
├─────────────────────────────────────┤
│  Name: Backend API                  │
│  Root Directory: backend            │ ← IMPORTANT !
│  Build: npm install && npm run build│
│  Start: npm start                   │
└─────────────────────────────────────┘
```

7. **Une fois déployé**, notez l'URL du backend :
   ```
   https://backend-xxx.up.railway.app
   ```

#### B) Ajouter le service Frontend

1. **Dans le même projet**, cliquez sur **"+ New"**
2. Sélectionnez **"GitHub Repo"**
3. **Rechoisissez** votre repo : `gestion-chantier-luange`
4. Railway crée un **nouveau service**

5. **Configurez ce nouveau service** :
   - Settings → **Root Directory** : `/` (ou laissez vide)
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm run preview`

```
┌─────────────────────────────────────┐
│  Service Configuration              │
├─────────────────────────────────────┤
│  Name: Frontend React               │
│  Root Directory: /                  │ ← IMPORTANT !
│  Build: npm install && npm run build│
│  Start: npm run preview             │
└─────────────────────────────────────┘
```

6. **Variables d'environnement** :
   - Allez dans **"Variables"**
   - Ajoutez :
   ```
   VITE_API_URL=https://backend-xxx.up.railway.app
   ```
   (Utilisez l'URL du backend de l'étape A)

7. **Déployez** le frontend

---

### Étape 3 : Configurer CORS dans le Backend

1. **Notez l'URL du frontend** (ex: `https://frontend-xxx.up.railway.app`)

2. **Localement**, modifiez `backend/src/app.js` :

```javascript
// Cherchez cette section CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://frontend-xxx.up.railway.app'  // ⬅️ AJOUTEZ CETTE LIGNE
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

3. **Commitez et pushez** :
```bash
cd /home/rumariza/Documents/GitHub/gestion-chantier-luange
git add backend/src/app.js
git commit -m "Add frontend URL to CORS configuration"
git push origin main
```

Railway redéploiera automatiquement le backend.

---

### Étape 4 : Tester

1. **Attendez** que les deux services soient déployés (status : "Active")

2. **Ouvrez l'URL du frontend** : `https://frontend-xxx.up.railway.app`

3. **Testez la connexion** avec vos identifiants

4. **Si ça fonctionne** : ✅ Problème résolu !

5. **Si erreur persiste** :
   - Ouvrez la Console du navigateur (F12)
   - Vérifiez les erreurs réseau
   - Vérifiez que VITE_API_URL pointe vers le bon backend

---

## 🎨 Schéma de la Solution

### ❌ AVANT (Problème)

```
Railway
  └── 1 Service (/)
      ├── Essaie de servir frontend
      └── Routes backend manquantes
      → Erreur: "Route non trouvée"
```

### ✅ APRÈS (Solution)

```
Railway
  ├── Service 1: Backend (backend/)
  │   └── Routes API: /api/auth/login, etc.
  │
  └── Service 2: Frontend (/)
      └── Interface React + appelle Backend via VITE_API_URL
```

---

## 📋 Checklist de Vérification

Après avoir suivi les étapes, vérifiez :

- [ ] J'ai 2 services dans Railway (Backend + Frontend)
- [ ] Service Backend :
  - [ ] Root Directory = `backend`
  - [ ] Start Command = `npm start`
  - [ ] URL backend notée
- [ ] Service Frontend :
  - [ ] Root Directory = `/`
  - [ ] Variable VITE_API_URL configurée
  - [ ] Pointe vers l'URL du backend
- [ ] CORS configuré dans `backend/src/app.js`
- [ ] Code committé et pushé
- [ ] Les deux services sont déployés (Active)
- [ ] Le frontend est accessible
- [ ] Je peux me connecter sans erreur

---

## 🆘 Toujours bloqué ?

### Erreur : "Cannot find module"
```bash
→ Vérifiez le Root Directory
→ Backend doit être "backend"
→ Frontend doit être "/"
```

### Erreur : CORS
```bash
→ Vérifiez backend/src/app.js
→ L'URL du frontend doit être dans corsOptions.origin
```

### Erreur : "Route non trouvée" persiste
```bash
→ Vérifiez que vous accédez à l'URL du FRONTEND
→ Pas celle du backend directement
→ Frontend: https://frontend-xxx.railway.app
→ Backend: https://backend-xxx.railway.app
```

---

## 📞 Commandes Utiles

### Voir les logs Railway
```bash
# Installer Railway CLI
npm install -g @railway/cli

# Login
railway login

# Voir les logs du backend
railway logs --service backend-api

# Voir les logs du frontend
railway logs --service frontend
```

---

## ✅ Une fois résolu

Après avoir créé les 2 services, votre application devrait fonctionner :

- ✅ Frontend : Interface utilisateur accessible
- ✅ Backend : API répond aux requêtes
- ✅ Communication : Frontend ↔️ Backend fonctionne
- ✅ CORS : Pas d'erreur de cross-origin
- ✅ Connexion : Login/Logout fonctionnent

---

**TL;DR** : Créez 2 services manuellement dans Railway avec Root Directory différents (backend/ et /).

