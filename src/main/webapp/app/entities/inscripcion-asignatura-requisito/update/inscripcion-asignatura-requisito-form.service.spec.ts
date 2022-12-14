import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion-asignatura-requisito.test-samples';

import { InscripcionAsignaturaRequisitoFormService } from './inscripcion-asignatura-requisito-form.service';

describe('InscripcionAsignaturaRequisito Form Service', () => {
  let service: InscripcionAsignaturaRequisitoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionAsignaturaRequisitoFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionAsignaturaRequisitoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            documento: expect.any(Object),
            inscripcionDetalle: expect.any(Object),
            asignaturaRequisito: expect.any(Object),
          })
        );
      });

      it('passing IInscripcionAsignaturaRequisito should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            documento: expect.any(Object),
            inscripcionDetalle: expect.any(Object),
            asignaturaRequisito: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcionAsignaturaRequisito', () => {
      it('should return NewInscripcionAsignaturaRequisito for default InscripcionAsignaturaRequisito initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup(sampleWithNewData);

        const inscripcionAsignaturaRequisito = service.getInscripcionAsignaturaRequisito(formGroup) as any;

        expect(inscripcionAsignaturaRequisito).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcionAsignaturaRequisito for empty InscripcionAsignaturaRequisito initial value', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup();

        const inscripcionAsignaturaRequisito = service.getInscripcionAsignaturaRequisito(formGroup) as any;

        expect(inscripcionAsignaturaRequisito).toMatchObject({});
      });

      it('should return IInscripcionAsignaturaRequisito', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup(sampleWithRequiredData);

        const inscripcionAsignaturaRequisito = service.getInscripcionAsignaturaRequisito(formGroup) as any;

        expect(inscripcionAsignaturaRequisito).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcionAsignaturaRequisito should not enable id FormControl', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcionAsignaturaRequisito should disable id FormControl', () => {
        const formGroup = service.createInscripcionAsignaturaRequisitoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
