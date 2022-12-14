import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alumno-clases.test-samples';

import { AlumnoClasesFormService } from './alumno-clases-form.service';

describe('AlumnoClases Form Service', () => {
  let service: AlumnoClasesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoClasesFormService);
  });

  describe('Service methods', () => {
    describe('createAlumnoClasesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlumnoClasesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clasesTotales: expect.any(Object),
            clasesProgramadas: expect.any(Object),
            clasesRealizadas: expect.any(Object),
          })
        );
      });

      it('passing IAlumnoClases should create a new form with FormGroup', () => {
        const formGroup = service.createAlumnoClasesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clasesTotales: expect.any(Object),
            clasesProgramadas: expect.any(Object),
            clasesRealizadas: expect.any(Object),
          })
        );
      });
    });

    describe('getAlumnoClases', () => {
      it('should return NewAlumnoClases for default AlumnoClases initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlumnoClasesFormGroup(sampleWithNewData);

        const alumnoClases = service.getAlumnoClases(formGroup) as any;

        expect(alumnoClases).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlumnoClases for empty AlumnoClases initial value', () => {
        const formGroup = service.createAlumnoClasesFormGroup();

        const alumnoClases = service.getAlumnoClases(formGroup) as any;

        expect(alumnoClases).toMatchObject({});
      });

      it('should return IAlumnoClases', () => {
        const formGroup = service.createAlumnoClasesFormGroup(sampleWithRequiredData);

        const alumnoClases = service.getAlumnoClases(formGroup) as any;

        expect(alumnoClases).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlumnoClases should not enable id FormControl', () => {
        const formGroup = service.createAlumnoClasesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlumnoClases should disable id FormControl', () => {
        const formGroup = service.createAlumnoClasesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
