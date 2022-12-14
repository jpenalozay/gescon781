import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../requisitos-inscripcion.test-samples';

import { RequisitosInscripcionFormService } from './requisitos-inscripcion-form.service';

describe('RequisitosInscripcion Form Service', () => {
  let service: RequisitosInscripcionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitosInscripcionFormService);
  });

  describe('Service methods', () => {
    describe('createRequisitosInscripcionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            obligatorio: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            costo: expect.any(Object),
            imagen: expect.any(Object),
            tipoRequisito: expect.any(Object),
            valores: expect.any(Object),
          })
        );
      });

      it('passing IRequisitosInscripcion should create a new form with FormGroup', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            obligatorio: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            costo: expect.any(Object),
            imagen: expect.any(Object),
            tipoRequisito: expect.any(Object),
            valores: expect.any(Object),
          })
        );
      });
    });

    describe('getRequisitosInscripcion', () => {
      it('should return NewRequisitosInscripcion for default RequisitosInscripcion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRequisitosInscripcionFormGroup(sampleWithNewData);

        const requisitosInscripcion = service.getRequisitosInscripcion(formGroup) as any;

        expect(requisitosInscripcion).toMatchObject(sampleWithNewData);
      });

      it('should return NewRequisitosInscripcion for empty RequisitosInscripcion initial value', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup();

        const requisitosInscripcion = service.getRequisitosInscripcion(formGroup) as any;

        expect(requisitosInscripcion).toMatchObject({});
      });

      it('should return IRequisitosInscripcion', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup(sampleWithRequiredData);

        const requisitosInscripcion = service.getRequisitosInscripcion(formGroup) as any;

        expect(requisitosInscripcion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRequisitosInscripcion should not enable id FormControl', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRequisitosInscripcion should disable id FormControl', () => {
        const formGroup = service.createRequisitosInscripcionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
