import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlumnoClases, NewAlumnoClases } from '../alumno-clases.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlumnoClases for edit and NewAlumnoClasesFormGroupInput for create.
 */
type AlumnoClasesFormGroupInput = IAlumnoClases | PartialWithRequiredKeyOf<NewAlumnoClases>;

type AlumnoClasesFormDefaults = Pick<NewAlumnoClases, 'id'>;

type AlumnoClasesFormGroupContent = {
  id: FormControl<IAlumnoClases['id'] | NewAlumnoClases['id']>;
  clasesTotales: FormControl<IAlumnoClases['clasesTotales']>;
  clasesProgramadas: FormControl<IAlumnoClases['clasesProgramadas']>;
  clasesRealizadas: FormControl<IAlumnoClases['clasesRealizadas']>;
};

export type AlumnoClasesFormGroup = FormGroup<AlumnoClasesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlumnoClasesFormService {
  createAlumnoClasesFormGroup(alumnoClases: AlumnoClasesFormGroupInput = { id: null }): AlumnoClasesFormGroup {
    const alumnoClasesRawValue = {
      ...this.getFormDefaults(),
      ...alumnoClases,
    };
    return new FormGroup<AlumnoClasesFormGroupContent>({
      id: new FormControl(
        { value: alumnoClasesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      clasesTotales: new FormControl(alumnoClasesRawValue.clasesTotales),
      clasesProgramadas: new FormControl(alumnoClasesRawValue.clasesProgramadas),
      clasesRealizadas: new FormControl(alumnoClasesRawValue.clasesRealizadas),
    });
  }

  getAlumnoClases(form: AlumnoClasesFormGroup): IAlumnoClases | NewAlumnoClases {
    return form.getRawValue() as IAlumnoClases | NewAlumnoClases;
  }

  resetForm(form: AlumnoClasesFormGroup, alumnoClases: AlumnoClasesFormGroupInput): void {
    const alumnoClasesRawValue = { ...this.getFormDefaults(), ...alumnoClases };
    form.reset(
      {
        ...alumnoClasesRawValue,
        id: { value: alumnoClasesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlumnoClasesFormDefaults {
    return {
      id: null,
    };
  }
}
