import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asignatura-adiciones.test-samples';

import { AsignaturaAdicionesFormService } from './asignatura-adiciones-form.service';

describe('AsignaturaAdiciones Form Service', () => {
  let service: AsignaturaAdicionesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturaAdicionesFormService);
  });

  describe('Service methods', () => {
    describe('createAsignaturaAdicionesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });

      it('passing IAsignaturaAdiciones should create a new form with FormGroup', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });
    });

    describe('getAsignaturaAdiciones', () => {
      it('should return NewAsignaturaAdiciones for default AsignaturaAdiciones initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAsignaturaAdicionesFormGroup(sampleWithNewData);

        const asignaturaAdiciones = service.getAsignaturaAdiciones(formGroup) as any;

        expect(asignaturaAdiciones).toMatchObject(sampleWithNewData);
      });

      it('should return NewAsignaturaAdiciones for empty AsignaturaAdiciones initial value', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup();

        const asignaturaAdiciones = service.getAsignaturaAdiciones(formGroup) as any;

        expect(asignaturaAdiciones).toMatchObject({});
      });

      it('should return IAsignaturaAdiciones', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup(sampleWithRequiredData);

        const asignaturaAdiciones = service.getAsignaturaAdiciones(formGroup) as any;

        expect(asignaturaAdiciones).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAsignaturaAdiciones should not enable id FormControl', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAsignaturaAdiciones should disable id FormControl', () => {
        const formGroup = service.createAsignaturaAdicionesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
