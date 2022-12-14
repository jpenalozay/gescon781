import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion-detalle.test-samples';

import { InscripcionDetalleFormService } from './inscripcion-detalle-form.service';

describe('InscripcionDetalle Form Service', () => {
  let service: InscripcionDetalleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionDetalleFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionDetalleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionDetalleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            fechaInicio: expect.any(Object),
            inscripcion: expect.any(Object),
            asignatura: expect.any(Object),
            horario: expect.any(Object),
          })
        );
      });

      it('passing IInscripcionDetalle should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionDetalleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            fechaInicio: expect.any(Object),
            inscripcion: expect.any(Object),
            asignatura: expect.any(Object),
            horario: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcionDetalle', () => {
      it('should return NewInscripcionDetalle for default InscripcionDetalle initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionDetalleFormGroup(sampleWithNewData);

        const inscripcionDetalle = service.getInscripcionDetalle(formGroup) as any;

        expect(inscripcionDetalle).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcionDetalle for empty InscripcionDetalle initial value', () => {
        const formGroup = service.createInscripcionDetalleFormGroup();

        const inscripcionDetalle = service.getInscripcionDetalle(formGroup) as any;

        expect(inscripcionDetalle).toMatchObject({});
      });

      it('should return IInscripcionDetalle', () => {
        const formGroup = service.createInscripcionDetalleFormGroup(sampleWithRequiredData);

        const inscripcionDetalle = service.getInscripcionDetalle(formGroup) as any;

        expect(inscripcionDetalle).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcionDetalle should not enable id FormControl', () => {
        const formGroup = service.createInscripcionDetalleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcionDetalle should disable id FormControl', () => {
        const formGroup = service.createInscripcionDetalleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
