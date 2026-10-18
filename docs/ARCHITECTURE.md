# Architecture Technique - TPAngular

> **Projet** : TPAngular  
> **Framework** : Angular 7.1.0  
> **Type** : Single Page Application (SPA)

---

## Vue d'Ensemble

TPAngular est une application web développée avec Angular 7 qui implémente un système de gestion d'appareils électroniques. L'architecture suit les bonnes pratiques Angular avec une séparation claire entre les composants, les services et les modules.

---

## Diagramme d'Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              NAVIGATEUR WEB                                │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         ANGULAR APPLICATION                                │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                           AppModule                                    │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │ │
│  │  │   Declarations   │  │     Imports      │  │    Providers    │    │ │
│  │  │  - AppComponent  │  │  - BrowserModule │  │  - AppareilSvc  │    │ │
│  │  │  - AppareilCmp   │  │  - AppRoutingMod │  │                 │    │ │
│  │  │  - AuthCmp       │  │  - FormsModule   │  │                 │    │ │
│  │  │  - AppareilView  │  │                 │  │                 │    │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘    │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                         AppComponent (Root)                           │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                      Template: index.html                          │ │ │
│  │  │  <app-root>                                                        │ │ │
│  │  │    └── <app-appareil-view>                                         │ │ │
│  │  │          └── *ngFor: <app-appareil> (x3)                          │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                      AppareilService (Singleton)                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │  appareils: Array<{name: string, status: string}>                  │ │ │
│  │  │  - Machine à laver (éteint)                                         │ │ │
│  │  │  - frigo (allumé)                                                  │ │ │
│  │  │  - Ordinateur (éteint)                                             │ │ │
│  │  │                                                                     │ │ │
│  │  │  Methods:                                                          │ │ │
│  │  │  - switchOnAll()                                                   │ │ │
│  │  │  - switchOffAll()                                                  │ │ │
│  │  │  - switchOnOne(index)                                              │ │ │
│  │  │  - switchOffOne(index)                                             │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Structure des Composants

### Hiérarchie des Composants

```
AppComponent (app-root)
└── AppareilViewComponent (app-appareil-view)
    ├── AppareilComponent (app-appareil) [index=0]
    │   ├── Template: <li> avec boutons Allumer/Eteindre
    │   └── Style: vert/rouge selon statut
    ├── AppareilComponent (app-appareil) [index=1]
    └── AppareilComponent (app-appareil) [index=2]
```

### Arbre de Dépendances

```
AppModule
├── BrowserModule
├── AppRoutingModule
├── FormsModule
└── Providers
    └── AppareilService (Singleton)
        ├── Injected in: AppComponent
        └── Injected in: AppareilComponent
```

---

## Flux de Données

### Flux Descendant (Parent → Enfant)

```
AppComponent
    │
    ▼
AppareilViewComponent
    │
    ▼ (via *ngFor et @Input())
AppareilComponent
    │
    ▼
Template HTML (Affichage)
```

**Données transmises** :
- `appareilName: string`
- `appareilStatus: string`
- `index: number`

### Flux Ascendant (Enfant → Parent via Service)

```
AppareilComponent
    │
    ▼ (Appel de méthode du service)
AppareilService
    │
    ▼ (Modification des données)
    │
    ▼ (Mise à jour automatique)
AppareilViewComponent
    │
    ▼ (Re-rendu via Angular Change Detection)
Template HTML
```

### Pattern Observer

Bien que non implémenté avec RxJS dans la version actuelle, le pattern observer est utilisé via :
- **Service Singleton** : `AppareilService` est un singleton partagé
- **Référence partagée** : Tous les composants pointent vers le même tableau `appareils`

---

## Communication entre Composants

### Méthode 1: Service Partagé (Utilisée)

```typescript
// Dans AppareilService
appareils = [...] // Tableau partagé

// Dans AppComponent
constructor(private appareilService: AppareilService) {
  this.appareils = this.appareilService.appareils;
}

// Dans AppareilComponent
constructor(private appareilService: AppareilService) {}

onSwitch() {
  this.appareilService.switchOffOne(this.index);
}
```

**Avantages** :
- Simple à implémenter
- Pas besoin de gérer les événements manuellement
- Données centralisées

### Méthode 2: @Input() et @Output() (Partiellement utilisée)

```typescript
// Parent → Enfant
<app-appareil 
  [appareilName]="appareil.name" 
  [appareilStatus]="appareil.status" 
  [index]="i">
</app-appareil>

// Enfant → Parent (non implémenté, mais possible)
@Output() statusChanged = new EventEmitter<{index: number, newStatus: string}>();
```

---

## Cycle de Vie des Composants

### AppComponent

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Constructor  │────▶│   ngOnInit   │────▶│   Render    │
│ - Injecte    │     │ - Récupère   │     │ - Affiche   │
│   AppareilSvc│     │   appareils  │     │   la vue    │
└─────────────┘     └─────────────┘     └─────────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ setTimeout  │
                               │ (1 seconde) │
                               └─────────────┘
                                      │
                                      ▼
                               ┌─────────────┐
                               │ isAuth = true│
                               └─────────────┘
