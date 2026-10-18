import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppareilService } from './services/appareil.service';
import { FormsModule } from '@angular/forms';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appareilService: AppareilService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        AppareilViewComponent
      ],
      providers: [AppareilService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appareilService = TestBed.inject(AppareilService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have isAuth property initialized to false', () => {
    expect(component.isAuth).toBeFalse();
  });

  it('should have appareils property defined', () => {
    expect(component.appareils).toBeDefined();
  });

  it('should inject AppareilService', () => {
    expect(appareilService).toBeTruthy();
    expect(appareilService).toBeInstanceOf(AppareilService);
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
  });

  describe('Constructor', () => {
    it('should set isAuth to true after 1 second', (done) => {
      component.isAuth = false;
      
      setTimeout(() => {
        expect(component.isAuth).toBeTrue();
        done();
      }, 1100);
    });

    it('should initialize with isAuth as false', () => {
      expect(component.isAuth).toBeFalse();
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
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render app-appareil-view component', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('app-appareil-view')).toBeTruthy();
    });

    it('should have container div with row and col-xs-12', () => {
      const compiled = fixture.debugElement.nativeElement;
      const container = compiled.querySelector('.container');
      expect(container).toBeTruthy();
      
      const row = compiled.querySelector('.row');
      expect(row).toBeTruthy();
      
      const col = compiled.querySelector('.col-xs-12');
      expect(col).toBeTruthy();
    });
  });

  describe('Integration with AppareilService', () => {
    it('should share the same appareils reference with service', () => {
      component.ngOnInit();
      expect(component.appareils).toBe(appareilService.appareils);
    });

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
  });
});
