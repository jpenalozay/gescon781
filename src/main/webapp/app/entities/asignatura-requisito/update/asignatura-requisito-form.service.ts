import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAsignaturaRequisito, NewAsignaturaRequisito } from '../asignatura-requisito.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAsignaturaRequisito for edit and NewAsignaturaRequisitoFormGroupInput for create.
 */
type AsignaturaRequisitoFormGroupInput = IAsignaturaRequisito | PartialWithRequiredKeyOf<NewAsignaturaRequisito>;

type AsignaturaRequisitoFormDefaults = Pick<NewAsignaturaRequisito, 'id' | 'asignaturas'>;

type AsignaturaRequisitoFormGroupContent = {
  id: FormControl<IAsignaturaRequisito['id'] | NewAsignaturaRequisito['id']>;
  activo: FormControl<IAsignaturaRequisito['activo']>;
  tipo: FormControl<IAsignaturaRequisito['tipo']>;
  nombre: FormControl<IAsignaturaRequisito['nombre']>;
  descripcion: FormControl<IAsignaturaRequisito['descripcion']>;
  imagen: FormControl<IAsignaturaRequisito['imagen']>;
  imagenContentType: FormControl<IAsignaturaRequisito['imagenContentType']>;
  asignaturas: FormControl<IAsignaturaRequisito['asignaturas']>;
};

export type AsignaturaRequisitoFormGroup = FormGroup<AsignaturaRequisitoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AsignaturaRequisitoFormService {
  createAsignaturaRequisitoFormGroup(asignaturaRequisito: AsignaturaRequisitoFormGroupInput = { id: null }): AsignaturaRequisitoFormGroup {
    const asignaturaRequisitoRawValue = {
      ...this.getFormDefaults(),
      ...asignaturaRequisito,
    };
    return new FormGroup<AsignaturaRequisitoFormGroupContent>({
      id: new FormControl(
        { value: asignaturaRequisitoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(asignaturaRequisitoRawValue.activo, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(asignaturaRequisitoRawValue.tipo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(asignaturaRequisitoRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(asignaturaRequisitoRawValue.descripcion, {
        validators: [Validators.minLength(2), Validators.maxLength(512)],
      }),
      imagen: new FormControl(asignaturaRequisitoRawValue.imagen),
      imagenContentType: new FormControl(asignaturaRequisitoRawValue.imagenContentType),
      asignaturas: new FormControl(asignaturaRequisitoRawValue.asignaturas ?? []),
    });
  }

  getAsignaturaRequisito(form: AsignaturaRequisitoFormGroup): IAsignaturaRequisito | NewAsignaturaRequisito {
    return form.getRawValue() as IAsignaturaRequisito | NewAsignaturaRequisito;
  }

  resetForm(form: AsignaturaRequisitoFormGroup, asignaturaRequisito: AsignaturaRequisitoFormGroupInput): void {
    const asignaturaRequisitoRawValue = { ...this.getFormDefaults(), ...asignaturaRequisito };
    form.reset(
      {
        ...asignaturaRequisitoRawValue,
        id: { value: asignaturaRequisitoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AsignaturaRequisitoFormDefaults {
    return {
      id: null,
      asignaturas: [],
    };
  }
}
