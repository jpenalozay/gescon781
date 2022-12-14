import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHorario, NewHorario } from '../horario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorario for edit and NewHorarioFormGroupInput for create.
 */
type HorarioFormGroupInput = IHorario | PartialWithRequiredKeyOf<NewHorario>;

type HorarioFormDefaults = Pick<NewHorario, 'id'>;

type HorarioFormGroupContent = {
  id: FormControl<IHorario['id'] | NewHorario['id']>;
  activo: FormControl<IHorario['activo']>;
  tipo: FormControl<IHorario['tipo']>;
  fechaDia: FormControl<IHorario['fechaDia']>;
  fechaDiaSem: FormControl<IHorario['fechaDiaSem']>;
  alumno: FormControl<IHorario['alumno']>;
  instructor: FormControl<IHorario['instructor']>;
  programacion: FormControl<IHorario['programacion']>;
  fecha: FormControl<IHorario['fecha']>;
  horarioCatalogo: FormControl<IHorario['horarioCatalogo']>;
  automovil: FormControl<IHorario['automovil']>;
  lugarSalida: FormControl<IHorario['lugarSalida']>;
};

export type HorarioFormGroup = FormGroup<HorarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioFormService {
  createHorarioFormGroup(horario: HorarioFormGroupInput = { id: null }): HorarioFormGroup {
    const horarioRawValue = {
      ...this.getFormDefaults(),
      ...horario,
    };
    return new FormGroup<HorarioFormGroupContent>({
      id: new FormControl(
        { value: horarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(horarioRawValue.activo, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(horarioRawValue.tipo, {
        validators: [Validators.required],
      }),
      fechaDia: new FormControl(horarioRawValue.fechaDia),
      fechaDiaSem: new FormControl(horarioRawValue.fechaDiaSem, {
        validators: [Validators.min(1), Validators.max(7)],
      }),
      alumno: new FormControl(horarioRawValue.alumno),
      instructor: new FormControl(horarioRawValue.instructor),
      programacion: new FormControl(horarioRawValue.programacion, {
        validators: [Validators.required],
      }),
      fecha: new FormControl(horarioRawValue.fecha, {
        validators: [Validators.required],
      }),
      horarioCatalogo: new FormControl(horarioRawValue.horarioCatalogo, {
        validators: [Validators.required],
      }),
      automovil: new FormControl(horarioRawValue.automovil, {
        validators: [Validators.required],
      }),
      lugarSalida: new FormControl(horarioRawValue.lugarSalida),
    });
  }

  getHorario(form: HorarioFormGroup): IHorario | NewHorario {
    return form.getRawValue() as IHorario | NewHorario;
  }

  resetForm(form: HorarioFormGroup, horario: HorarioFormGroupInput): void {
    const horarioRawValue = { ...this.getFormDefaults(), ...horario };
    form.reset(
      {
        ...horarioRawValue,
        id: { value: horarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HorarioFormDefaults {
    return {
      id: null,
    };
  }
}
