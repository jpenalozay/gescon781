import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlumno, NewAlumno } from '../alumno.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlumno for edit and NewAlumnoFormGroupInput for create.
 */
type AlumnoFormGroupInput = IAlumno | PartialWithRequiredKeyOf<NewAlumno>;

type AlumnoFormDefaults = Pick<NewAlumno, 'id'>;

type AlumnoFormGroupContent = {
  id: FormControl<IAlumno['id'] | NewAlumno['id']>;
  codigo: FormControl<IAlumno['codigo']>;
  estado: FormControl<IAlumno['estado']>;
  tipo: FormControl<IAlumno['tipo']>;
  alumnoGradoInstruccion: FormControl<IAlumno['alumnoGradoInstruccion']>;
  ocupacion: FormControl<IAlumno['ocupacion']>;
  imagen: FormControl<IAlumno['imagen']>;
  imagenContentType: FormControl<IAlumno['imagenContentType']>;
  persona: FormControl<IAlumno['persona']>;
  alumnoClases: FormControl<IAlumno['alumnoClases']>;
};

export type AlumnoFormGroup = FormGroup<AlumnoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlumnoFormService {
  createAlumnoFormGroup(alumno: AlumnoFormGroupInput = { id: null }): AlumnoFormGroup {
    const alumnoRawValue = {
      ...this.getFormDefaults(),
      ...alumno,
    };
    return new FormGroup<AlumnoFormGroupContent>({
      id: new FormControl(
        { value: alumnoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(alumnoRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      }),
      estado: new FormControl(alumnoRawValue.estado, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(alumnoRawValue.tipo, {
        validators: [Validators.required],
      }),
      alumnoGradoInstruccion: new FormControl(alumnoRawValue.alumnoGradoInstruccion),
      ocupacion: new FormControl(alumnoRawValue.ocupacion),
      imagen: new FormControl(alumnoRawValue.imagen),
      imagenContentType: new FormControl(alumnoRawValue.imagenContentType),
      persona: new FormControl(alumnoRawValue.persona, {
        validators: [Validators.required],
      }),
      alumnoClases: new FormControl(alumnoRawValue.alumnoClases),
    });
  }

  getAlumno(form: AlumnoFormGroup): IAlumno | NewAlumno {
    return form.getRawValue() as IAlumno | NewAlumno;
  }

  resetForm(form: AlumnoFormGroup, alumno: AlumnoFormGroupInput): void {
    const alumnoRawValue = { ...this.getFormDefaults(), ...alumno };
    form.reset(
      {
        ...alumnoRawValue,
        id: { value: alumnoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlumnoFormDefaults {
    return {
      id: null,
    };
  }
}
