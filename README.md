# Le Théâtre Cabosse — site + admin

Ce projet génère le site avec **Eleventy** (à partir de fichiers de contenu simples)
et permet de l'éditer sans coder via **Decap CMS**, connecté à **Netlify**.

⚠️ Ce projet n'a pas pu être testé (build) directement dans cet environnement
car il n'a pas accès à Internet pour installer les dépendances npm. Chaque fichier
a été relu attentivement, mais teste la première fois en local (étape 1 ci-dessous)
avant de déployer, pour repérer une éventuelle coquille.

## 1. Tester en local (optionnel mais recommandé)

```bash
npm install
npm run serve
```

Puis ouvre http://localhost:8080 dans ton navigateur. `npm run serve` recharge
automatiquement à chaque modification.

## 2. Mettre le projet sur GitHub

Crée un dépôt GitHub **public** et pousse-y tout ce dossier (structure telle quelle,
avec `package.json`, `.eleventy.js`, `netlify.toml`, `src/`, `admin/` à la racine).

## 3. Connecter le dépôt à Netlify

1. Va sur https://app.netlify.com → "Add new site" → "Import an existing project".
2. Choisis ton dépôt GitHub.
3. Netlify doit détecter automatiquement (grâce à `netlify.toml`) :
   - Build command : `npm run build`
   - Publish directory : `_site`
4. Clique sur "Deploy site".

## 4. Activer Netlify Identity + Git Gateway (pour que Decap CMS fonctionne)

1. Dans le tableau de bord Netlify du site → **Site configuration** → **Identity** → **Enable Identity**.
2. Toujours dans Identity → **Services** → active **Git Gateway**.
3. Dans Identity → **Registration**, choisis "Invite only" (recommandé, pour que
   seules les personnes que tu invites puissent se connecter à l'admin).
4. Onglet **Identity** → **Invite users** → entre l'email du propriétaire du site.
   Il recevra un email pour créer son mot de passe.

## 5. Se connecter à l'administration

Une fois déployé, l'admin est accessible à :

`https://TON-SITE.netlify.app/admin/`

Le propriétaire clique sur "Login with Netlify Identity", utilise l'email invité,
et peut alors éditer les spectacles, la page d'accueil, les textes et les photos.

## 6. Nom de domaine personnalisé (optionnel)

Dans Netlify → **Domain management** → **Add a domain**, puis suit les instructions
pour pointer ton nom de domaine (acheté chez un registraire comme OVH, Ionos...)
vers Netlify.

## Structure du contenu éditable

- `src/spectacles/*.md` — un fichier par spectacle (titre, fiche technique,
  photo, vidéo YouTube, dossier PDF, texte de présentation).
- `src/_data/site.json` — textes et réglages généraux (page d'accueil, citation,
  Agenda, La Compagnie, Les Amis, réseaux sociaux).

Tout ceci est directement éditable depuis `/admin` une fois Netlify Identity activé —
le propriétaire n'a jamais besoin d'ouvrir ces fichiers lui-même.
