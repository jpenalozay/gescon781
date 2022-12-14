import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../alumno-desarrollo.test-samples';

import { AlumnoDesarrolloFormService } from './alumno-desarrollo-form.service';

describe('AlumnoDesarrollo Form Service', () => {
  let service: AlumnoDesarrolloFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoDesarrolloFormService);
  });

  describe('Service methods', () => {
    describe('createAlumnoDesarrolloFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clasesTeoriaProgramadas: expect.any(Object),
            clasesPracticasProgramas: expect.any(Object),
            clasesInasistenciaTeoria: expect.any(Object),
            clasesInasistenciaPractica: expect.any(Object),
            clasesRealizadasTeoria: expect.any(Object),
            clasesRealizadasPractica: expect.any(Object),
            alumnoDesarrolloEstado: expect.any(Object),
          })
        );
      });

      it('passing IAlumnoDesarrollo should create a new form with FormGroup', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            clasesTeoriaProgramadas: expect.any(Object),
            clasesPracticasProgramas: expect.any(Object),
            clasesInasistenciaTeoria: expect.any(Object),
            clasesInasistenciaPractica: expect.any(Object),
            clasesRealizadasTeoria: expect.any(Object),
            clasesRealizadasPractica: expect.any(Object),
            alumnoDesarrolloEstado: expect.any(Object),
          })
        );
      });
    });

    describe('getAlumnoDesarrollo', () => {
      it('should return NewAlumnoDesarrollo for default AlumnoDesarrollo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAlumnoDesarrolloFormGroup(sampleWithNewData);

        const alumnoDesarrollo = service.getAlumnoDesarrollo(formGroup) as any;

        expect(alumnoDesarrollo).toMatchObject(sampleWithNewData);
      });

      it('should return NewAlumnoDesarrollo for empty AlumnoDesarrollo initial value', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup();

        const alumnoDesarrollo = service.getAlumnoDesarrollo(formGroup) as any;

        expect(alumnoDesarrollo).toMatchObject({});
      });

      it('should return IAlumnoDesarrollo', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup(sampleWithRequiredData);

        const alumnoDesarrollo = service.getAlumnoDesarrollo(formGroup) as any;

        expect(alumnoDesarrollo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAlumnoDesarrollo should not enable id FormControl', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAlumnoDesarrollo should disable id FormControl', () => {
        const formGroup = service.createAlumnoDesarrolloFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
