import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../teoria.test-samples';

import { TeoriaFormService } from './teoria-form.service';

describe('Teoria Form Service', () => {
  let service: TeoriaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeoriaFormService);
  });

  describe('Service methods', () => {
    describe('createTeoriaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTeoriaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            horarios: expect.any(Object),
          })
        );
      });

      it('passing ITeoria should create a new form with FormGroup', () => {
        const formGroup = service.createTeoriaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            descripcion: expect.any(Object),
            imagen: expect.any(Object),
            horarios: expect.any(Object),
          })
        );
      });
    });

    describe('getTeoria', () => {
      it('should return NewTeoria for default Teoria initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTeoriaFormGroup(sampleWithNewData);

        const teoria = service.getTeoria(formGroup) as any;

        expect(teoria).toMatchObject(sampleWithNewData);
      });

      it('should return NewTeoria for empty Teoria initial value', () => {
        const formGroup = service.createTeoriaFormGroup();

        const teoria = service.getTeoria(formGroup) as any;

        expect(teoria).toMatchObject({});
      });

      it('should return ITeoria', () => {
        const formGroup = service.createTeoriaFormGroup(sampleWithRequiredData);

        const teoria = service.getTeoria(formGroup) as any;

        expect(teoria).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITeoria should not enable id FormControl', () => {
        const formGroup = service.createTeoriaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTeoria should disable id FormControl', () => {
        const formGroup = service.createTeoriaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
