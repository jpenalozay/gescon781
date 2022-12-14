import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../horario-deshabilitacion.test-samples';

import { HorarioDeshabilitacionFormService } from './horario-deshabilitacion-form.service';

describe('HorarioDeshabilitacion Form Service', () => {
  let service: HorarioDeshabilitacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioDeshabilitacionFormService);
  });

  describe('Service methods', () => {
    describe('createHorarioDeshabilitacionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipo: expect.any(Object),
            programacionDeshabilitacion: expect.any(Object),
            horario: expect.any(Object),
          })
        );
      });

      it('passing IHorarioDeshabilitacion should create a new form with FormGroup', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipo: expect.any(Object),
            programacionDeshabilitacion: expect.any(Object),
            horario: expect.any(Object),
          })
        );
      });
    });

    describe('getHorarioDeshabilitacion', () => {
      it('should return NewHorarioDeshabilitacion for default HorarioDeshabilitacion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHorarioDeshabilitacionFormGroup(sampleWithNewData);

        const horarioDeshabilitacion = service.getHorarioDeshabilitacion(formGroup) as any;

        expect(horarioDeshabilitacion).toMatchObject(sampleWithNewData);
      });

      it('should return NewHorarioDeshabilitacion for empty HorarioDeshabilitacion initial value', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup();

        const horarioDeshabilitacion = service.getHorarioDeshabilitacion(formGroup) as any;

        expect(horarioDeshabilitacion).toMatchObject({});
      });

      it('should return IHorarioDeshabilitacion', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup(sampleWithRequiredData);

        const horarioDeshabilitacion = service.getHorarioDeshabilitacion(formGroup) as any;

        expect(horarioDeshabilitacion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHorarioDeshabilitacion should not enable id FormControl', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHorarioDeshabilitacion should disable id FormControl', () => {
        const formGroup = service.createHorarioDeshabilitacionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
