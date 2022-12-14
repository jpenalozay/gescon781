import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../sucursal-serie.test-samples';

import { SucursalSerieFormService } from './sucursal-serie-form.service';

describe('SucursalSerie Form Service', () => {
  let service: SucursalSerieFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalSerieFormService);
  });

  describe('Service methods', () => {
    describe('createSucursalSerieFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSucursalSerieFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipoDocumento: expect.any(Object),
            serie: expect.any(Object),
            fechaEmision: expect.any(Object),
            numeroMaximo: expect.any(Object),
            numeroUltimo: expect.any(Object),
            sucursal: expect.any(Object),
          })
        );
      });

      it('passing ISucursalSerie should create a new form with FormGroup', () => {
        const formGroup = service.createSucursalSerieFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            tipoDocumento: expect.any(Object),
            serie: expect.any(Object),
            fechaEmision: expect.any(Object),
            numeroMaximo: expect.any(Object),
            numeroUltimo: expect.any(Object),
            sucursal: expect.any(Object),
          })
        );
      });
    });

    describe('getSucursalSerie', () => {
      it('should return NewSucursalSerie for default SucursalSerie initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSucursalSerieFormGroup(sampleWithNewData);

        const sucursalSerie = service.getSucursalSerie(formGroup) as any;

        expect(sucursalSerie).toMatchObject(sampleWithNewData);
      });

      it('should return NewSucursalSerie for empty SucursalSerie initial value', () => {
        const formGroup = service.createSucursalSerieFormGroup();

        const sucursalSerie = service.getSucursalSerie(formGroup) as any;

        expect(sucursalSerie).toMatchObject({});
      });

      it('should return ISucursalSerie', () => {
        const formGroup = service.createSucursalSerieFormGroup(sampleWithRequiredData);

        const sucursalSerie = service.getSucursalSerie(formGroup) as any;

        expect(sucursalSerie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISucursalSerie should not enable id FormControl', () => {
        const formGroup = service.createSucursalSerieFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSucursalSerie should disable id FormControl', () => {
        const formGroup = service.createSucursalSerieFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