```

### AppareilViewComponent

```
┌─────────────┐     ┌─────────────┐
│ Constructor  │────▶│   ngOnInit   │────▶│   Render    │
│ - Injecte    │     │ - Récupère   │     │ - Affiche   │
│   AppareilSvc│     │   appareils  │     │   la liste  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### AppareilComponent

```
┌─────────────┐     ┌─────────────┐
│ Constructor  │────▶│   ngOnInit   │
│ - Injecte    │     │ (vide)       │
│   AppareilSvc│     └─────────────┘
└─────────────┘           │
                           ▼
                    ┌─────────────┐
                    │   Événements │
                    │   (click)    │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   onSwitch() │
                    │ - Appelle    │
                    │   service    │
                    └─────────────┘
```

---

## Gestion d'État

### État Actuel

L'état de l'application est géré de manière centralisée dans `AppareilService` :

```typescript
// État dans AppareilService
{
  appareils: [
    { name: 'Machine à laver', status: 'éteint' },
    { name: 'frigo', status: 'allumé' },
    { name: 'Ordinateur', status: 'éteint' }
  ]
}

// État dans AppComponent
{
  isAuth: false, // → true après 1 seconde
  appareils: [...] // Référence au tableau du service
}
```

### Flux d'État

```
┌─────────────────┐     
│   État Initial   │────▶┌─────────────────┐
│   (AppareilSvc)  │     │   AppComponent   │
└─────────────────┘     │   ngOnInit()     │
         │               └─────────┬───────┘
         │                         │
         ▼                         ▼
┌─────────────────┐     ┌─────────────────┐
│   setTimeout     │     │   AppareilView   │
│   (1s)           │     │   ngOnInit()     │
└─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│ isAuth = true    │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Boutons activés  │
└─────────────────┘
```

---

## Binding de Données

### Types de Binding Utilisés

| Type | Syntaxe | Exemple | Utilisation |
|------|---------|---------|-------------|
| Interpolation | `{{ expression }}` | `{{ appareilName }}` | Afficher des valeurs |
| Property Binding | `[property]` | `[ngClass]`, `[ngStyle]` | Lier des propriétés |
| Event Binding | `(event)` | `(click)` | Gérer les événements |
| Two-way Binding | `[(ngModel)]` | `[(ngModel)]="appareilName"` | Synchronisation bidirectionnelle |

### Exemples Concrets

```html
<!-- Interpolation -->
<h4>Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}</h4>

<!-- Property Binding -->
<li [ngClass]="{'list-group-item-success': appareilStatus === 'allumé'}">
<h4 [ngStyle]="{color: getColor()}">...</h4>

<!-- Event Binding -->
<button (click)="onSwitch()">Allumer</button>

<!-- Two-way Binding -->
<input type="text" [(ngModel)]="appareilName">

<!-- Structural Directives -->
<app-appareil *ngFor="let appareil of appareils; let i = index">
<button *ngIf="appareilStatus === 'éteint'" (click)="onSwitch()">Allumer</button>
```

---

## Directives Utilisées

### Directives Structurelles

| Directive | Utilisation | Exemple |
|-----------|-------------|---------|
| `*ngFor` | Itération sur les listes | `*ngFor="let a of appareils"` |
| `*ngIf` | Rendu conditionnel | `*ngIf="appareilStatus === 'éteint'"` |

### Directives d'Attribut

| Directive | Utilisation | Exemple |
|-----------|-------------|---------|
| `ngClass` | Classes CSS conditionnelles | `[ngClass]="{...}"` |
| `ngStyle` | Styles dynamiques | `[ngStyle]="{color: getColor()}"` |
| `ngModel` | Two-way data binding | `[(ngModel)]="appareilName"` |

### Directives de Bootstrap

| Classe | Utilisation |
|--------|-------------|
| `container` | Conteneur principal |
| `row`, `col-xs-12` | Grille responsive |
| `list-group`, `list-group-item` | Liste stylisée |
| `list-group-item-success` | Style pour les éléments allumés |
| `list-group-item-danger` | Style pour les éléments éteints |
| `btn`, `btn-success`, `btn-danger` | Boutons stylisés |
| `form-control` | Champ de formulaire |

---

## Services

### AppareilService

**Type** : Service Singleton  
**Portée** : Application (disponible partout via injection)

#### Responsabilités
1. **Stockage des données** : Contient la liste des appareils
2. **Logique métier** : Méthodes pour modifier l'état des appareils
3. **Partage d'état** : Fournit une source unique de vérité

#### Méthodes Publiques

| Méthode | Description | Complexité |
|---------|-------------|------------|
| `switchOnAll()` | Allume tous les appareils | O(n) |
| `switchOffAll()` | Éteint tous les appareils | O(n) |
| `switchOnOne(i)` | Allume un appareil spécifique | O(1) |
| `switchOffOne(i)` | Éteint un appareil spécifique | O(1) |

#### Injection de Dépendances

```typescript
// Dans AppComponent
constructor(private appareilService: AppareilService) {}

// Dans AppareilComponent  
constructor(private appareilService: AppareilService) {}
```

---

## Routage

