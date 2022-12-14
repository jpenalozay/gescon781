import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dia.test-samples';

import { DiaFormService } from './dia-form.service';

describe('Dia Form Service', () => {
  let service: DiaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaFormService);
  });

  describe('Service methods', () => {
    describe('createDiaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDiaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            programacions: expect.any(Object),
          })
        );
      });

      it('passing IDia should create a new form with FormGroup', () => {
        const formGroup = service.createDiaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            nombreCorto: expect.any(Object),
            programacions: expect.any(Object),
          })
        );
      });
    });

    describe('getDia', () => {
      it('should return NewDia for default Dia initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDiaFormGroup(sampleWithNewData);

        const dia = service.getDia(formGroup) as any;

        expect(dia).toMatchObject(sampleWithNewData);
      });

      it('should return NewDia for empty Dia initial value', () => {
        const formGroup = service.createDiaFormGroup();

        const dia = service.getDia(formGroup) as any;

        expect(dia).toMatchObject({});
      });

      it('should return IDia', () => {
        const formGroup = service.createDiaFormGroup(sampleWithRequiredData);

        const dia = service.getDia(formGroup) as any;

        expect(dia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDia should not enable id FormControl', () => {
        const formGroup = service.createDiaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDia should disable id FormControl', () => {
        const formGroup = service.createDiaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
