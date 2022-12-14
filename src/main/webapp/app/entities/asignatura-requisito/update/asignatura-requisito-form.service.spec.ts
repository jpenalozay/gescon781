import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asignatura-requisito.test-samples';

import { AsignaturaRequisitoFormService } from './asignatura-requisito-form.service';

describe('AsignaturaRequisito Form Service', () => {
  let service: AsignaturaRequisitoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturaRequisitoFormService);
  });

  describe('Service methods', () => {
    describe('createAsignaturaRequisitoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });

      it('passing IAsignaturaRequisito should create a new form with FormGroup', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });
    });

    describe('getAsignaturaRequisito', () => {
      it('should return NewAsignaturaRequisito for default AsignaturaRequisito initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAsignaturaRequisitoFormGroup(sampleWithNewData);

        const asignaturaRequisito = service.getAsignaturaRequisito(formGroup) as any;

        expect(asignaturaRequisito).toMatchObject(sampleWithNewData);
      });

      it('should return NewAsignaturaRequisito for empty AsignaturaRequisito initial value', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup();

        const asignaturaRequisito = service.getAsignaturaRequisito(formGroup) as any;

        expect(asignaturaRequisito).toMatchObject({});
      });

      it('should return IAsignaturaRequisito', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup(sampleWithRequiredData);

        const asignaturaRequisito = service.getAsignaturaRequisito(formGroup) as any;

        expect(asignaturaRequisito).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAsignaturaRequisito should not enable id FormControl', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAsignaturaRequisito should disable id FormControl', () => {
        const formGroup = service.createAsignaturaRequisitoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
