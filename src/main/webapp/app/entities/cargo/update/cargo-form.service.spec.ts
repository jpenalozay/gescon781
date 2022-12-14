import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cargo.test-samples';

import { CargoFormService } from './cargo-form.service';

describe('Cargo Form Service', () => {
  let service: CargoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargoFormService);
  });

  describe('Service methods', () => {
    describe('createCargoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCargoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            areaPerteneciente: expect.any(Object),
            cargoSuperior: expect.any(Object),
          })
        );
      });

      it('passing ICargo should create a new form with FormGroup', () => {
        const formGroup = service.createCargoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            areaPerteneciente: expect.any(Object),
            cargoSuperior: expect.any(Object),
          })
        );
      });
    });

    describe('getCargo', () => {
      it('should return NewCargo for default Cargo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCargoFormGroup(sampleWithNewData);

        const cargo = service.getCargo(formGroup) as any;

        expect(cargo).toMatchObject(sampleWithNewData);
      });

      it('should return NewCargo for empty Cargo initial value', () => {
        const formGroup = service.createCargoFormGroup();

        const cargo = service.getCargo(formGroup) as any;

        expect(cargo).toMatchObject({});
      });

      it('should return ICargo', () => {
        const formGroup = service.createCargoFormGroup(sampleWithRequiredData);

        const cargo = service.getCargo(formGroup) as any;

        expect(cargo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICargo should not enable id FormControl', () => {
        const formGroup = service.createCargoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCargo should disable id FormControl', () => {
        const formGroup = service.createCargoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
