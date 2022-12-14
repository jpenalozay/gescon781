import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDia, NewDia } from '../dia.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDia for edit and NewDiaFormGroupInput for create.
 */
type DiaFormGroupInput = IDia | PartialWithRequiredKeyOf<NewDia>;

type DiaFormDefaults = Pick<NewDia, 'id' | 'programacions'>;

type DiaFormGroupContent = {
  id: FormControl<IDia['id'] | NewDia['id']>;
  nombre: FormControl<IDia['nombre']>;
  nombreCorto: FormControl<IDia['nombreCorto']>;
  programacions: FormControl<IDia['programacions']>;
};

export type DiaFormGroup = FormGroup<DiaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DiaFormService {
  createDiaFormGroup(dia: DiaFormGroupInput = { id: null }): DiaFormGroup {
    const diaRawValue = {
      ...this.getFormDefaults(),
      ...dia,
    };
    return new FormGroup<DiaFormGroupContent>({
      id: new FormControl(
        { value: diaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombre: new FormControl(diaRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)],
      }),
      nombreCorto: new FormControl(diaRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      }),
      programacions: new FormControl(diaRawValue.programacions ?? []),
    });
  }

  getDia(form: DiaFormGroup): IDia | NewDia {
    return form.getRawValue() as IDia | NewDia;
  }

  resetForm(form: DiaFormGroup, dia: DiaFormGroupInput): void {
    const diaRawValue = { ...this.getFormDefaults(), ...dia };
    form.reset(
      {
        ...diaRawValue,
        id: { value: diaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DiaFormDefaults {
    return {
      id: null,
      programacions: [],
    };
  }
}
