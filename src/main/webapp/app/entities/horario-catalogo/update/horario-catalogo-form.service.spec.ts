import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../horario-catalogo.test-samples';

import { HorarioCatalogoFormService } from './horario-catalogo-form.service';

describe('HorarioCatalogo Form Service', () => {
  let service: HorarioCatalogoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioCatalogoFormService);
  });

  describe('Service methods', () => {
    describe('createHorarioCatalogoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHorarioCatalogoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
            descripcion: expect.any(Object),
            programacions: expect.any(Object),
            programacionDeshabilitaciones: expect.any(Object),
          })
        );
      });

      it('passing IHorarioCatalogo should create a new form with FormGroup', () => {
        const formGroup = service.createHorarioCatalogoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activo: expect.any(Object),
            codigo: expect.any(Object),
            horaInicio: expect.any(Object),
            horaFin: expect.any(Object),
            descripcion: expect.any(Object),
            programacions: expect.any(Object),
            programacionDeshabilitaciones: expect.any(Object),
          })
        );
      });
    });

    describe('getHorarioCatalogo', () => {
      it('should return NewHorarioCatalogo for default HorarioCatalogo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHorarioCatalogoFormGroup(sampleWithNewData);

        const horarioCatalogo = service.getHorarioCatalogo(formGroup) as any;

        expect(horarioCatalogo).toMatchObject(sampleWithNewData);
      });

      it('should return NewHorarioCatalogo for empty HorarioCatalogo initial value', () => {
        const formGroup = service.createHorarioCatalogoFormGroup();

        const horarioCatalogo = service.getHorarioCatalogo(formGroup) as any;

        expect(horarioCatalogo).toMatchObject({});
      });

      it('should return IHorarioCatalogo', () => {
        const formGroup = service.createHorarioCatalogoFormGroup(sampleWithRequiredData);

        const horarioCatalogo = service.getHorarioCatalogo(formGroup) as any;

        expect(horarioCatalogo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHorarioCatalogo should not enable id FormControl', () => {
        const formGroup = service.createHorarioCatalogoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHorarioCatalogo should disable id FormControl', () => {
        const formGroup = service.createHorarioCatalogoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
