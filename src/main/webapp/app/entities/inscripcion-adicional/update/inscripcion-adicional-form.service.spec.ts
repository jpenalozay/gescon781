import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion-adicional.test-samples';

import { InscripcionAdicionalFormService } from './inscripcion-adicional-form.service';

describe('InscripcionAdicional Form Service', () => {
  let service: InscripcionAdicionalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionAdicionalFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionAdicionalFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            documento: expect.any(Object),
            cantidad: expect.any(Object),
            costo: expect.any(Object),
            inscripcion: expect.any(Object),
            inscripcionRequisito: expect.any(Object),
          })
        );
      });

      it('passing IInscripcionAdicional should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            documento: expect.any(Object),
            cantidad: expect.any(Object),
            costo: expect.any(Object),
            inscripcion: expect.any(Object),
            inscripcionRequisito: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcionAdicional', () => {
      it('should return NewInscripcionAdicional for default InscripcionAdicional initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionAdicionalFormGroup(sampleWithNewData);

        const inscripcionAdicional = service.getInscripcionAdicional(formGroup) as any;

        expect(inscripcionAdicional).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcionAdicional for empty InscripcionAdicional initial value', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup();

        const inscripcionAdicional = service.getInscripcionAdicional(formGroup) as any;

        expect(inscripcionAdicional).toMatchObject({});
      });

      it('should return IInscripcionAdicional', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup(sampleWithRequiredData);

        const inscripcionAdicional = service.getInscripcionAdicional(formGroup) as any;

        expect(inscripcionAdicional).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcionAdicional should not enable id FormControl', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcionAdicional should disable id FormControl', () => {
        const formGroup = service.createInscripcionAdicionalFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
