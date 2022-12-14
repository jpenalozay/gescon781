import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlumnoUsuario, NewAlumnoUsuario } from '../alumno-usuario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlumnoUsuario for edit and NewAlumnoUsuarioFormGroupInput for create.
 */
type AlumnoUsuarioFormGroupInput = IAlumnoUsuario | PartialWithRequiredKeyOf<NewAlumnoUsuario>;

type AlumnoUsuarioFormDefaults = Pick<NewAlumnoUsuario, 'id'>;

type AlumnoUsuarioFormGroupContent = {
  id: FormControl<IAlumnoUsuario['id'] | NewAlumnoUsuario['id']>;
  activo: FormControl<IAlumnoUsuario['activo']>;
  usuario: FormControl<IAlumnoUsuario['usuario']>;
  clave: FormControl<IAlumnoUsuario['clave']>;
  imagen: FormControl<IAlumnoUsuario['imagen']>;
  imagenContentType: FormControl<IAlumnoUsuario['imagenContentType']>;
  alumno: FormControl<IAlumnoUsuario['alumno']>;
};

export type AlumnoUsuarioFormGroup = FormGroup<AlumnoUsuarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlumnoUsuarioFormService {
  createAlumnoUsuarioFormGroup(alumnoUsuario: AlumnoUsuarioFormGroupInput = { id: null }): AlumnoUsuarioFormGroup {
    const alumnoUsuarioRawValue = {
      ...this.getFormDefaults(),
      ...alumnoUsuario,
    };
    return new FormGroup<AlumnoUsuarioFormGroupContent>({
      id: new FormControl(
        { value: alumnoUsuarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(alumnoUsuarioRawValue.activo),
      usuario: new FormControl(alumnoUsuarioRawValue.usuario, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(128)],
      }),
      clave: new FormControl(alumnoUsuarioRawValue.clave, {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(128)],
      }),
      imagen: new FormControl(alumnoUsuarioRawValue.imagen),
      imagenContentType: new FormControl(alumnoUsuarioRawValue.imagenContentType),
      alumno: new FormControl(alumnoUsuarioRawValue.alumno, {
        validators: [Validators.required],
      }),
    });
  }

  getAlumnoUsuario(form: AlumnoUsuarioFormGroup): IAlumnoUsuario | NewAlumnoUsuario {
    return form.getRawValue() as IAlumnoUsuario | NewAlumnoUsuario;
  }

  resetForm(form: AlumnoUsuarioFormGroup, alumnoUsuario: AlumnoUsuarioFormGroupInput): void {
    const alumnoUsuarioRawValue = { ...this.getFormDefaults(), ...alumnoUsuario };
    form.reset(
      {
        ...alumnoUsuarioRawValue,
        id: { value: alumnoUsuarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlumnoUsuarioFormDefaults {
    return {
      id: null,
    };
  }
}
