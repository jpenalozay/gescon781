import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlumnoCategoria, NewAlumnoCategoria } from '../alumno-categoria.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlumnoCategoria for edit and NewAlumnoCategoriaFormGroupInput for create.
 */
type AlumnoCategoriaFormGroupInput = IAlumnoCategoria | PartialWithRequiredKeyOf<NewAlumnoCategoria>;

type AlumnoCategoriaFormDefaults = Pick<NewAlumnoCategoria, 'id'>;

type AlumnoCategoriaFormGroupContent = {
  id: FormControl<IAlumnoCategoria['id'] | NewAlumnoCategoria['id']>;
  licenciaNumeroAlumno: FormControl<IAlumnoCategoria['licenciaNumeroAlumno']>;
  alumno: FormControl<IAlumnoCategoria['alumno']>;
  categoria: FormControl<IAlumnoCategoria['categoria']>;
};

export type AlumnoCategoriaFormGroup = FormGroup<AlumnoCategoriaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlumnoCategoriaFormService {
  createAlumnoCategoriaFormGroup(alumnoCategoria: AlumnoCategoriaFormGroupInput = { id: null }): AlumnoCategoriaFormGroup {
    const alumnoCategoriaRawValue = {
      ...this.getFormDefaults(),
      ...alumnoCategoria,
    };
    return new FormGroup<AlumnoCategoriaFormGroupContent>({
      id: new FormControl(
        { value: alumnoCategoriaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      licenciaNumeroAlumno: new FormControl(alumnoCategoriaRawValue.licenciaNumeroAlumno, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)],
      }),
      alumno: new FormControl(alumnoCategoriaRawValue.alumno, {
        validators: [Validators.required],
      }),
      categoria: new FormControl(alumnoCategoriaRawValue.categoria, {
        validators: [Validators.required],
      }),
    });
  }

  getAlumnoCategoria(form: AlumnoCategoriaFormGroup): IAlumnoCategoria | NewAlumnoCategoria {
    return form.getRawValue() as IAlumnoCategoria | NewAlumnoCategoria;
  }

  resetForm(form: AlumnoCategoriaFormGroup, alumnoCategoria: AlumnoCategoriaFormGroupInput): void {
    const alumnoCategoriaRawValue = { ...this.getFormDefaults(), ...alumnoCategoria };
    form.reset(
      {
        ...alumnoCategoriaRawValue,
        id: { value: alumnoCategoriaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlumnoCategoriaFormDefaults {
    return {
      id: null,
    };
  }
}
