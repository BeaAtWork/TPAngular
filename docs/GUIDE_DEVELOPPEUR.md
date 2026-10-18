# Guide du Développeur - TPAngular

> **Projet** : TPAngular  
> **Framework** : Angular 7.1.0  
> **Dernière mise à jour** : Janvier 2019

---

## 📋 Table des Matières

1. [Introduction](#introduction)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Structure du Projet](#structure-du-projet)
5. [Conventions de Codage](#conventions-de-codage)
6. [Développement](#développement)
7. [Tests](#tests)
8. [Build et Déploiement](#build-et-déploiement)
9. [Dépannage](#dépannage)
10. [Contribution](#contribution)

---

## 🚀 Introduction

Bienvenue dans le guide du développeur pour **TPAngular** ! Ce document vous guidera à travers le processus de développement, de test et de déploiement de l'application.

TPAngular est une application Angular 7 qui permet de gérer une liste d'appareils électroniques avec des fonctionnalités pour allumer, éteindre et visualiser leur état.

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

### Système d'Exploitation
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu, Fedora, etc.)

### Logiciels Requise

| Logiciel | Version Minimum | Vérification | Lien |
|----------|-----------------|--------------|------|
| Node.js | 8.x | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | 5.x | `npm -v` | Inclus avec Node.js |
| Angular CLI | 7.x | `ng version` | [cli.angular.io](https://cli.angular.io) |
| Git | 2.x | `git --version` | [git-scm.com](https://git-scm.com) |

### Installation des Prérequis

#### Sur macOS/Linux
```bash
# Installer Node.js (inclut npm)
# Via nvm (recommandé)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 10.15.0
nvm use 10.15.0

# Installer Angular CLI
npm install -g @angular/cli@7.1.4

# Installer Git
# macOS: déjà installé ou via brew
brew install git

# Linux (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install git-core
```

#### Sur Windows
1. Télécharger et installer Node.js depuis [nodejs.org](https://nodejs.org)
2. Ouvrir un terminal (CMD ou PowerShell) et exécuter :
```bash
npm install -g @angular/cli@7.1.4
```
3. Installer Git depuis [git-scm.com](https://git-scm.com)

---

## 💻 Installation

### Cloner le Dépôt

```bash
# Cloner le dépôt Git
git clone https://github.com/BeaAtWork/TPAngular.git

# Se déplacer dans le dossier du projet
cd TPAngular
```

### Installer les Dépendances

```bash
# Installer toutes les dépendances npm
npm install
```

**Note** : Cela installera toutes les dépendances listées dans `package.json` :
- Dépendances de production (Angular, RxJS, Bootstrap, etc.)
- Dépendances de développement (Angular CLI, TypeScript, Karma, etc.)

### Vérifier l'Installation

```bash
# Vérifier que toutes les dépendances sont installées
npm list --depth=0

# Vérifier la version d'Angular
ng version
```

---

## 📁 Structure du Projet

```
TPAngular/
├── src/                          # Code source de l'application
│   ├── app/                      # Module principal
│   │   ├── appareil/             # Composant appareil individuel
│   │   │   ├── appareil.component.ts
│   │   │   ├── appareil.component.html
│   │   │   ├── appareil.component.scss
│   │   │   └── appareil.component.spec.ts
│   │   ├── appareil-view/        # Vue liste des appareils
│   │   │   ├── appareil-view.component.ts
│   │   │   ├── appareil-view.component.html
│   │   │   ├── appareil-view.component.scss
│   │   │   └── appareil-view.component.spec.ts
│   │   ├── auth/                 # Composant d'authentification
│   │   │   ├── auth.component.ts
│   │   │   ├── auth.component.html
│   │   │   ├── auth.component.scss
│   │   │   └── auth.component.spec.ts
│   │   ├── services/             # Services
│   │   │   └── appareil.service.ts
│   │   ├── app-routing.module.ts # Module de routage
│   │   ├── app.module.ts        # Module principal
│   │   ├── app.component.ts     # Composant racine
│   │   ├── app.component.html
│   │   └── app.component.scss
│   ├── assets/                   # Ressources statiques (images, etc.)
│   ├── environments/            # Configurations par environnement
│   │   ├── environment.ts       # Développement
│   │   └── environment.prod.ts  # Production
│   ├── index.html               # Page d'entrée HTML
│   ├── main.ts                  # Point d'entrée TypeScript
│   ├── polyfills.ts             # Polyfills pour la compatibilité
│   ├── styles.scss              # Styles globaux
│   └── test.ts                  # Configuration des tests
├── e2e/                         # Tests End-to-End
│   ├── protractor.conf.js       # Configuration Protractor
│   ├── tsconfig.e2e.json        # Configuration TypeScript E2E
│   └── src/
│       ├── app.po.ts            # Page Objects
│       └── app.e2e-spec.ts      # Spécifications E2E
├── docs/                        # Documentation (ce dossier)
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── SERVICES.md
│   └── GUIDE_DEVELOPPEUR.md
├── angular.json                  # Configuration Angular CLI
├── package.json                 # Dépendances et scripts npm
├── tsconfig.json                # Configuration TypeScript
├── tslint.json                  # Configuration TSLint
├── karma.conf.js                # Configuration Karma
├── .gitignore                   # Fichiers à ignorer par Git
├── .editorconfig                # Configuration de l'éditeur
└── README.md                    # Documentation de base
```

---

## 💎 Conventions de Codage

### TypeScript

1. **Nommage des classes** : PascalCase
   ```typescript
   // ✅ Bon
   export class AppareilService {}
   export class AppComponent {}
   
   // ❌ Mauvais
   export class appareilService {}
   export class app_component {}
   ```

2. **Nommage des variables et méthodes** : camelCase
   ```typescript
   // ✅ Bon
   appareilName: string;
   getStatus() {}
   switchOnAll() {}
   
   // ❌ Mauvais
   AppareilName: string;
   get_status() {}
   SwitchOnAll() {}
   ```

3. **Nommage des constantes** : UPPER_CASE
   ```typescript
   // ✅ Bon
   const MAX_APPAREILS = 10;
   const DEFAULT_STATUS = 'éteint';
   
   // ❌ Mauvais
   const maxAppareils = 10;
   const defaultStatus = 'éteint';
   ```

4. **Typage** : Toujours typer les variables et paramètres
   ```typescript
   // ✅ Bon
   appareilName: string;
   index: number;
   isAuth: boolean;
   
   // ❌ Mauvais
   appareilName: any;
   index;
   ```

5. **Interfaces** : Utiliser des interfaces pour les types complexes
   ```typescript
   // ✅ Bon
   interface Appareil {
     name: string;
     status: 'allumé' | 'éteint';
   }
   
   appareils: Appareil[];
   
   // ❌ Mauvais
   appareils: any[];
   ```

### Angular

1. **Sélecteurs de composants** : Utiliser le préfixe `app-`
   ```typescript
   // ✅ Bon
   @Component({
     selector: 'app-appareil'
   })
   
   // ❌ Mauvais
   @Component({
     selector: 'appareil'
   })
   ```

2. **Nommage des fichiers** : Suivre la convention `nom.type.ext`
   ```
   # ✅ Bon
   appareil.component.ts
   appareil.component.html
   appareil.component.scss
   appareil.component.spec.ts
   
   # ❌ Mauvais
   AppareilComponent.ts
   appareil.html
   appareil.css
   ```

3. **Organisation des dossiers** : Un dossier par composant/service
   ```
   # ✅ Bon
   src/app/appareil/appareil.component.ts
   src/app/services/appareil.service.ts
   
   # ❌ Mauvais
   src/app/appareil.component.ts
   src/app/appareil.service.ts
   ```

### HTML

1. **Attributs** : Utiliser la syntaxe Angular
   ```html
   <!-- ✅ Bon -->
   <button [disabled]="!isAuth" (click)="onAllumer()">Allumer</button>
   <input [(ngModel)]="appareilName">
   
   <!-- ❌ Mauvais -->
   <button disabled="{{!isAuth}}" onclick="onAllumer()">Allumer</button>
   ```

2. **Classes Bootstrap** : Utiliser les classes Bootstrap correctement
   ```html
   <!-- ✅ Bon -->
   <div class="container">
     <div class="row">
       <div class="col-xs-12">
         Contenu
       </div>
     </div>
   </div>
   
   <!-- ❌ Mauvais -->
   <div class="container">
     <div class="row">
       <div class="col-md-12">  <!-- Incohérent avec col-xs-12 -->
         Contenu
       </div>
     </div>
   </div>
   ```

### SCSS

1. **Scoping** : Utiliser le scoping des composants
   ```scss
   /* ✅ Bon - Styles scopés au composant */
   :host {
     display: block;
   }
   
   .appareil-item {
     margin: 10px 0;
   }
   ```

2. **Variables** : Utiliser des variables pour les couleurs
   ```scss
   /* ✅ Bon */
   $color-allume: #28a745;
   $color-eteint: #dc3545;
   
   .allume {
     color: $color-allume;
   }
   
   /* ❌ Mauvais */
   .allume {
     color: #28a745;
   }
   ```

---

## 🛠️ Développement

### Démarrer le Serveur de Développement

```bash
# Démarrer avec Angular CLI
ng serve

# ou avec npm
npm start
```

L'application sera disponible à l'adresse : `http://localhost:4200`

**Options** :
- `--port` : Changer le port (ex: `ng serve --port 4300`)
- `--open` : Ouvrir automatiquement dans le navigateur
- `--host` : Spécifier l'hôte (ex: `ng serve --host 0.0.0.0` pour accès réseau)

### Mode de Développement

- **Hot Module Replacement** : Les modifications sont automatiquement rechargées
- **Source Maps** : Permet le débogage dans le navigateur
- **Live Reload** : Recharge la page lors des changements

### Créer de Nouveaux Composants

```bash
# Créer un composant
ng generate component nom-du-composant
ng g c nom-du-composant  # Forme courte

# Créer un service
ng generate service nom-du-service
ng g s nom-du-service

# Créer une directive
ng generate directive nom-de-la-directive
ng g d nom-de-la-directive

# Créer un pipe
ng generate pipe nom-du-pipe
ng g p nom-du-pipe
```

**Exemple** :
```bash
# Créer un composant pour un nouvel appareil
ng g c appareil-detail

# Créer un service pour gérer l'authentification
ng g s auth
```

### Ajouter des Dépendances

```bash
# Ajouter une dépendance de production
npm install nom-du-package
npm install nom-du-package --save  # Ancienne syntaxe

# Ajouter une dépendance de développement
npm install nom-du-package --save-dev

# Exemples
npm install lodash          # Utilitaire
npm install @angular/material  # Composants Material Design
npm install ngx-bootstrap     # Alternative à Bootstrap
```

### Mettre à Jour les Dépendances

```bash
# Mettre à jour toutes les dépendances
npm update

# Mettre à jour une dépendance spécifique
npm update nom-du-package

# Vérifier les mises à jour disponibles
npm outdated
```

---

## 🧪 Tests

### Tests Unitaires

```bash
# Exécuter tous les tests unitaires
ng test
npm test

# Exécuter en mode watch (recharge automatique)
ng test --watch

# Exécuter avec couverture de code
ng test --code-coverage
```

**Fichiers de test** :
- `*.spec.ts` : Fichiers de test pour les composants et services
- `karma.conf.js` : Configuration de Karma (runner de tests)

**Exemple de test** :
```typescript
// app.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isAuth property', () => {
    expect(component.isAuth).toBeDefined();
  });
});
```

### Tests End-to-End (E2E)

```bash
# Démarrer le serveur de développement et exécuter les tests E2E
ng e2e
npm run e2e

# Exécuter avec un serveur spécifique
ng e2e --serve-url http://localhost:4200
```

**Fichiers E2E** :
- `e2e/src/app.e2e-spec.ts` : Spécifications des tests E2E
- `e2e/src/app.po.ts` : Page Objects (pour interagir avec la page)
- `e2e/protractor.conf.js` : Configuration de Protractor

**Exemple de test E2E** :
```typescript
// e2e/src/app.e2e-spec.ts
import { AppPage } from './app.po';

describe('tpangular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to tpangular!');
  });

  it('should display appareils list', () => {
    page.navigateTo();
    expect(page.getAppareilsCount()).toBe(3);
  });
});
```

### Linting

```bash
# Exécuter le linting TypeScript
ng lint
npm run lint

# Corriger automatiquement les erreurs de linting
ng lint --fix
```

---

## 🏗️ Build et Déploiement

### Build pour le Développement

```bash
# Build standard
ng build
npm run build

# Build avec configuration spécifique
ng build --configuration development
```

**Dossier de sortie** : `dist/pjAngularTest`

### Build pour la Production

```bash
# Build optimisé pour la production
ng build --prod
npm run build -- --prod

# Build avec AOT (Ahead-of-Time compilation)
g build --aot

# Build avec toutes les optimisations
ng build --prod --aot
```

**Optimisations appliquées** :
- Minification du code
- Tree-shaking (élimination du code inutilisé)
- Compression des fichiers
- Optimisation des images
- Extraction du CSS

### Serveur de Production

```bash
# Démarrer un serveur HTTP simple
npx http-server dist/pjAngularTest

# Avec Python
python -m http.server 8000 --directory dist/pjAngularTest

# Avec PHP (si disponible)
php -S localhost:8000 -t dist/pjAngularTest
```

### Déploiement

#### Sur GitHub Pages

1. Installer `angular-cli-ghpages` :
```bash
npm install -g angular-cli-ghpages
```

2. Déployer :
```bash
ng build --prod --base-href "https://BeaAtWork.github.io/TPAngular/"
ngh --dir=dist/pjAngularTest
```

#### Sur Firebase Hosting

1. Installer Firebase CLI :
```bash
npm install -g firebase-tools
firebase login
```

2. Initialiser Firebase :
```bash
firebase init
# Sélectionner Hosting
```

3. Déployer :
```bash
ng build --prod
firebase deploy
```

#### Sur Netlify

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Connecter votre dépôt GitHub
3. Configurer le build :
   - Commande : `ng build --prod`
   - Dossier : `dist/pjAngularTest`

#### Sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer votre dépôt GitHub
3. Configurer le build :
   - Framework : Angular
   - Commande : `ng build --prod`

---

## 🐛 Dépannage

### Problèmes Courants

#### 1. Erreur : "Cannot find module '@angular/core'"

**Cause** : Les dépendances npm ne sont pas installées.

**Solution** :
```bash
npm install
```

---

#### 2. Erreur : "ng: command not found"

**Cause** : Angular CLI n'est pas installé globalement.

**Solution** :
```bash
npm install -g @angular/cli@7.1.4
```

---

#### 3. Erreur : "Port 4200 is already in use"

**Cause** : Un autre processus utilise le port 4200.

**Solution** :
```bash
# Trouver le processus
lsof -i :4200

# Tuer le processus (macOS/Linux)
kill -9 <PID>

# Utiliser un autre port
ng serve --port 4300
```

---

#### 4. Erreur : "Maximum call stack size exceeded"

**Cause** : Boucle infinie dans le code.

**Solution** :
- Vérifier les méthodes récursives
- Vérifier les abonnements RxJS (toujours se désabonner)
- Utiliser le débogueur Chrome DevTools

---

#### 5. Les modifications ne sont pas rechargées

**Cause** : Problème avec le hot reload.

**Solution** :
```bash
# Redémarrer le serveur
Ctrl + C
ng serve

# Vider le cache
ng serve --disable-host-check
```

---

#### 6. Erreur de compilation TypeScript

**Cause** : Erreur de syntaxe ou de typage.

**Solution** :
- Lire le message d'erreur dans le terminal
- Vérifier le fichier et la ligne indiqués
- Corriger l'erreur de typage

---

#### 7. Bootstrap ne s'affiche pas correctement

**Cause** : Problème avec l'import de Bootstrap.

**Solution** :
- Vérifier que Bootstrap est dans `package.json`
- Vérifier que Bootstrap est importé dans `angular.json` :
```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.css",
  "src/styles.scss"
]
```

---

### Outils de Débogage

#### Chrome DevTools
- **Onglet Elements** : Inspecter le DOM
- **Onglet Console** : Voir les erreurs JavaScript
- **Onglet Sources** : Déboguer le code TypeScript
- **Onglet Network** : Analyser les requêtes HTTP
- **Onglet Application** : Inspecter le localStorage

#### Angular DevTools (Extension Chrome)
1. Installer l'extension depuis le Chrome Web Store
2. Ouvrir DevTools (F12)
3. Onglet Angular pour inspecter :
   - Les composants
   - Les services
   - Les hooks de cycle de vie
   - Les changements de détection

#### Visual Studio Code
- **Extension Angular Language Service** : Autocomplétion et vérification
- **Extension ESLint** : Linting en temps réel
- **Extension Prettier** : Formatage automatique
- **Débogage** : Configurer le launch.json pour déboguer Angular

---

## 🤝 Contribution

### Fork et Clone

1. Forker le dépôt sur GitHub
2. Cloner votre fork localement :
```bash
git clone https://github.com/votre-utilisateur/TPAngular.git
cd TPAngular
```

3. Ajouter le dépôt original comme remote :
```bash
git remote add upstream https://github.com/BeaAtWork/TPAngular.git
```

### Créer une Branche

```bash
# Créer une nouvelle branche
 git checkout -b feature/nouvelle-fonctionnalite

# ou pour corriger un bug
git checkout -b fix/nom-du-bug
```

### Commiter vos Modifications

```bash
# Ajouter les fichiers modifiés
git add .

# Commiter avec un message clair
git commit -m "feat: ajouter une nouvelle fonctionnalité"

# Pousser vers votre fork
git push origin feature/nouvelle-fonctionnalite
```

### Conventions de Commit

Utiliser les conventions [Conventional Commits](https://www.conventionalcommits.org/) :

| Type | Description | Exemple |
|------|-------------|---------|
| `feat` | Nouvelle fonctionnalité | `feat: ajouter bouton de suppression` |
| `fix` | Correction de bug | `fix: corriger l'affichage des appareils` |
| `docs` | Documentation | `docs: mettre à jour le README` |
| `style` | Changements de style | `style: corriger le CSS des boutons` |
| `refactor` | Refactorisation | `refactor: extraire la logique dans un service` |
| `perf` | Optimisation de performance | `perf: améliorer le rendu de la liste` |
| `test` | Ajout de tests | `test: ajouter des tests pour AppareilService` |
| `chore` | Maintenance | `chore: mettre à jour les dépendances` |

### Soumettre une Pull Request

1. Aller sur votre fork sur GitHub
2. Sélectionner votre branche
3. Cliquer sur "New Pull Request"
4. Sélectionner le dépôt original (`BeaAtWork/TPAngular`) et la branche `master`
5. Remplir le titre et la description
6. Cliquer sur "Create Pull Request"

### Revoir une Pull Request

- Vérifier que le code suit les conventions
- Exécuter les tests : `npm test`
- Exécuter le linting : `npm run lint`
- Vérifier le build : `npm run build`

---

## 📚 Ressources Utiles

### Documentation Officielle
- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://cli.angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [RxJS Documentation](https://rxjs.dev/guide/overview)

### Tutoriels
- [Angular Tutorial](https://angular.io/tutorial)
- [Tour of Heroes](https://angular.io/tutorial/tour-of-heroes)
- [Angular University](https://angular-university.io/)

### Outils
- [StackBlitz](https://stackblitz.com) : Éditeur Angular en ligne
- [CodeSandbox](https://codesandbox.io) : Éditeur en ligne
- [Angular Material](https://material.angular.io) : Composants Material Design

### Communautés
- [Angular Discord](https://discord.gg/angular)
- [Stack Overflow - Angular](https://stackoverflow.com/questions/tagged/angular)
- [r/Angular2](https://www.reddit.com/r/Angular2/)

---

## 📝 Changelog

| Version | Date | Description | Auteur |
|---------|------|-------------|--------|
| 1.0.0 | Janvier 2019 | Version initiale | BeaAtWork |

---

## 📞 Support

Si vous rencontrez des problèmes ou avez des questions :

1. Consulter la [documentation officielle Angular](https://angular.io/docs)
2. Vérifier les [issues GitHub](https://github.com/BeaAtWork/TPAngular/issues)
3. Ouvrir une nouvelle issue avec :
   - Une description claire du problème
   - Les étapes pour reproduire
   - Votre environnement (OS, Node.js version, Angular version)
   - Les logs d'erreur

---

## 🎉 Conclusion

Félicitations ! Vous êtes maintenant prêt à développer avec TPAngular. N'hésitez pas à explorer le code, ajouter de nouvelles fonctionnalités et contribuer au projet.

**Prochaines étapes suggérées** :
1. Implémenter le routage Angular
2. Ajouter la persistance des données avec localStorage
3. Créer une interface utilisateur plus avancée
4. Ajouter des tests unitaires et E2E
5. Implémenter une authentification réelle

Bonne programmation ! 🚀
