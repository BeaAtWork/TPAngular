import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { AuthComponent } from './auth/auth.component';
import { AppareilService } from './services/appareil.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

describe('AppModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
      ],
      declarations: [
        AppComponent,
        AppareilComponent,
        AuthComponent,
        AppareilViewComponent
      ],
      providers: [AppareilService]
    });
  });

  it('should create the module', () => {
    expect(AppModule).toBeDefined();
  });

  describe('Module declarations', () => {
    it('should declare AppComponent', () => {
      const declarations = TestBed.get(AppModule).declarations;
      expect(declarations).toContain(AppComponent);
    });

    it('should declare AppareilComponent', () => {
      const declarations = TestBed.get(AppModule).declarations;
      expect(declarations).toContain(AppareilComponent);
    });

    it('should declare AuthComponent', () => {
      const declarations = TestBed.get(AppModule).declarations;
      expect(declarations).toContain(AuthComponent);
    });

    it('should declare AppareilViewComponent', () => {
      const declarations = TestBed.get(AppModule).declarations;
      expect(declarations).toContain(AppareilViewComponent);
    });

    it('should have 4 declared components', () => {
      const declarations = TestBed.get(AppModule).declarations;
      expect(declarations.length).toBe(4);
    });
  });

  describe('Module imports', () => {
    it('should import BrowserModule', () => {
      const imports = TestBed.get(AppModule).imports;
      expect(imports).toContain(BrowserModule);
    });

    it('should import FormsModule', () => {
      const imports = TestBed.get(AppModule).imports;
      expect(imports).toContain(FormsModule);
    });

    it('should import AppRoutingModule', () => {
      const imports = TestBed.get(AppModule).imports;
      expect(imports).toContain(AppRoutingModule);
    });
  });

  describe('Module providers', () => {
    it('should provide AppareilService', () => {
      const providers = TestBed.get(AppModule).providers;
      expect(providers).toContain(AppareilService);
    });

    it('should have AppareilService as a provider', () => {
      const module = TestBed.get(AppModule);
      expect(module.providers).toContain(AppareilService);
    });
  });

  describe('Module bootstrap', () => {
    it('should bootstrap AppComponent', () => {
      const bootstrap = TestBed.get(AppModule).bootstrap;
      expect(bootstrap).toContain(AppComponent);
    });

    it('should have AppComponent as entry component', () => {
      const bootstrap = TestBed.get(AppModule).bootstrap;
      expect(bootstrap[0]).toBe(AppComponent);
    });
  });

  describe('Module metadata', () => {
    it('should have correct selector for AppComponent', () => {
      const appComponent = TestBed.get(AppModule).declarations.find(
        d => d.name === 'AppComponent'
      );
      expect(appComponent).toBeDefined();
    });

    it('should have all components properly decorated', () => {
      const declarations = TestBed.get(AppModule).declarations;
      
      declarations.forEach(component => {
        expect(component.selector).toBeDefined();
        expect(component.selector).toContain('app-');
      });
    });
  });

  describe('Service injection', () => {
    it('should allow AppareilService to be injected', () => {
      const service = TestBed.inject(AppareilService);
      expect(service).toBeTruthy();
      expect(service).toBeInstanceOf(AppareilService);
    });

    it('should have AppareilService as a singleton', () => {
      const service1 = TestBed.inject(AppareilService);
      const service2 = TestBed.inject(AppareilService);
      expect(service1).toBe(service2);
    });
  });

  describe('Module exports', () => {
    it('should export AppComponent', () => {
      const exports = TestBed.get(AppModule).exports;
      expect(exports).toContain(AppComponent);
    });
  });
});
