import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppareilViewComponent } from './appareil-view.component';
import { AppareilService } from '../services/appareil.service';
import { AppareilComponent } from '../appareil/appareil.component';

describe('AppareilViewComponent', () => {
  let component: AppareilViewComponent;
  let fixture: ComponentFixture<AppareilViewComponent>;
  let appareilService: AppareilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppareilViewComponent, AppareilComponent],
      providers: [AppareilService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilViewComponent);
    component = fixture.componentInstance;
    appareilService = TestBed.inject(AppareilService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject AppareilService', () => {
    expect(appareilService).toBeTruthy();
    expect(appareilService).toBeInstanceOf(AppareilService);
  });

  it('should have appareils property defined', () => {
    expect(component.appareils).toBeDefined();
  });

  it('should have lastUpdate promise defined', () => {
    expect(component.lastUpdate).toBeDefined();
    expect(component.lastUpdate).toBeInstanceOf(Promise);
  });

  describe('ngOnInit', () => {
    it('should initialize appareils from service', () => {
      component.ngOnInit();
      expect(component.appareils).toBe(appareilService.appareils);
    });

    it('should have 3 appareils after initialization', () => {
      component.ngOnInit();
      expect(component.appareils.length).toBe(3);
    });

    it('should share the same appareils reference with service', () => {
      component.ngOnInit();
      expect(component.appareils).toBe(appareilService.appareils);
    });
  });

  describe('lastUpdate promise', () => {
    it('should resolve after 1 second', (done) => {
      component.lastUpdate.then((date) => {
        expect(date).toBeInstanceOf(Date);
        done();
      });
    });

    it('should resolve with a Date object', (done) => {
      component.lastUpdate.then((date) => {
        expect(date instanceof Date).toBeTrue();
        done();
      });
    });
  });

  describe('onAllumer', () => {
    it('should call switchOnAll on appareilService', () => {
      spyOn(appareilService, 'switchOnAll');
      component.onAllumer();
      expect(appareilService.switchOnAll).toHaveBeenCalled();
    });

    it('should change all appareils status to allumé', () => {
      component.onAllumer();
      expect(component.appareils.every(a => a.status === 'allumé')).toBeTrue();
    });

    it('should update the appareils array', () => {
      component.ngOnInit();
      const initialStatus = component.appareils[0].status;
      
      component.onAllumer();
      expect(component.appareils[0].status).not.toBe(initialStatus);
    });
  });

  describe('onEteindre', () => {
    it('should call switchOffAll on appareilService when confirmed', () => {
      spyOn(appareilService, 'switchOffAll');
      spyOn(window, 'confirm').and.returnValue(true);
      
      component.onEteindre();
      expect(appareilService.switchOffAll).toHaveBeenCalled();
    });

    it('should not call switchOffAll on appareilService when not confirmed', () => {
      spyOn(appareilService, 'switchOffAll');
      spyOn(window, 'confirm').and.returnValue(false);
      
      const result = component.onEteindre();
      expect(appareilService.switchOffAll).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const result = component.onEteindre();
      expect(result).toBeNull();
    });

    it('should change all appareils status to éteint when confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.onEteindre();
      expect(component.appareils.every(a => a.status === 'éteint')).toBeTrue();
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render container div', () => {
      const compiled = fixture.debugElement.nativeElement;
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();
    });

    it('should render h2 title', () => {
      const compiled = fixture.debugElement.nativeElement;
      const h2 = compiled.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2.textContent).toContain('Mes appareils');
    });

    it('should render ul with list-group class', () => {
      const compiled = fixture.debugElement.nativeElement;
      const ul = compiled.querySelector('ul.list-group');
      expect(ul).toBeTruthy();
    });

    it('should render app-appareil components for each appareil', () => {
      const compiled = fixture.debugElement.nativeElement;
      const appareilComponents = compiled.querySelectorAll('app-appareil');
      expect(appareilComponents.length).toBe(3);
    });

    it('should pass correct inputs to app-appareil components', () => {
      const compiled = fixture.debugElement.nativeElement;
      const appareilComponents = compiled.querySelectorAll('app-appareil');
      
      // Check first appareil
      const firstAppareil = appareilComponents[0];
      expect(firstAppareil.getAttribute('appareilname')).toBe('Machine à laver');
      expect(firstAppareil.getAttribute('appareilstatus')).toBe('éteint');
      expect(firstAppareil.getAttribute('index')).toBe('0');
    });

    it('should render Tout allumer button', () => {
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-success');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Tout allumer');
    });

    it('should render Tout éteindre button', () => {
      const compiled = fixture.debugElement.nativeElement;
      const button = compiled.querySelector('button.btn-danger');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Tout éteindre');
    });
  });

  describe('Button disabled state', () => {
    it('should disable buttons when isAuth is false', () => {
      component.isAuth = false;
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const allumerButton = compiled.querySelector('button.btn-success');
      const eteindreButton = compiled.querySelector('button.btn-danger');
      
      expect(allumerButton.disabled).toBeTrue();
      expect(eteindreButton.disabled).toBeTrue();
    });

    it('should enable buttons when isAuth is true', () => {
      component.isAuth = true;
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      const allumerButton = compiled.querySelector('button.btn-success');
      const eteindreButton = compiled.querySelector('button.btn-danger');
      
      expect(allumerButton.disabled).toBeFalse();
      expect(eteindreButton.disabled).toBeFalse();
    });
  });

  describe('Integration with AppareilService', () => {
    it('should reflect changes made through service', () => {
      component.ngOnInit();
      const initialStatus = component.appareils[0].status;
      
      appareilService.switchOnOne(0);
      expect(component.appareils[0].status).not.toBe(initialStatus);
      expect(component.appareils[0].status).toBe('allumé');
    });

    it('should allow service to modify appareils', () => {
      component.ngOnInit();
      
      appareilService.switchOnAll();
      expect(component.appareils.every(a => a.status === 'allumé')).toBeTrue();
      
      appareilService.switchOffAll();
      expect(component.appareils.every(a => a.status === 'éteint')).toBeTrue();
    });

    it('should share state with AppareilComponent', () => {
      component.ngOnInit();
      fixture.detectChanges();
      
      const appareilComponents = fixture.debugElement.queryAll(
        (de) => de.componentInstance instanceof AppareilComponent
      );
      
      expect(appareilComponents.length).toBe(3);
      
      // Verify that child components receive correct data
      const firstAppareil = appareilComponents[0].componentInstance as AppareilComponent;
      expect(firstAppareil.appareilName).toBe('Machine à laver');
      expect(firstAppareil.appareilStatus).toBe('éteint');
      expect(firstAppareil.index).toBe(0);
    });
  });

  describe('Data flow', () => {
    it('should update view when service data changes', () => {
      component.ngOnInit();
      fixture.detectChanges();
      
      const compiled = fixture.debugElement.nativeElement;
      let h4 = compiled.querySelector('app-appareil h4');
      expect(h4.textContent).toContain('Machine à laver');
      expect(h4.textContent).toContain('éteint');
      
      // Change through service
      appareilService.switchOnOne(0);
      fixture.detectChanges();
      
      h4 = compiled.querySelector('app-appareil h4');
      expect(h4.textContent).toContain('Machine à laver');
      expect(h4.textContent).toContain('allumé');
    });

    it('should maintain consistent state across all components', () => {
      component.ngOnInit();
      
      // All components should reference the same data
      expect(component.appareils).toBe(appareilService.appareils);
      
      // Changes through service should be visible in component
      appareilService.switchOnAll();
      expect(component.appareils.every(a => a.status === 'allumé')).toBeTrue();
    });
  });
});
