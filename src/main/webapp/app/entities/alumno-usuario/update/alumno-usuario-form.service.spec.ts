import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alumno-usuario.test-samples';

import { AlumnoUsuarioFormService } from './alumno-usuario-form.service';

describe('AlumnoUsuario Form Service', () => {
  let service: AlumnoUsuarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoUsuarioFormService);
  });

  describe('Service methods', () => {
    describe('createAlumnoUsuarioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            usuario: expect.any(Object),
            clave: expect.any(Object),
            imagen: expect.any(Object),
            alumno: expect.any(Object),
          })
        );
      });

      it('passing IAlumnoUsuario should create a new form with FormGroup', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            usuario: expect.any(Object),
            clave: expect.any(Object),
            imagen: expect.any(Object),
            alumno: expect.any(Object),
          })
        );
      });
    });

    describe('getAlumnoUsuario', () => {
      it('should return NewAlumnoUsuario for default AlumnoUsuario initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlumnoUsuarioFormGroup(sampleWithNewData);

        const alumnoUsuario = service.getAlumnoUsuario(formGroup) as any;

        expect(alumnoUsuario).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlumnoUsuario for empty AlumnoUsuario initial value', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup();

        const alumnoUsuario = service.getAlumnoUsuario(formGroup) as any;

        expect(alumnoUsuario).toMatchObject({});
      });

      it('should return IAlumnoUsuario', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup(sampleWithRequiredData);

        const alumnoUsuario = service.getAlumnoUsuario(formGroup) as any;

        expect(alumnoUsuario).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlumnoUsuario should not enable id FormControl', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlumnoUsuario should disable id FormControl', () => {
        const formGroup = service.createAlumnoUsuarioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
