import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../teoria-horario-catalogo.test-samples';

import { TeoriaHorarioCatalogoFormService } from './teoria-horario-catalogo-form.service';

describe('TeoriaHorarioCatalogo Form Service', () => {
  let service: TeoriaHorarioCatalogoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeoriaHorarioCatalogoFormService);
  });

  describe('Service methods', () => {
    describe('createTeoriaHorarioCatalogoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            periodo: expect.any(Object),
            anio: expect.any(Object),
            mes: expect.any(Object),
            dia: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
            teorias: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });

      it('passing ITeoriaHorarioCatalogo should create a new form with FormGroup', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            periodo: expect.any(Object),
            anio: expect.any(Object),
            mes: expect.any(Object),
            dia: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
            teorias: expect.any(Object),
            asignaturas: expect.any(Object),
          })
        );
      });
    });

    describe('getTeoriaHorarioCatalogo', () => {
      it('should return NewTeoriaHorarioCatalogo for default TeoriaHorarioCatalogo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup(sampleWithNewData);

        const teoriaHorarioCatalogo = service.getTeoriaHorarioCatalogo(formGroup) as any;

        expect(teoriaHorarioCatalogo).toMatchObject(sampleWithNewData);
      });

      it('should return NewTeoriaHorarioCatalogo for empty TeoriaHorarioCatalogo initial value', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup();

        const teoriaHorarioCatalogo = service.getTeoriaHorarioCatalogo(formGroup) as any;

        expect(teoriaHorarioCatalogo).toMatchObject({});
      });

      it('should return ITeoriaHorarioCatalogo', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup(sampleWithRequiredData);

        const teoriaHorarioCatalogo = service.getTeoriaHorarioCatalogo(formGroup) as any;

        expect(teoriaHorarioCatalogo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITeoriaHorarioCatalogo should not enable id FormControl', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTeoriaHorarioCatalogo should disable id FormControl', () => {
        const formGroup = service.createTeoriaHorarioCatalogoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
