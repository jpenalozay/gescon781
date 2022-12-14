import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../programacion-deshabilitacion.test-samples';

import { ProgramacionDeshabilitacionFormService } from './programacion-deshabilitacion-form.service';

describe('ProgramacionDeshabilitacion Form Service', () => {
  let service: ProgramacionDeshabilitacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionDeshabilitacionFormService);
  });

  describe('Service methods', () => {
    describe('createProgramacionDeshabilitacionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            descripcion: expect.any(Object),
            fecha: expect.any(Object),
            nombreUsuario: expect.any(Object),
            fechas: expect.any(Object),
            horarioCatalogos: expect.any(Object),
            programacion: expect.any(Object),
            usuario: expect.any(Object),
          })
        );
      });

      it('passing IProgramacionDeshabilitacion should create a new form with FormGroup', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            descripcion: expect.any(Object),
            fecha: expect.any(Object),
            nombreUsuario: expect.any(Object),
            fechas: expect.any(Object),
            horarioCatalogos: expect.any(Object),
            programacion: expect.any(Object),
            usuario: expect.any(Object),
          })
        );
      });
    });

    describe('getProgramacionDeshabilitacion', () => {
      it('should return NewProgramacionDeshabilitacion for default ProgramacionDeshabilitacion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProgramacionDeshabilitacionFormGroup(sampleWithNewData);

        const programacionDeshabilitacion = service.getProgramacionDeshabilitacion(formGroup) as any;

        expect(programacionDeshabilitacion).toMatchObject(sampleWithNewData);
      });

      it('should return NewProgramacionDeshabilitacion for empty ProgramacionDeshabilitacion initial value', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup();

        const programacionDeshabilitacion = service.getProgramacionDeshabilitacion(formGroup) as any;

        expect(programacionDeshabilitacion).toMatchObject({});
      });

      it('should return IProgramacionDeshabilitacion', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup(sampleWithRequiredData);

        const programacionDeshabilitacion = service.getProgramacionDeshabilitacion(formGroup) as any;

        expect(programacionDeshabilitacion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProgramacionDeshabilitacion should not enable id FormControl', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProgramacionDeshabilitacion should disable id FormControl', () => {
        const formGroup = service.createProgramacionDeshabilitacionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
