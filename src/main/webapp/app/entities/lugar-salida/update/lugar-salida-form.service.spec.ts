import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../lugar-salida.test-samples';

import { LugarSalidaFormService } from './lugar-salida-form.service';

describe('LugarSalida Form Service', () => {
  let service: LugarSalidaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LugarSalidaFormService);
  });

  describe('Service methods', () => {
    describe('createLugarSalidaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLugarSalidaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
          })
        );
      });

      it('passing ILugarSalida should create a new form with FormGroup', () => {
        const formGroup = service.createLugarSalidaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
          })
        );
      });
    });

    describe('getLugarSalida', () => {
      it('should return NewLugarSalida for default LugarSalida initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLugarSalidaFormGroup(sampleWithNewData);

        const lugarSalida = service.getLugarSalida(formGroup) as any;

        expect(lugarSalida).toMatchObject(sampleWithNewData);
      });

      it('should return NewLugarSalida for empty LugarSalida initial value', () => {
        const formGroup = service.createLugarSalidaFormGroup();

        const lugarSalida = service.getLugarSalida(formGroup) as any;

        expect(lugarSalida).toMatchObject({});
      });

      it('should return ILugarSalida', () => {
        const formGroup = service.createLugarSalidaFormGroup(sampleWithRequiredData);

        const lugarSalida = service.getLugarSalida(formGroup) as any;

        expect(lugarSalida).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILugarSalida should not enable id FormControl', () => {
        const formGroup = service.createLugarSalidaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLugarSalida should disable id FormControl', () => {
        const formGroup = service.createLugarSalidaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
