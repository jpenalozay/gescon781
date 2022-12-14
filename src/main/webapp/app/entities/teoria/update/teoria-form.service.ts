import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeoria, NewTeoria } from '../teoria.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeoria for edit and NewTeoriaFormGroupInput for create.
 */
type TeoriaFormGroupInput = ITeoria | PartialWithRequiredKeyOf<NewTeoria>;

type TeoriaFormDefaults = Pick<NewTeoria, 'id' | 'horarios'>;

type TeoriaFormGroupContent = {
  id: FormControl<ITeoria['id'] | NewTeoria['id']>;
  activo: FormControl<ITeoria['activo']>;
  nombre: FormControl<ITeoria['nombre']>;
  nombreCorto: FormControl<ITeoria['nombreCorto']>;
  descripcion: FormControl<ITeoria['descripcion']>;
  imagen: FormControl<ITeoria['imagen']>;
  imagenContentType: FormControl<ITeoria['imagenContentType']>;
  horarios: FormControl<ITeoria['horarios']>;
};

export type TeoriaFormGroup = FormGroup<TeoriaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeoriaFormService {
  createTeoriaFormGroup(teoria: TeoriaFormGroupInput = { id: null }): TeoriaFormGroup {
    const teoriaRawValue = {
      ...this.getFormDefaults(),
      ...teoria,
    };
    return new FormGroup<TeoriaFormGroupContent>({
      id: new FormControl(
        { value: teoriaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(teoriaRawValue.activo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(teoriaRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      nombreCorto: new FormControl(teoriaRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(teoriaRawValue.descripcion, {
        validators: [Validators.minLength(2), Validators.maxLength(512)],
      }),
      imagen: new FormControl(teoriaRawValue.imagen),
      imagenContentType: new FormControl(teoriaRawValue.imagenContentType),
      horarios: new FormControl(teoriaRawValue.horarios ?? []),
    });
  }

  getTeoria(form: TeoriaFormGroup): ITeoria | NewTeoria {
    return form.getRawValue() as ITeoria | NewTeoria;
  }

  resetForm(form: TeoriaFormGroup, teoria: TeoriaFormGroupInput): void {
    const teoriaRawValue = { ...this.getFormDefaults(), ...teoria };
    form.reset(
      {
        ...teoriaRawValue,
        id: { value: teoriaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TeoriaFormDefaults {
    return {
      id: null,
      horarios: [],
    };
  }
}
