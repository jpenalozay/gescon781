import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alumno-categoria.test-samples';

import { AlumnoCategoriaFormService } from './alumno-categoria-form.service';

describe('AlumnoCategoria Form Service', () => {
  let service: AlumnoCategoriaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoCategoriaFormService);
  });

  describe('Service methods', () => {
    describe('createAlumnoCategoriaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenciaNumeroAlumno: expect.any(Object),
            alumno: expect.any(Object),
            categoria: expect.any(Object),
          })
        );
      });

      it('passing IAlumnoCategoria should create a new form with FormGroup', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            licenciaNumeroAlumno: expect.any(Object),
            alumno: expect.any(Object),
            categoria: expect.any(Object),
          })
        );
      });
    });

    describe('getAlumnoCategoria', () => {
      it('should return NewAlumnoCategoria for default AlumnoCategoria initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlumnoCategoriaFormGroup(sampleWithNewData);

        const alumnoCategoria = service.getAlumnoCategoria(formGroup) as any;

        expect(alumnoCategoria).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlumnoCategoria for empty AlumnoCategoria initial value', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup();

        const alumnoCategoria = service.getAlumnoCategoria(formGroup) as any;

        expect(alumnoCategoria).toMatchObject({});
      });

      it('should return IAlumnoCategoria', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup(sampleWithRequiredData);

        const alumnoCategoria = service.getAlumnoCategoria(formGroup) as any;

        expect(alumnoCategoria).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlumnoCategoria should not enable id FormControl', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlumnoCategoria should disable id FormControl', () => {
        const formGroup = service.createAlumnoCategoriaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
