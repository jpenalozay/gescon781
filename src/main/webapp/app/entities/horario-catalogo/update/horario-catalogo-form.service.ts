import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHorarioCatalogo, NewHorarioCatalogo } from '../horario-catalogo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHorarioCatalogo for edit and NewHorarioCatalogoFormGroupInput for create.
 */
type HorarioCatalogoFormGroupInput = IHorarioCatalogo | PartialWithRequiredKeyOf<NewHorarioCatalogo>;

type HorarioCatalogoFormDefaults = Pick<NewHorarioCatalogo, 'id' | 'programacions' | 'programacionDeshabilitaciones'>;

type HorarioCatalogoFormGroupContent = {
  id: FormControl<IHorarioCatalogo['id'] | NewHorarioCatalogo['id']>;
  activo: FormControl<IHorarioCatalogo['activo']>;
  codigo: FormControl<IHorarioCatalogo['codigo']>;
  horaInicio: FormControl<IHorarioCatalogo['horaInicio']>;
  horaFin: FormControl<IHorarioCatalogo['horaFin']>;
  descripcion: FormControl<IHorarioCatalogo['descripcion']>;
  programacions: FormControl<IHorarioCatalogo['programacions']>;
  programacionDeshabilitaciones: FormControl<IHorarioCatalogo['programacionDeshabilitaciones']>;
};

export type HorarioCatalogoFormGroup = FormGroup<HorarioCatalogoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HorarioCatalogoFormService {
  createHorarioCatalogoFormGroup(horarioCatalogo: HorarioCatalogoFormGroupInput = { id: null }): HorarioCatalogoFormGroup {
    const horarioCatalogoRawValue = {
      ...this.getFormDefaults(),
      ...horarioCatalogo,
    };
    return new FormGroup<HorarioCatalogoFormGroupContent>({
      id: new FormControl(
        { value: horarioCatalogoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(horarioCatalogoRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(horarioCatalogoRawValue.codigo, {
        validators: [Validators.required, Validators.min(1), Validators.max(99)],
      }),
      horaInicio: new FormControl(horarioCatalogoRawValue.horaInicio, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
      }),
      horaFin: new FormControl(horarioCatalogoRawValue.horaFin, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
      }),
      descripcion: new FormControl(horarioCatalogoRawValue.descripcion, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(16)],
      }),
      programacions: new FormControl(horarioCatalogoRawValue.programacions ?? []),
      programacionDeshabilitaciones: new FormControl(horarioCatalogoRawValue.programacionDeshabilitaciones ?? []),
    });
  }

  getHorarioCatalogo(form: HorarioCatalogoFormGroup): IHorarioCatalogo | NewHorarioCatalogo {
    return form.getRawValue() as IHorarioCatalogo | NewHorarioCatalogo;
  }

  resetForm(form: HorarioCatalogoFormGroup, horarioCatalogo: HorarioCatalogoFormGroupInput): void {
    const horarioCatalogoRawValue = { ...this.getFormDefaults(), ...horarioCatalogo };
    form.reset(
      {
        ...horarioCatalogoRawValue,
        id: { value: horarioCatalogoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HorarioCatalogoFormDefaults {
    return {
      id: null,
      programacions: [],
      programacionDeshabilitaciones: [],
    };
  }
}
