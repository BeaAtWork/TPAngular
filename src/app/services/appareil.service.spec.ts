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

  describe('Initialization', () => {
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

    it('should have appareils array defined', () => {
      expect(service.appareils).toBeDefined();
      expect(Array.isArray(service.appareils)).toBeTrue();
    });
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

    it('should change status from éteint to allumé', () => {
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('éteint');
      
      service.switchOnAll();
      
      expect(service.appareils[0].status).toBe('allumé');
      expect(service.appareils[1].status).toBe('allumé');
      expect(service.appareils[2].status).toBe('allumé');
    });
  });

  describe('switchOffAll', () => {
    it('should switch all appareils to éteint', () => {
      service.switchOffAll();
      expect(service.appareils.every(a => a.status === 'éteint')).toBeTrue();
    });

    it('should modify the original array', () => {
      const initialAppareils = service.appareils;
      service.switchOffAll();
      expect(service.appareils).toBe(initialAppareils);
    });

    it('should change status from allumé to éteint', () => {
      expect(service.appareils[1].status).toBe('allumé');
      
      service.switchOffAll();
      
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[1].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('éteint');
    });
  });

  describe('switchOnOne', () => {
    it('should switch appareil at index 0 to allumé', () => {
      expect(service.appareils[0].status).toBe('éteint');
      service.switchOnOne(0);
      expect(service.appareils[0].status).toBe('allumé');
    });

    it('should switch appareil at index 1 to allumé', () => {
      expect(service.appareils[1].status).toBe('allumé');
      service.switchOnOne(1);
      expect(service.appareils[1].status).toBe('allumé');
    });

    it('should switch appareil at index 2 to allumé', () => {
      expect(service.appareils[2].status).toBe('éteint');
      service.switchOnOne(2);
      expect(service.appareils[2].status).toBe('allumé');
    });

    it('should not modify other appareils', () => {
      service.switchOnOne(0);
      expect(service.appareils[1].status).toBe('allumé');
      expect(service.appareils[2].status).toBe('éteint');
    });

    it('should handle invalid index gracefully', () => {
      // Test with negative index
      expect(() => service.switchOnOne(-1)).not.toThrow();
      
      // Test with out of bounds index
      expect(() => service.switchOnOne(100)).not.toThrow();
    });
  });

  describe('switchOffOne', () => {
    it('should switch appareil at index 0 to éteint', () => {
      service.switchOnAll(); // Allumer tous d'abord
      expect(service.appareils[0].status).toBe('allumé');
      service.switchOffOne(0);
      expect(service.appareils[0].status).toBe('éteint');
    });

    it('should switch appareil at index 1 to éteint', () => {
      expect(service.appareils[1].status).toBe('allumé');
      service.switchOffOne(1);
      expect(service.appareils[1].status).toBe('éteint');
    });

    it('should switch appareil at index 2 to éteint', () => {
      service.switchOnOne(2); // Allumer d'abord
      expect(service.appareils[2].status).toBe('allumé');
      service.switchOffOne(2);
      expect(service.appareils[2].status).toBe('éteint');
    });

    it('should not modify other appareils', () => {
      service.switchOffOne(1);
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('éteint');
    });

    it('should handle invalid index gracefully', () => {
      // Test with negative index
      expect(() => service.switchOffOne(-1)).not.toThrow();
      
      // Test with out of bounds index
      expect(() => service.switchOffOne(100)).not.toThrow();
    });
  });

  describe('Integration scenarios', () => {
    it('should allow switching all on then all off', () => {
      service.switchOnAll();
      expect(service.appareils.every(a => a.status === 'allumé')).toBeTrue();
      
      service.switchOffAll();
      expect(service.appareils.every(a => a.status === 'éteint')).toBeTrue();
    });

    it('should allow switching individual appareils on and off', () => {
      // Switch on index 0
      service.switchOnOne(0);
      expect(service.appareils[0].status).toBe('allumé');
      
      // Switch off index 0
      service.switchOffOne(0);
      expect(service.appareils[0].status).toBe('éteint');
      
      // Switch on index 2
      service.switchOnOne(2);
      expect(service.appareils[2].status).toBe('allumé');
      
      // Switch off index 2
      service.switchOffOne(2);
      expect(service.appareils[2].status).toBe('éteint');
    });

    it('should maintain correct state after multiple operations', () => {
      // Initial state
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[1].status).toBe('allumé');
      expect(service.appareils[2].status).toBe('éteint');
      
      // Turn all on
      service.switchOnAll();
      expect(service.appareils[0].status).toBe('allumé');
      expect(service.appareils[1].status).toBe('allumé');
      expect(service.appareils[2].status).toBe('allumé');
      
      // Turn off index 1
      service.switchOffOne(1);
      expect(service.appareils[0].status).toBe('allumé');
      expect(service.appareils[1].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('allumé');
      
      // Turn all off
      service.switchOffAll();
      expect(service.appareils[0].status).toBe('éteint');
      expect(service.appareils[1].status).toBe('éteint');
      expect(service.appareils[2].status).toBe('éteint');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array gracefully', () => {
      const originalAppareils = service.appareils;
      service.appareils = [];
      
      expect(() => service.switchOnAll()).not.toThrow();
      expect(() => service.switchOffAll()).not.toThrow();
      expect(() => service.switchOnOne(0)).not.toThrow();
      expect(() => service.switchOffOne(0)).not.toThrow();
      
      // Restore original
      service.appareils = originalAppareils;
    });

    it('should maintain array reference after operations', () => {
      const initialReference = service.appareils;
      service.switchOnAll();
      service.switchOffAll();
      service.switchOnOne(0);
      service.switchOffOne(1);
      
      expect(service.appareils).toBe(initialReference);
    });
  });
});
