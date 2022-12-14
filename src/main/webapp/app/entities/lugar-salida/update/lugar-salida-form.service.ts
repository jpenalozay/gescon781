import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILugarSalida, NewLugarSalida } from '../lugar-salida.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILugarSalida for edit and NewLugarSalidaFormGroupInput for create.
 */
type LugarSalidaFormGroupInput = ILugarSalida | PartialWithRequiredKeyOf<NewLugarSalida>;

type LugarSalidaFormDefaults = Pick<NewLugarSalida, 'id'>;

type LugarSalidaFormGroupContent = {
  id: FormControl<ILugarSalida['id'] | NewLugarSalida['id']>;
  nombre: FormControl<ILugarSalida['nombre']>;
};

export type LugarSalidaFormGroup = FormGroup<LugarSalidaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LugarSalidaFormService {
  createLugarSalidaFormGroup(lugarSalida: LugarSalidaFormGroupInput = { id: null }): LugarSalidaFormGroup {
    const lugarSalidaRawValue = {
      ...this.getFormDefaults(),
      ...lugarSalida,
    };
    return new FormGroup<LugarSalidaFormGroupContent>({
      id: new FormControl(
        { value: lugarSalidaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombre: new FormControl(lugarSalidaRawValue.nombre),
    });
  }

  getLugarSalida(form: LugarSalidaFormGroup): ILugarSalida | NewLugarSalida {
    return form.getRawValue() as ILugarSalida | NewLugarSalida;
  }

  resetForm(form: LugarSalidaFormGroup, lugarSalida: LugarSalidaFormGroupInput): void {
    const lugarSalidaRawValue = { ...this.getFormDefaults(), ...lugarSalida };
    form.reset(
      {
        ...lugarSalidaRawValue,
        id: { value: lugarSalidaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LugarSalidaFormDefaults {
    return {
      id: null,
    };
  }
}
