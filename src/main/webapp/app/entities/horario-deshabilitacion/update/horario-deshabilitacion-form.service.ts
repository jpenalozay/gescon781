import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHorarioDeshabilitacion, NewHorarioDeshabilitacion } from '../horario-deshabilitacion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorarioDeshabilitacion for edit and NewHorarioDeshabilitacionFormGroupInput for create.
 */
type HorarioDeshabilitacionFormGroupInput = IHorarioDeshabilitacion | PartialWithRequiredKeyOf<NewHorarioDeshabilitacion>;

type HorarioDeshabilitacionFormDefaults = Pick<NewHorarioDeshabilitacion, 'id'>;

type HorarioDeshabilitacionFormGroupContent = {
  id: FormControl<IHorarioDeshabilitacion['id'] | NewHorarioDeshabilitacion['id']>;
  activo: FormControl<IHorarioDeshabilitacion['activo']>;
  tipo: FormControl<IHorarioDeshabilitacion['tipo']>;
  programacionDeshabilitacion: FormControl<IHorarioDeshabilitacion['programacionDeshabilitacion']>;
  horario: FormControl<IHorarioDeshabilitacion['horario']>;
};

export type HorarioDeshabilitacionFormGroup = FormGroup<HorarioDeshabilitacionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioDeshabilitacionFormService {
  createHorarioDeshabilitacionFormGroup(
    horarioDeshabilitacion: HorarioDeshabilitacionFormGroupInput = { id: null }
  ): HorarioDeshabilitacionFormGroup {
    const horarioDeshabilitacionRawValue = {
      ...this.getFormDefaults(),
      ...horarioDeshabilitacion,
    };
    return new FormGroup<HorarioDeshabilitacionFormGroupContent>({
      id: new FormControl(
        { value: horarioDeshabilitacionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(horarioDeshabilitacionRawValue.activo, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(horarioDeshabilitacionRawValue.tipo, {
        validators: [Validators.required],
      }),
      programacionDeshabilitacion: new FormControl(horarioDeshabilitacionRawValue.programacionDeshabilitacion, {
        validators: [Validators.required],
      }),
      horario: new FormControl(horarioDeshabilitacionRawValue.horario),
    });
  }

  getHorarioDeshabilitacion(form: HorarioDeshabilitacionFormGroup): IHorarioDeshabilitacion | NewHorarioDeshabilitacion {
    return form.getRawValue() as IHorarioDeshabilitacion | NewHorarioDeshabilitacion;
  }

  resetForm(form: HorarioDeshabilitacionFormGroup, horarioDeshabilitacion: HorarioDeshabilitacionFormGroupInput): void {
    const horarioDeshabilitacionRawValue = { ...this.getFormDefaults(), ...horarioDeshabilitacion };
    form.reset(
      {
        ...horarioDeshabilitacionRawValue,
        id: { value: horarioDeshabilitacionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HorarioDeshabilitacionFormDefaults {
    return {
      id: null,
    };
  }
}
