import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../programacion.test-samples';

import { ProgramacionFormService } from './programacion-form.service';

describe('Programacion Form Service', () => {
  let service: ProgramacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramacionFormService);
  });

  describe('Service methods', () => {
    describe('createProgramacionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProgramacionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            estado: expect.any(Object),
            codigo: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            deshabilitaciones: expect.any(Object),
            fecha: expect.any(Object),
            nombreUsuario: expect.any(Object),
            dias: expect.any(Object),
            horarioCatalogos: expect.any(Object),
            profesor: expect.any(Object),
            automovil: expect.any(Object),
          })
        );
      });

      it('passing IProgramacion should create a new form with FormGroup', () => {
        const formGroup = service.createProgramacionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            estado: expect.any(Object),
            codigo: expect.any(Object),
            fechaInicio: expect.any(Object),
            fechaFin: expect.any(Object),
            deshabilitaciones: expect.any(Object),
            fecha: expect.any(Object),
            nombreUsuario: expect.any(Object),
            dias: expect.any(Object),
            horarioCatalogos: expect.any(Object),
            profesor: expect.any(Object),
            automovil: expect.any(Object),
          })
        );
      });
    });

    describe('getProgramacion', () => {
      it('should return NewProgramacion for default Programacion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProgramacionFormGroup(sampleWithNewData);

        const programacion = service.getProgramacion(formGroup) as any;

        expect(programacion).toMatchObject(sampleWithNewData);
      });

      it('should return NewProgramacion for empty Programacion initial value', () => {
        const formGroup = service.createProgramacionFormGroup();

        const programacion = service.getProgramacion(formGroup) as any;

        expect(programacion).toMatchObject({});
      });

      it('should return IProgramacion', () => {
        const formGroup = service.createProgramacionFormGroup(sampleWithRequiredData);

        const programacion = service.getProgramacion(formGroup) as any;

        expect(programacion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProgramacion should not enable id FormControl', () => {
        const formGroup = service.createProgramacionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProgramacion should disable id FormControl', () => {
        const formGroup = service.createProgramacionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
