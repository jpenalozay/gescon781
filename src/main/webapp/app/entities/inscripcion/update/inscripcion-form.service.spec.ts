import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion.test-samples';

import { InscripcionFormService } from './inscripcion-form.service';

describe('Inscripcion Form Service', () => {
  let service: InscripcionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            estado: expect.any(Object),
            numeroDocumento: expect.any(Object),
            fecha: expect.any(Object),
            costoTotal: expect.any(Object),
            alumno: expect.any(Object),
          })
        );
      });

      it('passing IInscripcion should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            estado: expect.any(Object),
            numeroDocumento: expect.any(Object),
            fecha: expect.any(Object),
            costoTotal: expect.any(Object),
            alumno: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcion', () => {
      it('should return NewInscripcion for default Inscripcion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionFormGroup(sampleWithNewData);

        const inscripcion = service.getInscripcion(formGroup) as any;

        expect(inscripcion).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcion for empty Inscripcion initial value', () => {
        const formGroup = service.createInscripcionFormGroup();

        const inscripcion = service.getInscripcion(formGroup) as any;

        expect(inscripcion).toMatchObject({});
      });

      it('should return IInscripcion', () => {
        const formGroup = service.createInscripcionFormGroup(sampleWithRequiredData);

        const inscripcion = service.getInscripcion(formGroup) as any;

        expect(inscripcion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcion should not enable id FormControl', () => {
        const formGroup = service.createInscripcionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcion should disable id FormControl', () => {
        const formGroup = service.createInscripcionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
