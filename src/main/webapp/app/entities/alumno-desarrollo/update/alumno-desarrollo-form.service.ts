import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAlumnoDesarrollo, NewAlumnoDesarrollo } from '../alumno-desarrollo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAlumnoDesarrollo for edit and NewAlumnoDesarrolloFormGroupInput for create.
 */
type AlumnoDesarrolloFormGroupInput = IAlumnoDesarrollo | PartialWithRequiredKeyOf<NewAlumnoDesarrollo>;

type AlumnoDesarrolloFormDefaults = Pick<NewAlumnoDesarrollo, 'id'>;

type AlumnoDesarrolloFormGroupContent = {
  id: FormControl<IAlumnoDesarrollo['id'] | NewAlumnoDesarrollo['id']>;
  clasesTeoriaProgramadas: FormControl<IAlumnoDesarrollo['clasesTeoriaProgramadas']>;
  clasesPracticasProgramas: FormControl<IAlumnoDesarrollo['clasesPracticasProgramas']>;
  clasesInasistenciaTeoria: FormControl<IAlumnoDesarrollo['clasesInasistenciaTeoria']>;
  clasesInasistenciaPractica: FormControl<IAlumnoDesarrollo['clasesInasistenciaPractica']>;
  clasesRealizadasTeoria: FormControl<IAlumnoDesarrollo['clasesRealizadasTeoria']>;
  clasesRealizadasPractica: FormControl<IAlumnoDesarrollo['clasesRealizadasPractica']>;
  alumnoDesarrolloEstado: FormControl<IAlumnoDesarrollo['alumnoDesarrolloEstado']>;
};

export type AlumnoDesarrolloFormGroup = FormGroup<AlumnoDesarrolloFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AlumnoDesarrolloFormService {
  createAlumnoDesarrolloFormGroup(alumnoDesarrollo: AlumnoDesarrolloFormGroupInput = { id: null }): AlumnoDesarrolloFormGroup {
    const alumnoDesarrolloRawValue = {
      ...this.getFormDefaults(),
      ...alumnoDesarrollo,
    };
    return new FormGroup<AlumnoDesarrolloFormGroupContent>({
      id: new FormControl(
        { value: alumnoDesarrolloRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      clasesTeoriaProgramadas: new FormControl(alumnoDesarrolloRawValue.clasesTeoriaProgramadas, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      clasesPracticasProgramas: new FormControl(alumnoDesarrolloRawValue.clasesPracticasProgramas, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      clasesInasistenciaTeoria: new FormControl(alumnoDesarrolloRawValue.clasesInasistenciaTeoria, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      clasesInasistenciaPractica: new FormControl(alumnoDesarrolloRawValue.clasesInasistenciaPractica, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      clasesRealizadasTeoria: new FormControl(alumnoDesarrolloRawValue.clasesRealizadasTeoria, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      clasesRealizadasPractica: new FormControl(alumnoDesarrolloRawValue.clasesRealizadasPractica, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      alumnoDesarrolloEstado: new FormControl(alumnoDesarrolloRawValue.alumnoDesarrolloEstado),
    });
  }

  getAlumnoDesarrollo(form: AlumnoDesarrolloFormGroup): IAlumnoDesarrollo | NewAlumnoDesarrollo {
    return form.getRawValue() as IAlumnoDesarrollo | NewAlumnoDesarrollo;
  }

  resetForm(form: AlumnoDesarrolloFormGroup, alumnoDesarrollo: AlumnoDesarrolloFormGroupInput): void {
    const alumnoDesarrolloRawValue = { ...this.getFormDefaults(), ...alumnoDesarrollo };
    form.reset(
      {
        ...alumnoDesarrolloRawValue,
        id: { value: alumnoDesarrolloRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AlumnoDesarrolloFormDefaults {
    return {
      id: null,
    };
  }
}