### État Actuel

Le module de routage est actuellement vide :

```typescript
const routes: Routes = [];
```

### Architecture de Routage Proposée

```typescript
const routes: Routes = [
  {
    path: 'appareils',
    component: AppareilViewComponent,
    canActivate: [AuthGuard] // Garde pour vérifier l'authentification
  },
  {
    path: 'appareils/:id',
    component: AppareilDetailComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: '/appareils',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

---

## Gestion des Événements

### Événements Utilisateur

| Événement | Composant | Action |
|-----------|-----------|--------|
| `click` | Bouton Allumer | `onSwitch()` → `switchOnOne()` |
| `click` | Bouton Eteindre | `onSwitch()` → `switchOffOne()` |
| `click` | Tout allumer | `onAllumer()` → `switchOnAll()` |
| `click` | Tout éteindre | `onEteindre()` → `confirm()` → `switchOffAll()` |
| `input` | Champ nom | `[(ngModel)]` → mise à jour automatique |

### Confirmation avant Action

```typescript
onEteindre() {
  if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
    this.appareilService.switchOffAll();
  } else {
    return null;
  }
}
```

---

## Styles et UI

### Framework CSS
- **Bootstrap 3.3.7** : Utilisé pour la mise en page et les composants UI

### Styles Personnalisés
- **SCSS** : Utilisé pour les styles des composants
- **Classe dynamique** : `getColor()` retourne 'green' ou 'red'
- **Classes Bootstrap** : `list-group-item-success`, `list-group-item-danger`

### Structure de la Page

```
┌─────────────────────────────────────────────────────────┐
│  AppComponent                                              │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  AppareilViewComponent                                 │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  <h2>Mes appareils</h2>                           │ │ │
│  │  │  ┌─────────────────────────────────────────────┐ │ │ │
│  │  │  │  <ul class="list-group">                       │ │ │ │
│  │  │  │    <app-appareil> (x3)                          │ │ │ │
│  │  │  │      - Machine à laver (éteint)                │ │ │ │
│  │  │  │      - frigo (allumé)                           │ │ │ │
│  │  │  │      - Ordinateur (éteint)                      │ │ │ │
│  │  │  │  </ul>                                          │ │ │ │
│  │  │  └─────────────────────────────────────────────┘ │ │ │
│  │  │  [Tout allumer] [Tout éteindre]                   │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Configuration Technique

### Angular CLI Configuration (angular.json)

```json
{
  "projects": {
    "pjAngularTest": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/pjAngularTest",
            "styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "esnext",
    "strict": true,
    "moduleResolution": "node"
  }
}
```

---

## Dépendances

### Dépendances de Production

| Package | Version | Utilisation |
|---------|---------|-------------|
| @angular/core | ~7.1.0 | Framework Angular |
| @angular/forms | ~7.1.0 | Formulaires et ngModel |
| @angular/router | ~7.1.0 | Routage |
| rxjs | ~6.3.3 | Programmation réactive |
| bootstrap | ^3.3.7 | Framework CSS |
| core-js | ^2.5.4 | Polyfills |
| zone.js | ~0.8.26 | Gestion des zones |

### Dépendances de Développement

| Package | Version | Utilisation |
|---------|---------|-------------|
| @angular/cli | ~7.1.4 | CLI Angular |
| typescript | ~3.1.6 | Compilateur TypeScript |
| karma | ~3.1.1 | Runner de tests |
| jasmine | ~2.99.1 | Framework de test |
| protractor | ~5.4.0 | Tests E2E |
| tslint | ~5.11.0 | Linting TypeScript |

---

## Performances

### Points Positifs
- **Service Singleton** : Pas de duplication des données
- **Change Detection** : Angular gère automatiquement la détection des changements
- **Lazy Loading** : Non implémenté (pas de routage complexe)

### Optimisations Possibles
1. **OnPush Change Detection** : Utiliser `ChangeDetectionStrategy.OnPush` pour les composants
2. **TrackBy** : Ajouter `trackBy` dans les `*ngFor` pour optimiser le rendu
3. **RxJS** : Utiliser des Observables pour une gestion réactive des données
4. **Lazy Loading** : Charger les modules paresseusement

---

## Sécurité

### Points à Améliorer
1. **Sanitization** : Utiliser `DomSanitizer` pour les contenus dynamiques
2. **XSS** : Angular protège par défaut contre XSS via l'interpolation
3. **CSRF** : À implémenter si une API backend est ajoutée
4. **Authentification** : Actuellement simulée, à implémenter correctement

---

## Conclusion

L'architecture de TPAngular suit les bonnes pratiques Angular :
- **Séparation des responsabilités** : Composants vs Services
- **Injection de dépendances** : Utilisation du système DI d'Angular
- **Data Binding** : Communication efficace entre les composants
- **Modularité** : Organisation claire du code

**Améliorations recommandées** :
1. Implémenter le routage
2. Utiliser RxJS pour une gestion réactive des données
3. Ajouter une vraie authentification
4. Persister les données (localStorage ou API)
5. Ajouter des tests unitaires et E2E
6. Implémenter OnPush Change Detection
