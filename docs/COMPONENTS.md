# Documentation des Composants - TPAngular

> **Projet** : TPAngular  
> **Framework** : Angular 7.1.0

---

## Table des Matières

1. [AppComponent](#appcomponent)
2. [AppareilComponent](#appareilcomponent)
3. [AppareilViewComponent](#appareilviewcomponent)
4. [AuthComponent](#authcomponent)
5. [MonPremierComponent](#monpremiercomponent)

---

## AppComponent

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `src/app/app.component.ts` |
| **Sélecteur** | `app-root` |
| **Template** | `src/app/app.component.html` |
| **Styles** | `src/app/app.component.scss` |
| **Spécifications** | `src/app/app.component.spec.ts` |

### Description

Composant racine de l'application. Il initialise l'application et gère l'état global d'authentification. Il contient également la logique pour allumer et éteindre tous les appareils.

### Code Source

```typescript
import {Component, OnInit} from '@angular/core';
import {AppareilService} from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isAuth = false;

  appareils: any[];

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 1000
    );
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }
}
```

### Propriétés

| Nom | Type | Description | Valeur Initiale |
|-----|------|-------------|-----------------|
| `isAuth` | `boolean` | Indique si l'utilisateur est authentifié | `false` |
| `appareils` | `any[]` | Liste des appareils récupérée du service | `undefined` (initialisée dans ngOnInit) |

### Méthodes

#### `constructor(appareilService: AppareilService)`

**Description** : Constructeur du composant. Injecte le service `AppareilService` et initialise un timer pour simuler l'authentification.

**Paramètres** :
- `appareilService` : Instance du service de gestion des appareils

**Code** :
```typescript
constructor(private appareilService: AppareilService) {
  setTimeout(
    () => {
      this.isAuth = true;
    }, 1000
  );
}
```

#### `ngOnInit()`

**Description** : Méthode du cycle de vie Angular appelée après l'initialisation du composant. Récupère la liste des appareils depuis le service.

**Code** :
```typescript
ngOnInit() {
  this.appareils = this.appareilService.appareils;
}
```

#### `onAllumer()`

**Description** : Allume tous les appareils en appelant la méthode correspondante du service.

**Code** :
```typescript
onAllumer() {
  this.appareilService.switchOnAll();
}
```

#### `onEteindre()`

**Description** : Éteint tous les appareils après confirmation de l'utilisateur.

**Retour** : `null` si l'utilisateur annule, sinon rien

**Code** :
```typescript
onEteindre() {
  if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
    this.appareilService.switchOffAll();
  } else {
    return null;
  }
}
```

### Template

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <app-appareil-view></app-appareil-view>
    </div>
  </div>
</div>
```

**Description** :
- Utilise Bootstrap pour la mise en page (grille responsive)
- Contient uniquement le composant `app-appareil-view`
- Les boutons de contrôle global sont dans `AppareilViewComponent`, pas ici

### Styles

Fichier : `src/app/app.component.scss`  
**Contenu** : Non spécifié (vide ou hérité de Bootstrap)

### Cycle de Vie

```
1. Constructor()
   └── Injecte AppareilService
   └── Lance setTimeout (1000ms)
2. ngOnInit()
   └── Récupère appareils depuis le service
3. Après 1000ms
   └── isAuth = true
4. Détection de changements Angular
   └── Met à jour l'affichage
```

---

## AppareilComponent

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `src/app/appareil/appareil.component.ts` |
| **Sélecteur** | `app-appareil` |
| **Template** | `src/app/appareil/appareil.component.html` |
| **Styles** | `src/app/appareil/appareil.component.scss` |
| **Spécifications** | `src/app/appareil/appareil.component.spec.ts` |

### Description

Composant qui affiche un appareil individuel avec son nom, son statut, et des boutons pour changer son état.

### Code Source

```typescript
import {Component, Input, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() index: number;

  constructor(private appareilService: AppareilService) {
  }

  ngOnInit() {
  }

  getName() {
    return this.appareilName;
  }

  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    if (this.appareilStatus === 'allumé') {
      return 'green';
    } else if (this.appareilStatus === 'teint') {
      return 'red';
    }
  }

  onSwitch() {
    if (this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if (this.appareilStatus === 'teint') {
      this.appareilService.switchOnOne(this.index);
    }
  }
}
```

### Propriétés

| Nom | Type | Description | Décorateur |
|-----|------|-------------|------------|
| `appareilName` | `string` | Nom de l'appareil à afficher | `@Input()` |
| `appareilStatus` | `string` | Statut de l'appareil ('allumé' ou 'éteint') | `@Input()` |
| `index` | `number` | Index de l'appareil dans la liste | `@Input()` |

### Méthodes

#### `constructor(appareilService: AppareilService)`

**Description** : Constructeur du composant. Injecte le service `AppareilService`.

**Paramètres** :
- `appareilService` : Instance du service de gestion des appareils

#### `ngOnInit()`

**Description** : Méthode du cycle de vie appelée après l'initialisation. Actuellement vide.

#### `getName()`

**Description** : Retourne le nom de l'appareil.

**Retour** : `string` - Le nom de l'appareil

**Code** :
```typescript
getName() {
  return this.appareilName;
}
```

#### `getStatus()`

**Description** : Retourne le statut de l'appareil.

**Retour** : `string` - Le statut ('allumé' ou 'éteint')

**Code** :
```typescript
getStatus() {
  return this.appareilStatus;
}
```

#### `getColor()`

**Description** : Retourne la couleur à appliquer selon le statut de l'appareil.

**Retour** : `string` - 'green' si allumé, 'red' si éteint

**Code** :
```typescript
getColor() {
  if (this.appareilStatus === 'allumé') {
    return 'green';
  } else if (this.appareilStatus === 'éteint') {
    return 'red';
  }
}
```

#### `onSwitch()`

**Description** : Bascule l'état de l'appareil (allumé ↔ éteint) en appelant la méthode appropriée du service.

**Code** :
```typescript
onSwitch() {
  if (this.appareilStatus === 'allumé') {
    this.appareilService.switchOffOne(this.index);
  } else if (this.appareilStatus === 'éteint') {
    this.appareilService.switchOnOne(this.index);
  }
}
```

### Template

```html
<li [ngClass]="{'list-group-item': true,
                'list-group-item-success': appareilStatus === 'allumé',
                'list-group-item-danger': appareilStatus === 'éteint'}">

  <h4 [ngStyle]="{color: getColor()}">Appareil : {{ appareilName }} -- Statut : {{ getStatus() }}</h4>
  <input type="text" class="form-control" [(ngModel)]="appareilName">

  <button class="btn btn-success"
          *ngIf="appareilStatus === 'éteint'"
          (click)="onSwitch()">Allumer
  </button>
  <button class="btn btn-danger"
          *ngIf="appareilStatus === 'allumé'"
          (click)="onSwitch()">Eteindre
  </button>

</li>
```

**Description** :
- `<li>` avec classes Bootstrap conditionnelles
- `<h4>` avec couleur dynamique via `[ngStyle]`
- Champ de texte avec two-way binding `[(ngModel)]`
- Boutons conditionnels avec `*ngIf`
- Gestion des clics avec `(click)`

### Styles

Fichier : `src/app/appareil/appareil.component.scss`  
**Contenu** : Non spécifié (vide ou hérité de Bootstrap)

### Utilisation

```html
<!-- Dans AppareilViewComponent -->
<app-appareil 
  *ngFor="let appareil of appareils; let i = index"
  [appareilName]="appareil.name"
  [appareilStatus]="appareil.status"
  [index]="i">
</app-appareil>
```

---

## AppareilViewComponent

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `src/app/appareil-view/appareil-view.component.ts` |
| **Sélecteur** | `app-appareil-view` |
| **Template** | `src/app/appareil-view/appareil-view.component.html` |
| **Styles** | `src/app/appareil-view/appareil-view.component.scss` |
| **Spécifications** | `src/app/appareil-view/appareil-view.component.spec.ts` |

### Description

Composant qui affiche la liste complète des appareils avec des boutons pour allumer ou éteindre tous les appareils d'un coup.

### Code Source

```typescript
import {Component, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

  appareils: any[];

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 1000
    );
  });

  constructor(private appareilService: AppareilService) {
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }
}
```

### Propriétés

| Nom | Type | Description | Valeur Initiale |
|-----|------|-------------|-----------------|
| `appareils` | `any[]` | Liste des appareils | `undefined` (initialisée dans ngOnInit) |
| `lastUpdate` | `Promise<Date>` | Promise qui résout après 1 seconde avec la date actuelle | Créée dans le constructeur |

### Méthodes

#### `constructor(appareilService: AppareilService)`

**Description** : Constructeur du composant. Injecte le service `AppareilService` et initialise la promise `lastUpdate`.

**Paramètres** :
- `appareilService` : Instance du service de gestion des appareils

**Code** :
```typescript
constructor(private appareilService: AppareilService) {
  this.lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 1000
    );
  });
}
```

#### `ngOnInit()`

**Description** : Récupère la liste des appareils depuis le service.

**Code** :
```typescript
ngOnInit() {
  this.appareils = this.appareilService.appareils;
}
```

#### `onAllumer()`

**Description** : Allume tous les appareils.

**Code** :
```typescript
onAllumer() {
  this.appareilService.switchOnAll();
}
```

#### `onEteindre()`

**Description** : Éteint tous les appareils après confirmation.

**Retour** : `null` si annulé

**Code** :
```typescript
onEteindre() {
  if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
    this.appareilService.switchOffAll();
  } else {
    return null;
  }
}
```

### Template

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h2>Mes appareils</h2>
      <ul class="list-group">
        <app-appareil *ngFor="let appareil of appareils; let i = index"
                      [appareilName]="appareil.name"
                      [appareilStatus]="appareil.status"
                      [index]="i"></app-appareil>
      </ul>
    </div>
  </div>
  <button class="btn btn-success"
          [disabled]="!isAuth"
          (click)="onAllumer()">Tout allumer
  </button>
  <button class="btn btn-danger"
          [disabled]="!isAuth"
          (click)="onEteindre()">Tout éteindre
  </button>
</div>
```

