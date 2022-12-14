import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProfesor, NewProfesor } from '../profesor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProfesor for edit and NewProfesorFormGroupInput for create.
 */
type ProfesorFormGroupInput = IProfesor | PartialWithRequiredKeyOf<NewProfesor>;

type ProfesorFormDefaults = Pick<NewProfesor, 'id' | 'licenciasPermitidas'>;

type ProfesorFormGroupContent = {
  id: FormControl<IProfesor['id'] | NewProfesor['id']>;
  activo: FormControl<IProfesor['activo']>;
  codigo: FormControl<IProfesor['codigo']>;
  teoria: FormControl<IProfesor['teoria']>;
  practica: FormControl<IProfesor['practica']>;
  licenciaNumero: FormControl<IProfesor['licenciaNumero']>;
  empleado: FormControl<IProfesor['empleado']>;
  licenciasPermitidas: FormControl<IProfesor['licenciasPermitidas']>;
  licenciaCategoria: FormControl<IProfesor['licenciaCategoria']>;
};

export type ProfesorFormGroup = FormGroup<ProfesorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProfesorFormService {
  createProfesorFormGroup(profesor: ProfesorFormGroupInput = { id: null }): ProfesorFormGroup {
    const profesorRawValue = {
      ...this.getFormDefaults(),
      ...profesor,
    };
    return new FormGroup<ProfesorFormGroupContent>({
      id: new FormControl(
        { value: profesorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(profesorRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(profesorRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(6)],
      }),
      teoria: new FormControl(profesorRawValue.teoria, {
        validators: [Validators.required],
      }),
      practica: new FormControl(profesorRawValue.practica, {
        validators: [Validators.required],
      }),
      licenciaNumero: new FormControl(profesorRawValue.licenciaNumero, {
        validators: [Validators.minLength(2), Validators.maxLength(16)],
      }),
      empleado: new FormControl(profesorRawValue.empleado, {
        validators: [Validators.required],
      }),
      licenciasPermitidas: new FormControl(profesorRawValue.licenciasPermitidas ?? []),
      licenciaCategoria: new FormControl(profesorRawValue.licenciaCategoria),
    });
  }

  getProfesor(form: ProfesorFormGroup): IProfesor | NewProfesor {
    return form.getRawValue() as IProfesor | NewProfesor;
  }

  resetForm(form: ProfesorFormGroup, profesor: ProfesorFormGroupInput): void {
    const profesorRawValue = { ...this.getFormDefaults(), ...profesor };
    form.reset(
      {
        ...profesorRawValue,
        id: { value: profesorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProfesorFormDefaults {
    return {
      id: null,
      licenciasPermitidas: [],
    };
  }
}
