import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../automovil.test-samples';

import { AutomovilFormService } from './automovil-form.service';

describe('Automovil Form Service', () => {
  let service: AutomovilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomovilFormService);
  });

  describe('Service methods', () => {
    describe('createAutomovilFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAutomovilFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            tipo: expect.any(Object),
            placa: expect.any(Object),
            marca: expect.any(Object),
            modelo: expect.any(Object),
            anio: expect.any(Object),
            soatVencimiento: expect.any(Object),
            revisionTecnicaVencimiento: expect.any(Object),
            caja: expect.any(Object),
            imagen: expect.any(Object),
          })
        );
      });

      it('passing IAutomovil should create a new form with FormGroup', () => {
        const formGroup = service.createAutomovilFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            tipo: expect.any(Object),
            placa: expect.any(Object),
            marca: expect.any(Object),
            modelo: expect.any(Object),
            anio: expect.any(Object),
            soatVencimiento: expect.any(Object),
            revisionTecnicaVencimiento: expect.any(Object),
            caja: expect.any(Object),
            imagen: expect.any(Object),
          })
        );
      });
    });

    describe('getAutomovil', () => {
      it('should return NewAutomovil for default Automovil initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAutomovilFormGroup(sampleWithNewData);

        const automovil = service.getAutomovil(formGroup) as any;

        expect(automovil).toMatchObject(sampleWithNewData);
      });

      it('should return NewAutomovil for empty Automovil initial value', () => {
        const formGroup = service.createAutomovilFormGroup();

        const automovil = service.getAutomovil(formGroup) as any;

        expect(automovil).toMatchObject({});
      });

      it('should return IAutomovil', () => {
        const formGroup = service.createAutomovilFormGroup(sampleWithRequiredData);

        const automovil = service.getAutomovil(formGroup) as any;

        expect(automovil).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAutomovil should not enable id FormControl', () => {
        const formGroup = service.createAutomovilFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAutomovil should disable id FormControl', () => {
        const formGroup = service.createAutomovilFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