**Description** :
- Structure Bootstrap (container, row, col-xs-12)
- Titre "Mes appareils"
- Liste des appareils avec `*ngFor`
- Boutons de contrôle global avec `[disabled]` lié à `isAuth`

**Note** : La propriété `isAuth` est utilisée dans le template mais n'est pas définie dans le composant. Elle devrait être définie ou le binding devrait être corrigé.

### Styles

Fichier : `src/app/appareil-view/appareil-view.component.scss`  
**Contenu** : Non spécifié (vide ou hérité de Bootstrap)

---

## AuthComponent

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `src/app/auth/auth.component.ts` |
| **Sélecteur** | `app-auth` |
| **Template** | `src/app/auth/auth.component.html` |
| **Styles** | `src/app/auth/auth.component.scss` |
| **Spécifications** | `src/app/auth/auth.component.spec.ts` |

### Description

Composant d'authentification. Actuellement non utilisé dans l'application (déclaré mais pas instancié).

### Code Source

```typescript
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
```

### Propriétés

Aucune propriété définie.

### Méthodes

#### `constructor()`

**Description** : Constructeur vide.

#### `ngOnInit()`

**Description** : Méthode du cycle de vie vide.

### Template

```html
<p>
  auth works!
</p>
```

**Description** : Template minimal pour vérifier que le composant fonctionne.

