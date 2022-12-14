import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../asignatura.test-samples';

import { AsignaturaFormService } from './asignatura-form.service';

describe('Asignatura Form Service', () => {
  let service: AsignaturaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaturaFormService);
  });

  describe('Service methods', () => {
    describe('createAsignaturaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAsignaturaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            documento: expect.any(Object),
            horasTeoricas: expect.any(Object),
            horasPracticas: expect.any(Object),
            numeroClasesTeoria: expect.any(Object),
            numeroClasesPractica: expect.any(Object),
            vigencia: expect.any(Object),
            costo: expect.any(Object),
            imagen: expect.any(Object),
            categorias: expect.any(Object),
            adicionals: expect.any(Object),
            horarios: expect.any(Object),
            asignaturaRequisitos: expect.any(Object),
            curso: expect.any(Object),
          })
        );
      });

      it('passing IAsignatura should create a new form with FormGroup', () => {
        const formGroup = service.createAsignaturaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            documento: expect.any(Object),
            horasTeoricas: expect.any(Object),
            horasPracticas: expect.any(Object),
            numeroClasesTeoria: expect.any(Object),
            numeroClasesPractica: expect.any(Object),
            vigencia: expect.any(Object),
            costo: expect.any(Object),
            imagen: expect.any(Object),
            categorias: expect.any(Object),
            adicionals: expect.any(Object),
            horarios: expect.any(Object),
            asignaturaRequisitos: expect.any(Object),
            curso: expect.any(Object),
          })
        );
      });
    });

    describe('getAsignatura', () => {
      it('should return NewAsignatura for default Asignatura initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAsignaturaFormGroup(sampleWithNewData);

        const asignatura = service.getAsignatura(formGroup) as any;

        expect(asignatura).toMatchObject(sampleWithNewData);
      });

      it('should return NewAsignatura for empty Asignatura initial value', () => {
        const formGroup = service.createAsignaturaFormGroup();

        const asignatura = service.getAsignatura(formGroup) as any;

        expect(asignatura).toMatchObject({});
      });

      it('should return IAsignatura', () => {
        const formGroup = service.createAsignaturaFormGroup(sampleWithRequiredData);

        const asignatura = service.getAsignatura(formGroup) as any;

        expect(asignatura).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAsignatura should not enable id FormControl', () => {
        const formGroup = service.createAsignaturaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAsignatura should disable id FormControl', () => {
        const formGroup = service.createAsignaturaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
