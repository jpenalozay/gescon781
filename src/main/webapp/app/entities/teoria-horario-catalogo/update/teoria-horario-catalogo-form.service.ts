import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeoriaHorarioCatalogo, NewTeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeoriaHorarioCatalogo for edit and NewTeoriaHorarioCatalogoFormGroupInput for create.
 */
type TeoriaHorarioCatalogoFormGroupInput = ITeoriaHorarioCatalogo | PartialWithRequiredKeyOf<NewTeoriaHorarioCatalogo>;

type TeoriaHorarioCatalogoFormDefaults = Pick<NewTeoriaHorarioCatalogo, 'id' | 'teorias' | 'asignaturas'>;

type TeoriaHorarioCatalogoFormGroupContent = {
  id: FormControl<ITeoriaHorarioCatalogo['id'] | NewTeoriaHorarioCatalogo['id']>;
  activo: FormControl<ITeoriaHorarioCatalogo['activo']>;
  nombre: FormControl<ITeoriaHorarioCatalogo['nombre']>;
  nombreCorto: FormControl<ITeoriaHorarioCatalogo['nombreCorto']>;
  descripcion: FormControl<ITeoriaHorarioCatalogo['descripcion']>;
  imagen: FormControl<ITeoriaHorarioCatalogo['imagen']>;
  imagenContentType: FormControl<ITeoriaHorarioCatalogo['imagenContentType']>;
  periodo: FormControl<ITeoriaHorarioCatalogo['periodo']>;
  anio: FormControl<ITeoriaHorarioCatalogo['anio']>;
  mes: FormControl<ITeoriaHorarioCatalogo['mes']>;
  dia: FormControl<ITeoriaHorarioCatalogo['dia']>;
  horaInicio: FormControl<ITeoriaHorarioCatalogo['horaInicio']>;
  horaFin: FormControl<ITeoriaHorarioCatalogo['horaFin']>;
  teorias: FormControl<ITeoriaHorarioCatalogo['teorias']>;
  asignaturas: FormControl<ITeoriaHorarioCatalogo['asignaturas']>;
};

export type TeoriaHorarioCatalogoFormGroup = FormGroup<TeoriaHorarioCatalogoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeoriaHorarioCatalogoFormService {
  createTeoriaHorarioCatalogoFormGroup(
    teoriaHorarioCatalogo: TeoriaHorarioCatalogoFormGroupInput = { id: null }
  ): TeoriaHorarioCatalogoFormGroup {
    const teoriaHorarioCatalogoRawValue = {
      ...this.getFormDefaults(),
      ...teoriaHorarioCatalogo,
    };
    return new FormGroup<TeoriaHorarioCatalogoFormGroupContent>({
      id: new FormControl(
        { value: teoriaHorarioCatalogoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(teoriaHorarioCatalogoRawValue.activo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(teoriaHorarioCatalogoRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      nombreCorto: new FormControl(teoriaHorarioCatalogoRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(teoriaHorarioCatalogoRawValue.descripcion),
      imagen: new FormControl(teoriaHorarioCatalogoRawValue.imagen),
      imagenContentType: new FormControl(teoriaHorarioCatalogoRawValue.imagenContentType),
      periodo: new FormControl(teoriaHorarioCatalogoRawValue.periodo),
      anio: new FormControl(teoriaHorarioCatalogoRawValue.anio),
      mes: new FormControl(teoriaHorarioCatalogoRawValue.mes),
      dia: new FormControl(teoriaHorarioCatalogoRawValue.dia),
      horaInicio: new FormControl(teoriaHorarioCatalogoRawValue.horaInicio),
      horaFin: new FormControl(teoriaHorarioCatalogoRawValue.horaFin),
      teorias: new FormControl(teoriaHorarioCatalogoRawValue.teorias ?? []),
      asignaturas: new FormControl(teoriaHorarioCatalogoRawValue.asignaturas ?? []),
    });
  }

  getTeoriaHorarioCatalogo(form: TeoriaHorarioCatalogoFormGroup): ITeoriaHorarioCatalogo | NewTeoriaHorarioCatalogo {
    return form.getRawValue() as ITeoriaHorarioCatalogo | NewTeoriaHorarioCatalogo;
  }

  resetForm(form: TeoriaHorarioCatalogoFormGroup, teoriaHorarioCatalogo: TeoriaHorarioCatalogoFormGroupInput): void {
    const teoriaHorarioCatalogoRawValue = { ...this.getFormDefaults(), ...teoriaHorarioCatalogo };
    form.reset(
      {
        ...teoriaHorarioCatalogoRawValue,
        id: { value: teoriaHorarioCatalogoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TeoriaHorarioCatalogoFormDefaults {
    return {
      id: null,
      teorias: [],
      asignaturas: [],
    };
  }
}
