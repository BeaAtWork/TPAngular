import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppareilComponent } from './appareil.component';
import { AppareilService } from '../services/appareil.service';

describe('AppareilComponent', () => {
  let component: AppareilComponent;
  let fixture: ComponentFixture<AppareilComponent>;
  let appareilService: AppareilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppareilComponent],
      providers: [AppareilService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilComponent);
    component = fixture.componentInstance;
    appareilService = TestBed.inject(AppareilService);
    
    // Set default input values
    component.appareilName = 'Test Appareil';
    component.appareilStatus = 'éteint';
    component.index = 0;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have appareilName input', () => {
    expect(component.appareilName).toBe('Test Appareil');
  });

  it('should have appareilStatus input', () => {
    expect(component.appareilStatus).toBe('éteint');
  });

  it('should have index input', () => {
    expect(component.index).toBe(0);
  });

  it('should inject AppareilService', () => {
    expect(appareilService).toBeTruthy();
    expect(appareilService).toBeInstanceOf(AppareilService);
  });

  describe('getName', () => {
    it('should return the appareilName', () => {
      expect(component.getName()).toBe('Test Appareil');
    });

    it('should return updated appareilName after change', () => {
      component.appareilName = 'Nouvel Appareil';
      expect(component.getName()).toBe('Nouvel Appareil');
    });
  });

  describe('getStatus', () => {
    it('should return the appareilStatus', () => {
      expect(component.getStatus()).toBe('éteint');
    });

    it('should return allumé status', () => {
      component.appareilStatus = 'allumé';
      expect(component.getStatus()).toBe('allumé');
    });
  });

  describe('getColor', () => {
    it('should return green when status is allumé', () => {
      component.appareilStatus = 'allumé';
      expect(component.getColor()).toBe('green');
    });

    it('should return red when status is éteint', () => {
      component.appareilStatus = 'éteint';
      expect(component.getColor()).toBe('red');
    });

    it('should return undefined for unknown status', () => {
      component.appareilStatus = 'inconnu';
      expect(component.getColor()).toBeUndefined();
    });
  });

  describe('onSwitch', () => {
    beforeEach(() => {
      // Reset the service state
      appareilService.appareils = [
        { name: 'Machine à laver', status: 'éteint' },
        { name: 'frigo', status: 'allumé' },
        { name: 'Ordinateur', status: 'éteint' }
      ];
    });

    it('should call switchOnOne when status is éteint', () => {
      component.appareilStatus = 'éteint';
      component.index = 0;
      
      spyOn(appareilService, 'switchOnOne');
      component.onSwitch();
      
      expect(appareilService.switchOnOne).toHaveBeenCalledWith(0);
    });

    it('should call switchOffOne when status is allumé', () => {
      component.appareilStatus = 'allumé';
      component.index = 1;
      
      spyOn(appareilService, 'switchOffOne');
      component.onSwitch();
      
      expect(appareilService.switchOffOne).toHaveBeenCalledWith(1);
    });

    it('should change service state when called', () => {
      component.appareilStatus = 'éteint';
      component.index = 0;
      
      expect(appareilService.appareils[0].status).toBe('éteint');
      component.onSwitch();
      expect(appareilService.appareils[0].status).toBe('allumé');
    });

    it('should not throw when index is invalid', () => {
      component.appareilStatus = 'éteint';
      component.index = -1;
      
      expect(() => component.onSwitch()).not.toThrow();
    });
  });

  describe('Template rendering', () => {
    it('should render li element with list-group-item class', () => {
      const compiled = fixture.debugElement.nativeElement;
      const li = compiled.querySelector('li');
      expect(li).toBeTruthy();
      expect(li.classList).toContain('list-group-item');
    });

    it('should add list-group-item-success class when status is allumé', () => {
      component.appareilStatus = 'allumé';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const li = compiled.querySelector('li');
      expect(li.classList).toContain('list-group-item-success');
    });

    it('should add list-group-item-danger class when status is éteint', () => {
      component.appareilStatus = 'éteint';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const li = compiled.querySelector('li');
      expect(li.classList).toContain('list-group-item-danger');
    });

    it('should display appareil name and status', () => {
      component.appareilName = 'Test';
      component.appareilStatus = 'allumé';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const h4 = compiled.querySelector('h4');
      expect(h4.textContent).toContain('Appareil : Test');
      expect(h4.textContent).toContain('Statut : allumé');
    });

    it('should render input field with ngModel binding', () => {
      const compiled = fixture.debugElement.nativeElement;
      const input = compiled.querySelector('input');
      expect(input).toBeTruthy();
      expect(input.getAttribute('type')).toBe('text');
      expect(input.classList).toContain('form-control');
    });

    it('should render Allumer button when status is éteint', () => {
      component.appareilStatus = 'éteint';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-success');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Allumer');
    });

    it('should render Eteindre button when status is allumé', () => {
      component.appareilStatus = 'allumé';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-danger');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Eteindre');
    });

    it('should not render Allumer button when status is allumé', () => {
      component.appareilStatus = 'allumé';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-success');
      expect(button).toBeNull();
    });

    it('should not render Eteindre button when status is éteint', () => {
      component.appareilStatus = 'éteint';
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-danger');
      expect(button).toBeNull();
    });
  });

  describe('Input binding', () => {
    it('should update appareilName from input binding', () => {
      component.appareilName = 'Nouveau Nom';
      fixture.detectChanges();
      expect(component.getName()).toBe('Nouveau Nom');
    });

    it('should update appareilStatus from input binding', () => {
      component.appareilStatus = 'allumé';
      fixture.detectChanges();
      expect(component.getStatus()).toBe('allumé');
    });

    it('should update index from input binding', () => {
      component.index = 2;
      fixture.detectChanges();
      expect(component.index).toBe(2);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle status toggle correctly', () => {
      component.appareilStatus = 'éteint';
      component.index = 0;
      
      const initialStatus = appareilService.appareils[0].status;
      component.onSwitch();
      
      expect(appareilService.appareils[0].status).not.toBe(initialStatus);
      expect(appareilService.appareils[0].status).toBe('allumé');
      
      // Toggle back
      component.onSwitch();
      expect(appareilService.appareils[0].status).toBe('éteint');
    });

    it('should work with different indices', () => {
      component.index = 1;
      component.appareilStatus = 'allumé';
      
      const initialStatus = appareilService.appareils[1].status;
      component.onSwitch();
      
      expect(appareilService.appareils[1].status).not.toBe(initialStatus);
    });
  });
});