### Styles

Fichier : `src/app/auth/auth.component.scss`  
**Contenu** : Non spécifié

---

## MonPremierComponent

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | Mentionné dans `app.module.ts` mais non trouvé |
| **Sélecteur** | Non disponible |
| **Statut** | **Manquant** |

### Description

Ce composant est référencé dans les déclarations de `AppModule` mais le fichier correspondant n'existe pas dans le projet. Il a probablement été supprimé ou renommé.

### Action Recommandée

1. **Supprimer la référence** dans `app.module.ts` si le composant n'est plus nécessaire :
```typescript
// Dans app.module.ts, supprimer MonPremierComponent des declarations
@NgModule({
  declarations: [
    AppComponent,
    // MonPremierComponent,  // À supprimer
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent
  ],
  // ...
})
```

2. **Ou créer le composant** si nécessaire :
```bash
ng generate component mon-premier
```

---

## Résumé Comparatif

| Composant | Fichier | Sélecteur | Lignes | Complexité | Utilisation |
|-----------|--------|-----------|--------|------------|-------------|
| AppComponent | app.component.ts | app-root | 40 | Moyenne | Racine |
| AppareilComponent | appareil.component.ts | app-appareil | 44 | Moyenne | Appareil individuel |
| AppareilViewComponent | appareil-view.component.ts | app-appareil-view | 43 | Moyenne | Liste des appareils |
| AuthComponent | auth.component.ts | app-auth | 16 | Faible | Non utilisée |
| MonPremierComponent | **Manquant** | - | - | - | **Erreur** |

