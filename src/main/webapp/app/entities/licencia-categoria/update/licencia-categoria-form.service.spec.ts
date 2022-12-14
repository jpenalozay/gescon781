import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../licencia-categoria.test-samples';

import { LicenciaCategoriaFormService } from './licencia-categoria-form.service';

describe('LicenciaCategoria Form Service', () => {
  let service: LicenciaCategoriaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenciaCategoriaFormService);
  });

  describe('Service methods', () => {
    describe('createLicenciaCategoriaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoria: expect.any(Object),
            asignaturas: expect.any(Object),
            intructores: expect.any(Object),
          })
        );
      });

      it('passing ILicenciaCategoria should create a new form with FormGroup', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            categoria: expect.any(Object),
            asignaturas: expect.any(Object),
            intructores: expect.any(Object),
          })
        );
      });
    });

    describe('getLicenciaCategoria', () => {
      it('should return NewLicenciaCategoria for default LicenciaCategoria initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createLicenciaCategoriaFormGroup(sampleWithNewData);

        const licenciaCategoria = service.getLicenciaCategoria(formGroup) as any;

        expect(licenciaCategoria).toMatchObject(sampleWithNewData);
      });

      it('should return NewLicenciaCategoria for empty LicenciaCategoria initial value', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup();

        const licenciaCategoria = service.getLicenciaCategoria(formGroup) as any;

        expect(licenciaCategoria).toMatchObject({});
      });

      it('should return ILicenciaCategoria', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup(sampleWithRequiredData);

        const licenciaCategoria = service.getLicenciaCategoria(formGroup) as any;

        expect(licenciaCategoria).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILicenciaCategoria should not enable id FormControl', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLicenciaCategoria should disable id FormControl', () => {
        const formGroup = service.createLicenciaCategoriaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
