import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion-descuento.test-samples';

import { InscripcionDescuentoFormService } from './inscripcion-descuento-form.service';

describe('InscripcionDescuento Form Service', () => {
  let service: InscripcionDescuentoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionDescuentoFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionDescuentoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            monto: expect.any(Object),
            inscripcion: expect.any(Object),
          })
        );
      });

      it('passing IInscripcionDescuento should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descripcion: expect.any(Object),
            monto: expect.any(Object),
            inscripcion: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcionDescuento', () => {
      it('should return NewInscripcionDescuento for default InscripcionDescuento initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionDescuentoFormGroup(sampleWithNewData);

        const inscripcionDescuento = service.getInscripcionDescuento(formGroup) as any;

        expect(inscripcionDescuento).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcionDescuento for empty InscripcionDescuento initial value', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup();

        const inscripcionDescuento = service.getInscripcionDescuento(formGroup) as any;

        expect(inscripcionDescuento).toMatchObject({});
      });

      it('should return IInscripcionDescuento', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup(sampleWithRequiredData);

        const inscripcionDescuento = service.getInscripcionDescuento(formGroup) as any;

        expect(inscripcionDescuento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcionDescuento should not enable id FormControl', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcionDescuento should disable id FormControl', () => {
        const formGroup = service.createInscripcionDescuentoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