---

## Bonnes Pratiques Observées

### ✅ Bien Fait

1. **Séparation des responsabilités** : Chaque composant a une responsabilité claire
2. **Injection de dépendances** : Utilisation correcte de l'injection pour les services
3. **Data Binding** : Utilisation appropriée de `[(ngModel)]`, `[property]`, `(event)`
4. **Directives** : Utilisation correcte de `*ngFor` et `*ngIf`
5. **Styles conditionnels** : Utilisation de `[ngClass]` et `[ngStyle]`
6. **Confirmation utilisateur** : Utilisation de `confirm()` avant les actions destructives

### ⚠️ À Améliorer

1. **Typage fort** : Utiliser des interfaces TypeScript au lieu de `any[]`
   ```typescript
   // Au lieu de :
   appareils: any[];
   
   // Utiliser :
   interface Appareil {
     name: string;
     status: 'allumé' | 'éteint';
   }
   appareils: Appareil[];
   ```

2. **Propriété manquante** : `isAuth` est utilisée dans le template de `AppareilViewComponent` mais n'est pas définie

3. **Composant manquant** : `MonPremierComponent` est référencé mais n'existe pas

4. **Code dupliqué** : `onAllumer()` et `onEteindre()` sont définis dans `AppComponent` et `AppareilViewComponent`

5. **Tests** : Les fichiers `.spec.ts` existent mais sont probablement vides

---

## Diagramme de Communication

```
┌─────────────────┐       ┌─────────────────────────┐       ┌─────────────────┐
│   AppComponent   │──────▶│    AppareilViewComponent  │──────▶│ AppareilService │
│   (Racine)       │       │    (Liste appareils)       │       │   (Singleton)    │
└─────────────────┘       └─────────────────────────┘       └─────────────────┘
         │                         │                               │
         │                         ▼                               │
         │               ┌─────────────────────────┐                   │
         │               │   AppareilComponent      │                   │
         │               │   (x3 pour chaque        │                   │
         │               │    appareil)             │                   │
         │               └─────────────────────────┘                   │
         │                         │                               │
         └─────────────────────────┼───────────────────────────────┘
                                   │
                                   ▼
                         ┌─────────────────────────┐
                         │      AppareilService     │
                         │  - appareils[]           │
                         │  - switchOnAll()         │
                         │  - switchOffAll()        │
                         │  - switchOnOne()         │
                         │  - switchOffOne()        │
                         └─────────────────────────┘
```

---

## Conclusion

Les composants de TPAngular sont bien structurés et démontrent une bonne compréhension des concepts Angular :
- Création et utilisation de composants
- Injection de dépendances
- Data binding
- Directives structurelles et d'attribut
- Communication entre composants via services

**Points forts** :
- Architecture claire et modulaire
- Code bien organisé
- Utilisation correcte des fonctionnalités Angular

**Axes d'amélioration** :
- Corriger les références manquantes (MonPremierComponent)
- Ajouter le typage fort avec des interfaces
- Supprimer la duplication de code
- Implémenter les tests unitaires
