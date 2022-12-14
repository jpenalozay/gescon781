import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAsignaturaAdiciones, NewAsignaturaAdiciones } from '../asignatura-adiciones.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAsignaturaAdiciones for edit and NewAsignaturaAdicionesFormGroupInput for create.
 */
type AsignaturaAdicionesFormGroupInput = IAsignaturaAdiciones | PartialWithRequiredKeyOf<NewAsignaturaAdiciones>;

type AsignaturaAdicionesFormDefaults = Pick<NewAsignaturaAdiciones, 'id' | 'asignaturas'>;

type AsignaturaAdicionesFormGroupContent = {
  id: FormControl<IAsignaturaAdiciones['id'] | NewAsignaturaAdiciones['id']>;
  activo: FormControl<IAsignaturaAdiciones['activo']>;
  nombre: FormControl<IAsignaturaAdiciones['nombre']>;
  nombreCorto: FormControl<IAsignaturaAdiciones['nombreCorto']>;
  descripcion: FormControl<IAsignaturaAdiciones['descripcion']>;
  imagen: FormControl<IAsignaturaAdiciones['imagen']>;
  imagenContentType: FormControl<IAsignaturaAdiciones['imagenContentType']>;
  asignaturas: FormControl<IAsignaturaAdiciones['asignaturas']>;
};

export type AsignaturaAdicionesFormGroup = FormGroup<AsignaturaAdicionesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AsignaturaAdicionesFormService {
  createAsignaturaAdicionesFormGroup(asignaturaAdiciones: AsignaturaAdicionesFormGroupInput = { id: null }): AsignaturaAdicionesFormGroup {
    const asignaturaAdicionesRawValue = {
      ...this.getFormDefaults(),
      ...asignaturaAdiciones,
    };
    return new FormGroup<AsignaturaAdicionesFormGroupContent>({
      id: new FormControl(
        { value: asignaturaAdicionesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(asignaturaAdicionesRawValue.activo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(asignaturaAdicionesRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      }),
      nombreCorto: new FormControl(asignaturaAdicionesRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(asignaturaAdicionesRawValue.descripcion, {
        validators: [Validators.minLength(2), Validators.maxLength(512)],
      }),
      imagen: new FormControl(asignaturaAdicionesRawValue.imagen),
      imagenContentType: new FormControl(asignaturaAdicionesRawValue.imagenContentType),
      asignaturas: new FormControl(asignaturaAdicionesRawValue.asignaturas ?? []),
    });
  }

  getAsignaturaAdiciones(form: AsignaturaAdicionesFormGroup): IAsignaturaAdiciones | NewAsignaturaAdiciones {
    return form.getRawValue() as IAsignaturaAdiciones | NewAsignaturaAdiciones;
  }

  resetForm(form: AsignaturaAdicionesFormGroup, asignaturaAdiciones: AsignaturaAdicionesFormGroupInput): void {
    const asignaturaAdicionesRawValue = { ...this.getFormDefaults(), ...asignaturaAdiciones };
    form.reset(
      {
        ...asignaturaAdicionesRawValue,
        id: { value: asignaturaAdicionesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AsignaturaAdicionesFormDefaults {
    return {
      id: null,
      asignaturas: [],
    };
  }
}
