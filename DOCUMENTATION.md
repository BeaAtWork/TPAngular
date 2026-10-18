# Documentation du Projet TPAngular

> **Version** : 1.0.0  
> **Auteur** : BeaAtWork  
> **Date** : Janvier 2019  
> **Framework** : Angular 7.1.0

---

## Table des Matières

1. [Introduction](#introduction)
2. [Architecture du Projet](#architecture-du-projet)
3. [Structure des Fichiers](#structure-des-fichiers)
4. [Composants](#composants)
   - [AppComponent](#appcomponent)
   - [AppareilComponent](#appareilcomponent)
   - [AppareilViewComponent](#appareilviewcomponent)
   - [AuthComponent](#authcomponent)
5. [Services](#services)
   - [AppareilService](#appareilservice)
6. [Modules](#modules)
   - [AppModule](#appmodule)
   - [AppRoutingModule](#approutingmodule)
7. [Fonctionnalités](#fonctionnalités)
8. [Technologies Utilisées](#technologies-utilisées)
9. [Installation et Exécution](#installation-et-exécution)
10. [Configuration](#configuration)
11. [Bonnes Pratiques](#bonnes-pratiques)

---

## Introduction

**TPAngular** est une application web développée avec Angular 7 qui permet de gérer une liste d'appareils électroniques. L'application offre des fonctionnalités pour allumer, éteindre et visualiser l'état des appareils.

### Objectifs
- Manipuler des composants Angular
- Utiliser des services pour partager des données
- Implémenter des interactions utilisateur (boutons, confirmations)
- Appliquer des styles conditionnels
- Utiliser le data binding et les directives Angular

---

## Architecture du Projet

L'application suit une architecture classique Angular avec :
- **Composants** : Responsables de l'affichage et des interactions utilisateur
- **Services** : Contiennent la logique métier et les données partagées
- **Modules** : Organisent les composants et services

```
┌─────────────────────────────────────────────────────────────┐
│                        AppComponent                             │
│  (Composant racine)                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     AppareilViewComponent                       │
│  - Affiche la liste des appareils                             │
│  - Boutons "Tout allumer" / "Tout éteindre"                    │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ AppareilComponent│ │ AppareilComponent│ │ AppareilComponent│
│ (Machine à laver)│ │ (Frigo)          │ │ (Ordinateur)     │
└─────────────────┘ └─────────────────┘ └─────────────────┘
              ▲               ▲               ▲
              │               │               │
              └───────────────┼───────────────┘
                          ▼
              ┌─────────────────────────────────┐
              │       AppareilService             │
              │  - Gère l'état des appareils       │
              │  - Méthodes de basculement         │
              └─────────────────────────────────┘
```

---

## Structure des Fichiers

```
TPAngular/
├── src/
│   ├── app/
│   │   ├── appareil/                    # Composant appareil individuel
│   │   │   ├── appareil.component.ts
│   │   │   ├── appareil.component.html
│   │   │   ├── appareil.component.scss
│   │   │   └── appareil.component.spec.ts
│   │   ├── appareil-view/               # Vue liste des appareils
│   │   │   ├── appareil-view.component.ts
│   │   │   ├── appareil-view.component.html
│   │   │   ├── appareil-view.component.scss
│   │   │   └── appareil-view.component.spec.ts
│   │   ├── auth/                        # Composant d'authentification
│   │   │   ├── auth.component.ts
│   │   │   ├── auth.component.html
│   │   │   ├── auth.component.scss
│   │   │   └── auth.component.spec.ts
│   │   ├── services/                    # Services
│   │   │   └── appareil.service.ts
│   │   ├── app-routing.module.ts       # Module de routage
│   │   ├── app.module.ts               # Module principal
│   │   ├── app.component.ts            # Composant racine
│   │   ├── app.component.html
│   │   └── app.component.scss
│   ├── assets/                         # Ressources statiques
│   ├── environments/                   # Configurations environnement
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html                      # Page d'entrée
│   ├── main.ts                         # Point d'entrée de l'application
│   ├── polyfills.ts                    # Polyfills pour la compatibilité
│   ├── styles.scss                     # Styles globaux
│   └── test.ts                         # Configuration des tests
├── angular.json                          # Configuration Angular CLI
├── package.json                         # Dépendances et scripts
├── tsconfig.json                        # Configuration TypeScript
├── tslint.json                          # Configuration TSLint
├── karma.conf.js                        # Configuration Karma
└── README.md                            # Documentation de base
```

---

## Composants

### AppComponent

**Fichier** : `src/app/app.component.ts`  
**Sélecteur** : `app-root`  
**Rôle** : Composant racine de l'application

#### Propriétés
| Nom | Type | Description |
|-----|------|-------------|
| `isAuth` | `boolean` | Indique si l'utilisateur est authentifié (simulé) |
| `appareils` | `any[]` | Liste des appareils récupérée du service |

#### Méthodes

- **`ngOnInit()`** : Initialise le composant en récupérant la liste des appareils depuis `AppareilService`
- **`onAllumer()`** : Allume tous les appareils via `AppareilService.switchOnAll()`
- **`onEteindre()`** : Éteint tous les appareils via `AppareilService.switchOffAll()` (avec confirmation)

#### Template
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <app-appareil-view></app-appareil-view>
    </div>
  </div>
</div>
```

#### Styles
- Utilise Bootstrap pour la mise en page (grille responsive)

---

### AppareilComponent

**Fichier** : `src/app/appareil/appareil.component.ts`  
**Sélecteur** : `app-appareil`  
**Rôle** : Affiche et gère un appareil individuel

#### Propriétés (Inputs)
| Nom | Type | Description |
|-----|------|-------------|
| `@Input() appareilName` | `string` | Nom de l'appareil |
| `@Input() appareilStatus` | `string` | Statut de l'appareil (`'allumé'` ou `'éteint'`) |
| `@Input() index` | `number` | Index de l'appareil dans la liste |

#### Méthodes

- **`getName()`** : Retourne le nom de l'appareil
- **`getStatus()`** : Retourne le statut de l'appareil
- **`getColor()`** : Retourne la couleur à afficher selon le statut
  - `'green'` si `appareilStatus === 'allumé'`
  - `'red'` si `appareilStatus === 'éteint'`
- **`onSwitch()`** : Bascule l'état de l'appareil
  - Si allumé → éteint via `AppareilService.switchOffOne(index)`
  - Si éteint → allumé via `AppareilService.switchOnOne(index)`

#### Template
```html
<li [ngClass]="{'list-group-item': true,
                'list-group-item-success': appareilStatus === 'allumé',
                'list-group-item-danger': appareilStatus === 'éteint'}">
  <h4 [ngStyle]="{color: getColor()}">
    Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}
  </h4>
  <input type="text" class="form-control" [(ngModel)]="appareilName">
  
  <button class="btn btn-success" *ngIf="appareilStatus === 'éteint'" (click)="onSwitch()">
    Allumer
  </button>
  <button class="btn btn-danger" *ngIf="appareilStatus === 'allumé'" (click)="onSwitch()">
    Eteindre
  </button>
</li>
```

#### Styles
- Utilise les classes Bootstrap `list-group-item-success` et `list-group-item-danger` pour les états
- Applique une couleur de texte dynamique via `[ngStyle]`

---

### AppareilViewComponent

**Fichier** : `src/app/appareil-view/appareil-view.component.ts`  
**Sélecteur** : `app-appareil-view`  
**Rôle** : Affiche la liste complète des appareils avec des boutons de contrôle global

#### Propriétés
| Nom | Type | Description |
|-----|------|-------------|
| `appareils` | `any[]` | Liste des appareils |
| `lastUpdate` | `Promise<Date>` | Promise qui résout après 1 seconde (simulation de délai) |

#### Méthodes

- **`ngOnInit()`** : Initialise le composant en récupérant les appareils depuis le service
- **`onAllumer()`** : Allume tous les appareils
- **`onEteindre()`** : Éteint tous les appareils (avec confirmation)

#### Template
```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h2>Mes appareils</h2>
      <ul class="list-group">
        <app-appareil *ngFor="let appareil of appareils; let i = index"
                      [appareilName]="appareil.name"
                      [appareilStatus]="appareil.status"
                      [index]="i">
        </app-appareil>
      </ul>
    </div>
  </div>
  <button class="btn btn-success" [disabled]="!isAuth" (click)="onAllumer()">
    Tout allumer
  </button>
  <button class="btn btn-danger" [disabled]="!isAuth" (click)="onEteindre()">
    Tout éteindre
  </button>
</div>
```

#### Points Clés
- Utilise `*ngFor` pour itérer sur la liste des appareils
- Passe les données à chaque `AppareilComponent` via des `@Input()`
- Les boutons sont désactivés si `!isAuth` (bien que `isAuth` ne soit pas défini dans ce composant)

---

### AuthComponent

**Fichier** : `src/app/auth/auth.component.ts`  
**Sélecteur** : `app-auth`  
**Rôle** : Composant d'authentification (non utilisé dans l'application actuelle)

#### Template
```html
<p>auth works!</p>
```

**Note** : Ce composant est déclaré dans `AppModule` mais n'est pas utilisé dans les templates actuels.

---

## Services

### AppareilService

**Fichier** : `src/app/services/appareil.service.ts`  
**Rôle** : Service de gestion des appareils - contient la logique métier et les données

#### Propriétés

```typescript
appareils = [
  {
    name: 'Machine à laver',
    status: 'éteint'
  },
  {
    name: 'frigo',
    status: 'allumé'
  },
  {
    name: 'Ordinateur',
    status: 'éteint'
  }
];
```

#### Méthodes

| Méthode | Paramètres | Description |
|---------|------------|-------------|
| `switchOnAll()` | Aucun | Allume tous les appareils |
| `switchOffAll()` | Aucun | Éteint tous les appareils |
| `switchOnOne(i: number)` | `i: number` (index) | Allume l'appareil à l'index spécifié |
| `switchOffOne(i: number)` | `i: number` (index) | Éteint l'appareil à l'index spécifié |

#### Implémentation

```typescript
switchOnAll() {
  for (let appareil of this.appareils) {
    appareil.status = 'allumé';
  }
}

switchOffAll() {
  for (let appareil of this.appareils) {
    appareil.status = 'éteint';
  }
}

switchOnOne(i: number) {
  this.appareils[i].status = 'allumé';
}

switchOffOne(i: number) {
  this.appareils[i].status = 'éteint';
}
```

#### Utilisation
- Injecté dans `AppComponent` et `AppareilComponent`
- Fournit une source unique de vérité pour les données des appareils
- Permet la communication entre composants via le pattern **Service Singleton**

---

## Modules

### AppModule

**Fichier** : `src/app/app.module.ts`

#### Déclarations
- `AppComponent`
- `MonPremierComponent` (non trouvé dans les fichiers - probablement supprimé ou renommé)
- `AppareilComponent`
- `AuthComponent`
- `AppareilViewComponent`

#### Imports
- `BrowserModule` (Angular)
- `AppRoutingModule` (routage)
- `FormsModule` (pour `[(ngModel)]`)

#### Providers
- `AppareilService` (disponible pour l'injection dans toute l'application)

#### Bootstrap
- `AppComponent` (composant racine)

### AppRoutingModule

**Fichier** : `src/app/app-routing.module.ts`

**Statut** : Actuellement vide (pas de routes définies)

```typescript
const routes: Routes = [];
```

**Amélioration suggérée** : Ajouter des routes pour naviguer entre les différents composants

---

## Fonctionnalités

### 1. Visualisation des Appareils
- Affichage de la liste des appareils avec leur nom et statut
- Couleurs visuelles pour indiquer l'état (vert = allumé, rouge = éteint)
- Style Bootstrap pour une interface propre

### 2. Modification du Nom des Appareils
- Champ de texte pour modifier le nom de chaque appareil
- Data binding bidirectionnel avec `[(ngModel)]`

### 3. Contrôle Individuel
- Bouton "Allumer" pour chaque appareil éteint
- Bouton "Eteindre" pour chaque appareil allumé
- Action confirmée avant l'extinction de tous les appareils

### 4. Contrôle Global
- Bouton "Tout allumer" pour allumer tous les appareils
- Bouton "Tout éteindre" pour éteindre tous les appareils
- Confirmation avant l'extinction globale

### 5. Authentification Simulée
- Propriété `isAuth` dans `AppComponent`
- Passe à `true` après 1 seconde (simulation)
- Les boutons de contrôle global sont désactivés tant que `!isAuth`

---

## Technologies Utilisées

### Framework & Langages
- **Angular** : 7.1.0 (Framework principal)
- **TypeScript** : 3.1.6 (Langage de développement)
- **HTML5** : Structure des pages
- **SCSS** : Styles CSS
- **Bootstrap** : 3.3.7 (Framework CSS)

### Dépendances Principales

#### Angular Core
- `@angular/core` : 7.1.0
- `@angular/common` : 7.1.0
- `@angular/compiler` : 7.1.0
- `@angular/platform-browser` : 7.1.0
- `@angular/platform-browser-dynamic` : 7.1.0
- `@angular/forms` : 7.1.0 (pour les formulaires et ngModel)
- `@angular/router` : 7.1.0 (pour le routage)
- `@angular/animations` : 7.1.0

#### Autres Dépendances
- **RxJS** : 6.3.3 (Programmation réactive)
- **Zone.js** : 0.8.26 (Gestion des zones)
- **Core-js** : 2.5.4 (Polyfills)
- **Bootstrap** : 3.3.7 (Styles et composants UI)

### Dépendances de Développement
- **Angular CLI** : 7.1.4
- **TypeScript** : 3.1.6
- **Karma** : 3.1.1 (Tests unitaires)
- **Jasmine** : 2.99.1 (Framework de test)
- **Protractor** : 5.4.0 (Tests E2E)
- **TSLint** : 5.11.0 (Linting TypeScript)
- **Codelyzer** : 4.5.0 (Règles de linting Angular)

---

## Installation et Exécution

### Prérequis
- Node.js (version 8.x ou supérieure)
- npm (version 5.x ou supérieure)
- Angular CLI (version 7.x)

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/BeaAtWork/TPAngular.git
cd TPAngular

# Installer les dépendances
npm install
```

### Exécution

#### Mode Développement
```bash
# Démarrer le serveur de développement
ng serve

# ou
npm start
```

L'application sera accessible à l'adresse : `http://localhost:4200`

#### Mode Production
```bash
# Build pour la production
ng build --prod

# ou
npm run build -- --prod
```

Les fichiers compilés seront dans le dossier `dist/pjAngularTest`

### Tests

#### Tests Unitaires
```bash
ng test
# ou
npm test
```

#### Tests End-to-End
```bash
ng e2e
# ou
npm run e2e
```

### Linting
```bash
ng lint
# ou
npm run lint
```

---

## Configuration

### angular.json

Configuration principale de l'Angular CLI :
- **Projet** : `pjAngularTest`
- **Dossier source** : `src`
- **Préfixe** : `app`
- **Styles** : SCSS
- **Output** : `dist/pjAngularTest`

### tsconfig.json

Configuration TypeScript :
- **Target** : ES2015
- **Module** : ESNext
- **Module Resolution** : Node
- **Strict** : true

### Environnements

Deux fichiers de configuration :
- `src/environments/environment.ts` : Configuration de développement
- `src/environments/environment.prod.ts` : Configuration de production

---

## Bonnes Pratiques Implémentées

### 1. Séparation des Responsabilités
- Les composants gèrent uniquement l'affichage et les interactions
- La logique métier est centralisée dans les services

### 2. Injection de Dépendances
- Utilisation de l'injection de dépendances Angular pour les services
- `AppareilService` est injecté dans les composants qui en ont besoin

### 3. Data Binding
- Utilisation de `[(ngModel)]` pour le two-way data binding
- Utilisation de `[property]` et `(event)` pour le one-way binding

### 4. Directives Structurelles
- `*ngFor` pour itérer sur les listes
- `*ngIf` pour le rendu conditionnel

### 5. Styles Conditionnels
- `[ngClass]` pour appliquer des classes CSS conditionnellement
- `[ngStyle]` pour appliquer des styles dynamiques

### 6. Communication entre Composants
- Via un service partagé (`AppareilService`)
- Passage de données via `@Input()` et `@Output()`

### 7. Gestion des Événements
- `(click)` pour gérer les clics sur les boutons
- Confirmation avant les actions destructives

---

## Diagramme de Flux de Données

```
┌─────────────────┐     
│   AppareilService │────┐
│   (Données)       │    │
└─────────────────┘     │
         │              │
         ▼              ▼
┌─────────────────┐    ┌─────────────────┐
│ AppComponent     │    │ AppareilView     │
│ (Racine)         │    │ Component        │
└─────────────────┘    └─────────────────┘
         │                      │
         ▼                      ▼
┌─────────────────────────────────────────────┐
│               DOM / Interface Utilisateur       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│  │  Boutons     │ │  Liste       │ │  Input   │ │
│  │  Globaux     │ │  Appareils   │ │  Nom     │ │
│  └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────┘
         ▲                      ▲
         │                      │
┌────────┴──────────────────────┴────────────┐
│           Événements Utilisateur               │
│  (Clics, Saisie, Confirmations)                 │
└─────────────────────────────────────────────┘
```

---

## Améliorations Possibles

### 1. Routage
Actuellement, le module de routage est vide. On pourrait ajouter :
```typescript
const routes: Routes = [
  { path: 'appareils', component: AppareilViewComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/appareils', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

### 2. Modèle de Données
Créer une interface TypeScript pour les appareils :
```typescript
interface Appareil {
  name: string;
  status: 'allumé' | 'éteint';
}
```

### 3. Service avec Observables
Utiliser RxJS pour une gestion réactive des données :
```typescript
import { BehaviorSubject } from 'rxjs';

private appareilsSubject = new BehaviorSubject<Appareil[]>([]);
appareils$ = this.appareilsSubject.asObservable();
```

### 4. Authentification Réelle
Implémenter un vrai système d'authentification avec :
- Service d'authentification
- Garde de route (Route Guard)
- Stockage des tokens

### 5. Persistance des Données
- Sauvegarder les appareils dans le localStorage
- Ou utiliser une API backend

### 6. Tests Unitaires
Ajouter des tests pour les composants et services :
```typescript
// Exemple pour AppareilService
it('should switch on all appareils', () => {
  service.switchOnAll();
  expect(service.appareils.every(a => a.status === 'allumé')).toBeTrue();
});
```

### 7. Internationalisation
Ajouter la support de plusieurs langues pour les textes de l'interface.

---

## Résumé des Fichiers Importants

| Fichier | Rôle | Lignes de Code |
|--------|------|----------------|
| `app.module.ts` | Module principal | 30 |
| `app.component.ts` | Composant racine | 40 |
| `appareil.service.ts` | Service de gestion | 37 |
| `appareil.component.ts` | Composant appareil | 44 |
| `appareil-view.component.ts` | Vue liste appareils | 43 |
| `auth.component.ts` | Composant auth | 16 |

---

## Conclusion

TPAngular est une application Angular 7 bien structurée qui démontre les concepts fondamentaux du framework :
- Création de composants
- Utilisation de services
- Data binding
- Directives structurelles et d'attribut
- Gestion des événements
- Styles conditionnels

Le projet est fonctionnel et peut servir de base pour des applications plus complexes. Les améliorations suggérées permettraient d'ajouter des fonctionnalités avancées comme le routage, la persistance des données et une authentification réelle.

---

*Documentation générée à partir des sources du projet - Janvier 2019*
