# Documentation des Services - TPAngular

> **Projet** : TPAngular  
> **Framework** : Angular 7.1.0

---

## Table des Matières

1. [AppareilService](#appareilservice)
2. [Bonnes Pratiques pour les Services](#bonnes-pratiques-pour-les-services)
3. [Améliorations Possibles](#améliorations-possibles)

---

## AppareilService

### Métadonnées

| Propriété | Valeur |
|-----------|--------|
| **Fichier** | `src/app/services/appareil.service.ts` |
| **Type** | Service |
| **Portée** | Application (Singleton) |
| **Injectable** | Oui (par défaut dans Angular) |

### Description

`AppareilService` est un service Angular qui gère la liste des appareils et fournit des méthodes pour modifier leur état. C'est le seul service défini dans l'application.

### Code Source Complet

```typescript
export class AppareilService {
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
}
```

---

## Structure et Propriétés

### Propriétés

| Nom | Type | Description | Valeur Initiale |
|-----|------|-------------|-----------------|
| `appareils` | `Array<{name: string, status: string}>` | Liste des appareils avec leur nom et statut | Voir code ci-dessus |

**Données initiales** :
```typescript
appareils = [
  { name: 'Machine à laver', status: 'éteint' },
  { name: 'frigo', status: 'allumé' },
  { name: 'Ordinateur', status: 'éteint' }
];
```

---

## Méthodes

### `switchOnAll()`

**Description** : Allume tous les appareils en mettant leur statut à `'allumé'`.

**Paramètres** : Aucun

**Retour** : `void`

**Code** :
```typescript
switchOnAll() {
  for (let appareil of this.appareils) {
    appareil.status = 'allumé';
  }
}
```

**Complexité** : O(n) où n est le nombre d'appareils

**Utilisation** :
```typescript
// Dans AppComponent ou AppareilViewComponent
this.appareilService.switchOnAll();
```

---

### `switchOffAll()`

**Description** : Éteint tous les appareils en mettant leur statut à `'éteint'`.

**Paramètres** : Aucun

**Retour** : `void`

**Code** :
```typescript
switchOffAll() {
  for (let appareil of this.appareils) {
    appareil.status = 'éteint';
  }
}
```

**Complexité** : O(n) où n est le nombre d'appareils

**Utilisation** :
```typescript
// Dans AppComponent ou AppareilViewComponent
// Avec confirmation
if (confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
  this.appareilService.switchOffAll();
}
```

---

### `switchOnOne(i: number)`

**Description** : Allume un appareil spécifique en utilisant son index.

**Paramètres** :
| Nom | Type | Description |
|-----|------|-------------|
| `i` | `number` | Index de l'appareil dans le tableau `appareils` |

**Retour** : `void`

**Code** :
```typescript
switchOnOne(i: number) {
  this.appareils[i].status = 'allumé';
}
```

**Complexité** : O(1)

**Utilisation** :
```typescript
// Dans AppareilComponent
onSwitch() {
  if (this.appareilStatus === 'éteint') {
    this.appareilService.switchOnOne(this.index);
  }
}
```

---

### `switchOffOne(i: number)`

**Description** : Éteint un appareil spécifique en utilisant son index.

**Paramètres** :
| Nom | Type | Description |
|-----|------|-------------|
| `i` | `number` | Index de l'appareil dans le tableau `appareils` |

**Retour** : `void`

**Code** :
```typescript
switchOffOne(i: number) {
  this.appareils[i].status = 'éteint';
}
```

**Complexité** : O(1)

**Utilisation** :
```typescript
// Dans AppareilComponent
onSwitch() {
  if (this.appareilStatus === 'allumé') {
    this.appareilService.switchOffOne(this.index);
  }
}
```

---

## Injection et Utilisation

### Enregistrement du Service

Le service est enregistré dans le module `AppModule` :

```typescript
// src/app/app.module.ts
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [AppareilService],  // <-- Enregistrement ici
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Injection dans les Composants

#### Dans AppComponent

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
    // Injection ici
    setTimeout(() => { this.isAuth = true; }, 1000);
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr...')) {
      this.appareilService.switchOffAll();
    }
  }
}
```

#### Dans AppareilComponent

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
    // Injection ici
  }

  onSwitch() {
    if (this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if (this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }
}
```

#### Dans AppareilViewComponent

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

  constructor(private appareilService: AppareilService) {
    // Injection ici
  }

  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if (confirm('Etes-vous sûr...')) {
      this.appareilService.switchOffAll();
    }
  }
}
```

---

## Pattern Singleton

### Fonctionnement

Angular utilise le système d'injection de dépendances pour créer une seule instance du service et la partager entre tous les composants qui l'injectent.

```
┌─────────────────┐       ┌─────────────────┐
│   AppComponent   │──────▶│ AppareilService  │
└─────────────────┘       │   (Instance 1)   │
         │                 └────────┬────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐       ┌─────────────────┐
│AppareilComponent │──────▶│ AppareilService  │
│   (Instance 1)    │       │   (Instance 1)   │
└─────────────────┘       │   **MÊME**        │
         │                 └─────────────────┘
         │
         ▼
┌─────────────────┐       ┌─────────────────┐
│AppareilComponent │──────▶│ AppareilService  │
│   (Instance 2)    │       │   (Instance 1)   │
└─────────────────┘       │   **MÊME**        │
                           └─────────────────┘
```

**Avantage** : Tous les composants partagent la même instance du service et donc les mêmes données.

---

## Flux de Données

### Communication via Service Partagé

```
┌─────────────────┐       ┌─────────────────────────┐
│   AppComponent   │       │    AppareilService        │
│  - ngOnInit()    │──────▶│  appareils = [...]         │
│    this.appareils│       │                            │
│    = service...  │       │  switchOnAll()             │
└─────────────────┘       │  switchOffAll()            │
         │                 │  switchOnOne(i)            │
         │                 │  switchOffOne(i)           │
         ▼                 └────────────┬────────────┘
┌─────────────────┐                  │
│AppareilViewComponent│──────────────┘
│  - ngOnInit()    │◀─────────────────────────┐
│    this.appareils│       ┌─────────────────────────┐
│    = service...  │       │   AppareilComponent       │
└─────────────────┘       │   - onSwitch()            │
         │                 │     └── Appelle service    │
         │                 └─────────────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│                    TEMPLATE (Affichage)                      │
│  - Affiche la liste des appareils                            │
│  - Boutons pour allumer/éteindre                              │
│  - Mise à jour automatique via Angular Change Detection     │
└─────────────────────────────────────────────────────────┘
```

---

## Bonnes Pratiques pour les Services

### ✅ Appliquées dans AppareilService

1. **Single Responsibility Principle** : Le service gère uniquement les appareils
2. **Encapsulation** : Les données et méthodes sont regroupées dans une classe
3. **Réutilisabilité** : Le service est injectable dans n'importe quel composant
4. **Nommage clair** : Les méthodes ont des noms explicites

### ✅ Bonnes pratiques générales

1. **Injection de dépendances** : Utilisation correcte du système DI d'Angular
2. **Singleton** : Une seule instance partagée par toute l'application
3. **Pas de logique UI** : Le service ne contient pas de logique d'interface
4. **Méthodes simples** : Chaque méthode a une responsabilité claire

---

## Améliorations Possibles

### 1. Typage Fort avec Interfaces

**Actuellement** :
```typescript
appareils = [
  { name: 'Machine à laver', status: 'éteint' },
  // ...
];
```

**Amélioration** :
```typescript
// Créer une interface
interface Appareil {
  name: string;
  status: 'allumé' | 'éteint';
}

// Utiliser l'interface
appareils: Appareil[] = [
  { name: 'Machine à laver', status: 'éteint' },
  { name: 'frigo', status: 'allumé' },
  { name: 'Ordinateur', status: 'éteint' }
];
```

**Avantages** :
- Meilleure maintenabilité
- Détection des erreurs à la compilation
- Autocomplétion dans l'IDE

---

### 2. Utilisation de RxJS (Observables)

**Actuellement** : Les composants accèdent directement à la propriété `appareils`.

**Amélioration** :
```typescript
import { BehaviorSubject, Observable } from 'rxjs';

interface Appareil {
  name: string;
  status: 'allumé' | 'éteint';
}

class AppareilService {
  private appareilsSubject = new BehaviorSubject<Appareil[]>([
    { name: 'Machine à laver', status: 'éteint' },
    { name: 'frigo', status: 'allumé' },
    { name: 'Ordinateur', status: 'éteint' }
  ]);

  appareils$: Observable<Appareil[]> = this.appareilsSubject.asObservable();

  private get appareils(): Appareil[] {
    return this.appareilsSubject.value;
  }

  private set appareils(appareils: Appareil[]) {
    this.appareilsSubject.next(appareils);
  }

  switchOnAll() {
    const updated = this.appareils.map(a => ({ ...a, status: 'allumé' }));
    this.appareils = updated;
  }

  switchOffAll() {
    const updated = this.appareils.map(a => ({ ...a, status: 'éteint' }));
    this.appareils = updated;
  }

  switchOnOne(i: number) {
    const updated = [...this.appareils];
    updated[i] = { ...updated[i], status: 'allumé' };
    this.appareils = updated;
  }

  switchOffOne(i: number) {
    const updated = [...this.appareils];
    updated[i] = { ...updated[i], status: 'éteint' };
    this.appareils = updated;
  }
}
```

**Utilisation dans les composants** :
```typescript
// Dans AppComponent
appareils: Appareil[];

constructor(private appareilService: AppareilService) {}

ngOnInit() {
  this.appareilService.appareils$.subscribe(appareils => {
    this.appareils = appareils;
  });
}
```

**Avantages** :
- Programmation réactive
- Meilleure gestion des changements d'état
- Possibilité d'ajouter des opérateurs RxJS (filter, map, etc.)
- Désabonnement automatique avec `async` pipe

---

### 3. Ajout de Méthodes Utilitaires

**Exemples de méthodes à ajouter** :

```typescript
// Récupérer un appareil par index
getAppareil(index: number): Appareil {
  return this.appareils[index];
}

// Récupérer tous les appareils allumés
getAppareilsAllumes(): Appareil[] {
  return this.appareils.filter(a => a.status === 'allumé');
}

// Récupérer tous les appareils éteints
getAppareilsEteints(): Appareil[] {
  return this.appareils.filter(a => a.status === 'éteint');
}

// Compter les appareils allumés
countAppareilsAllumes(): number {
  return this.appareils.filter(a => a.status === 'allumé').length;
}

// Ajouter un appareil
addAppareil(name: string, status: 'allumé' | 'éteint' = 'éteint'): void {
  this.appareils.push({ name, status });
}

// Supprimer un appareil
removeAppareil(index: number): void {
  this.appareils.splice(index, 1);
}

// Basculer l'état d'un appareil (toggle)
toggleAppareil(index: number): void {
  const appareil = this.appareils[index];
  appareil.status = appareil.status === 'allumé' ? 'éteint' : 'allumé';
}
```

---

### 4. Persistance des Données

**Actuellement** : Les données sont stockées en mémoire et perdues au rechargement.

**Amélioration avec localStorage** :

```typescript
import { Injectable } from '@angular/core';

interface Appareil {
  name: string;
  status: 'allumé' | 'éteint';
}

@Injectable({
  providedIn: 'root'  // Disponible dans toute l'application
})
export class AppareilService {
  private readonly STORAGE_KEY = 'tpangular_appareils';

  appareils: Appareil[];

  constructor() {
    this.loadAppareils();
  }

  private loadAppareils(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.appareils = JSON.parse(saved);
    } else {
      // Données par défaut
      this.appareils = [
        { name: 'Machine à laver', status: 'éteint' },
        { name: 'frigo', status: 'allumé' },
        { name: 'Ordinateur', status: 'éteint' }
      ];
      this.saveAppareils();
    }
  }

  private saveAppareils(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.appareils));
  }

  switchOnAll(): void {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.saveAppareils();
  }

  switchOffAll(): void {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.saveAppareils();
  }

  switchOnOne(i: number): void {
    this.appareils[i].status = 'allumé';
    this.saveAppareils();
  }

  switchOffOne(i: number): void {
    this.appareils[i].status = 'éteint';
    this.saveAppareils();
  }

  addAppareil(name: string): void {
    this.appareils.push({ name, status: 'éteint' });
    this.saveAppareils();
  }

  removeAppareil(index: number): void {
    this.appareils.splice(index, 1);
    this.saveAppareils();
  }
}
```

**Avantages** :
- Persistance des données entre les sessions
- Expérience utilisateur améliorée
- Pas besoin de backend

---

### 5. Décorateur @Injectable

**Actuellement** : Le service n'a pas de décorateur `@Injectable()`.

**Amélioration** :
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Disponible dans toute l'application
})
export class AppareilService {
  // ...
}
```

**Avantages** :
- Meilleure pratique Angular
- Permet d'utiliser `providedIn: 'root'` pour un singleton application-wide
- Plus explicite

---

### 6. Gestion des Erreurs

**Amélioration** :

```typescript
switchOnOne(i: number): void {
  if (i < 0 || i >= this.appareils.length) {
    console.error(`Index ${i} hors limites. Nombre d'appareils: ${this.appareils.length}`);
    return;
  }
  this.appareils[i].status = 'allumé';
}

switchOffOne(i: number): void {
  if (i < 0 || i >= this.appareils.length) {
    console.error(`Index ${i} hors limites. Nombre d'appareils: ${this.appareils.length}`);
    return;
  }
  this.appareils[i].status = 'éteint';
}
```

---

### 7. Logging

**Amélioration** :

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private debugMode = false;

  constructor() {
    // Activer le mode debug en développement
    if (!environment.production) {
      this.debugMode = true;
    }
  }

  private log(message: string): void {
    if (this.debugMode) {
      console.log(`[AppareilService] ${message}`);
    }
  }

  switchOnAll(): void {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.log(`Tous les appareils ont été allumés`);
  }

  switchOnOne(i: number): void {
    if (i < 0 || i >= this.appareils.length) {
      this.log(`Erreur: Index ${i} hors limites`);
      return;
    }
    this.appareils[i].status = 'allumé';
    this.log(`Appareil ${this.appareils[i].name} allumé`);
  }
}
```

---

## Tests Unitaires

### Exemple de Tests pour AppareilService

```typescript
// src/app/services/appareil.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { AppareilService } from './appareil.service';

describe('AppareilService', () => {
  let service: AppareilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppareilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with 3 appareils', () => {
    expect(service.appareils.length).toBe(3);
  });

  it('should have correct initial appareils', () => {
    expect(service.appareils[0].name).toBe('Machine à laver');
    expect(service.appareils[0].status).toBe('éteint');
    expect(service.appareils[1].name).toBe('frigo');
    expect(service.appareils[1].status).toBe('allumé');
    expect(service.appareils[2].name).toBe('Ordinateur');
    expect(service.appareils[2].status).toBe('éteint');
  });

  describe('switchOnAll', () => {
    it('should switch all appareils to allumé', () => {
      service.switchOnAll();
      expect(service.appareils.every(a => a.status === 'allumé')).toBeTrue();
    });

    it('should modify the original array', () => {
      const initialAppareils = service.appareils;
      service.switchOnAll();
      expect(service.appareils).toBe(initialAppareils);
    });
  });

  describe('switchOffAll', () => {
    it('should switch all appareils to éteint', () => {
      service.switchOffAll();
      expect(service.appareils.every(a => a.status === 'éteint')).toBeTrue();
    });
  });

  describe('switchOnOne', () => {
    it('should switch appareil at index 0 to allumé', () => {
      service.switchOnOne(0);
      expect(service.appareils[0].status).toBe('allumé');
    });

    it('should switch appareil at index 1 to allumé', () => {
      service.switchOnOne(1);
      expect(service.appareils[1].status).toBe('allumé');
    });

    it('should not modify other appareils', () => {
      service.switchOnOne(0);
      expect(service.appareils[1].status).toBe('allumé');
      expect(service.appareils[2].status).toBe('éteint');
    });
  });

  describe('switchOffOne', () => {
    it('should switch appareil at index 1 to éteint', () => {
      service.switchOffOne(1);
      expect(service.appareils[1].status).toBe('éteint');
    });

    it('should not modify other appareils', () => {
      service.switchOffOne(1);
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('éteint');
    });
  });
});
```

---

## Diagramme de Classe

```
┌─────────────────────────────────────────────────────────────┐
│                        AppareilService                          │
├─────────────────────────────────────────────────────────────┤
│  - appareils: Array<{name: string, status: string}>             │
├─────────────────────────────────────────────────────────────┤
│  + switchOnAll(): void                                           │
│  + switchOffAll(): void                                          │
│  + switchOnOne(i: number): void                                  │
│  + switchOffOne(i: number): void                                 │
└─────────────────────────────────────────────────────────────┘
         │
         │ Injecté dans
         ▼
┌─────────────────┐ ┌─────────────────────────┐ ┌─────────────────┐
│  AppComponent    │ │   AppareilViewComponent   │ │ AppareilComponent│
│  (Racine)        │ │   (Liste)                 │ │ (Individuel)    │
└─────────────────┘ └─────────────────────────┘ └─────────────────┘
```

---

## Conclusion

`AppareilService` est un service bien conçu qui démontre les principes fondamentaux des services Angular :

**Points forts** :
- ✅ Séparation claire des responsabilités
- ✅ Utilisation correcte du pattern Singleton
- ✅ Méthodes simples et bien nommées
- ✅ Injection de dépendances correcte
- ✅ Partage d'état entre composants

**Axes d'amélioration** :
- ⚠️ Ajouter le typage fort avec des interfaces
- ⚠️ Utiliser RxJS pour une gestion réactive
- ⚠️ Ajouter le décorateur `@Injectable`
- ⚠️ Implémenter la persistance des données
- ⚠️ Ajouter des tests unitaires
- ⚠️ Ajouter la gestion des erreurs
- ⚠️ Ajouter du logging

**Recommandation** : Commencer par ajouter le typage fort et le décorateur `@Injectable`, puis implémenter la persistance avec localStorage pour améliorer l'expérience utilisateur.
