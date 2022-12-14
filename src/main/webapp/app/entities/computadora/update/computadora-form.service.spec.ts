import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../computadora.test-samples';

import { ComputadoraFormService } from './computadora-form.service';

describe('Computadora Form Service', () => {
  let service: ComputadoraFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputadoraFormService);
  });

  describe('Service methods', () => {
    describe('createComputadoraFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createComputadoraFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            estadoComputadora: expect.any(Object),
            mac: expect.any(Object),
            tipo: expect.any(Object),
            usuarios: expect.any(Object),
          })
        );
      });

      it('passing IComputadora should create a new form with FormGroup', () => {
        const formGroup = service.createComputadoraFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            estadoComputadora: expect.any(Object),
            mac: expect.any(Object),
            tipo: expect.any(Object),
            usuarios: expect.any(Object),
          })
        );
      });
    });

    describe('getComputadora', () => {
      it('should return NewComputadora for default Computadora initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createComputadoraFormGroup(sampleWithNewData);

        const computadora = service.getComputadora(formGroup) as any;

        expect(computadora).toMatchObject(sampleWithNewData);
      });

      it('should return NewComputadora for empty Computadora initial value', () => {
        const formGroup = service.createComputadoraFormGroup();

        const computadora = service.getComputadora(formGroup) as any;

        expect(computadora).toMatchObject({});
      });

      it('should return IComputadora', () => {
        const formGroup = service.createComputadoraFormGroup(sampleWithRequiredData);

        const computadora = service.getComputadora(formGroup) as any;

        expect(computadora).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IComputadora should not enable id FormControl', () => {
        const formGroup = service.createComputadoraFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewComputadora should disable id FormControl', () => {
        const formGroup = service.createComputadoraFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
