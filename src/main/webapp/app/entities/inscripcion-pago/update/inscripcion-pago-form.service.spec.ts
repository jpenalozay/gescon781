import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../inscripcion-pago.test-samples';

import { InscripcionPagoFormService } from './inscripcion-pago-form.service';

describe('InscripcionPago Form Service', () => {
  let service: InscripcionPagoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionPagoFormService);
  });

  describe('Service methods', () => {
    describe('createInscripcionPagoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscripcionPagoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            formaPago: expect.any(Object),
            monto: expect.any(Object),
            fecha: expect.any(Object),
            codigoOP: expect.any(Object),
            tipoDocumento: expect.any(Object),
            numeroDocumento: expect.any(Object),
            plazoPago: expect.any(Object),
            inscripcion: expect.any(Object),
            serie: expect.any(Object),
          })
        );
      });

      it('passing IInscripcionPago should create a new form with FormGroup', () => {
        const formGroup = service.createInscripcionPagoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            formaPago: expect.any(Object),
            monto: expect.any(Object),
            fecha: expect.any(Object),
            codigoOP: expect.any(Object),
            tipoDocumento: expect.any(Object),
            numeroDocumento: expect.any(Object),
            plazoPago: expect.any(Object),
            inscripcion: expect.any(Object),
            serie: expect.any(Object),
          })
        );
      });
    });

    describe('getInscripcionPago', () => {
      it('should return NewInscripcionPago for default InscripcionPago initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createInscripcionPagoFormGroup(sampleWithNewData);

        const inscripcionPago = service.getInscripcionPago(formGroup) as any;

        expect(inscripcionPago).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscripcionPago for empty InscripcionPago initial value', () => {
        const formGroup = service.createInscripcionPagoFormGroup();

        const inscripcionPago = service.getInscripcionPago(formGroup) as any;

        expect(inscripcionPago).toMatchObject({});
      });

      it('should return IInscripcionPago', () => {
        const formGroup = service.createInscripcionPagoFormGroup(sampleWithRequiredData);

        const inscripcionPago = service.getInscripcionPago(formGroup) as any;

        expect(inscripcionPago).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscripcionPago should not enable id FormControl', () => {
        const formGroup = service.createInscripcionPagoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscripcionPago should disable id FormControl', () => {
        const formGroup = service.createInscripcionPagoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
