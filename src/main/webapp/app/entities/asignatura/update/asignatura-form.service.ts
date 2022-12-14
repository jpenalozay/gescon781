import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAsignatura, NewAsignatura } from '../asignatura.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAsignatura for edit and NewAsignaturaFormGroupInput for create.
 */
type AsignaturaFormGroupInput = IAsignatura | PartialWithRequiredKeyOf<NewAsignatura>;

type AsignaturaFormDefaults = Pick<NewAsignatura, 'id' | 'categorias' | 'adicionals' | 'horarios' | 'asignaturaRequisitos'>;

type AsignaturaFormGroupContent = {
  id: FormControl<IAsignatura['id'] | NewAsignatura['id']>;
  activo: FormControl<IAsignatura['activo']>;
  nombre: FormControl<IAsignatura['nombre']>;
  nombreCorto: FormControl<IAsignatura['nombreCorto']>;
  descripcion: FormControl<IAsignatura['descripcion']>;
  documento: FormControl<IAsignatura['documento']>;
  horasTeoricas: FormControl<IAsignatura['horasTeoricas']>;
  horasPracticas: FormControl<IAsignatura['horasPracticas']>;
  numeroClasesTeoria: FormControl<IAsignatura['numeroClasesTeoria']>;
  numeroClasesPractica: FormControl<IAsignatura['numeroClasesPractica']>;
  vigencia: FormControl<IAsignatura['vigencia']>;
  costo: FormControl<IAsignatura['costo']>;
  imagen: FormControl<IAsignatura['imagen']>;
  imagenContentType: FormControl<IAsignatura['imagenContentType']>;
  categorias: FormControl<IAsignatura['categorias']>;
  adicionals: FormControl<IAsignatura['adicionals']>;
  horarios: FormControl<IAsignatura['horarios']>;
  asignaturaRequisitos: FormControl<IAsignatura['asignaturaRequisitos']>;
  curso: FormControl<IAsignatura['curso']>;
};

export type AsignaturaFormGroup = FormGroup<AsignaturaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AsignaturaFormService {
  createAsignaturaFormGroup(asignatura: AsignaturaFormGroupInput = { id: null }): AsignaturaFormGroup {
    const asignaturaRawValue = {
      ...this.getFormDefaults(),
      ...asignatura,
    };
    return new FormGroup<AsignaturaFormGroupContent>({
      id: new FormControl(
        { value: asignaturaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(asignaturaRawValue.activo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(asignaturaRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      nombreCorto: new FormControl(asignaturaRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(asignaturaRawValue.descripcion, {
        validators: [Validators.minLength(2), Validators.maxLength(512)],
      }),
      documento: new FormControl(asignaturaRawValue.documento),
      horasTeoricas: new FormControl(asignaturaRawValue.horasTeoricas),
      horasPracticas: new FormControl(asignaturaRawValue.horasPracticas),
      numeroClasesTeoria: new FormControl(asignaturaRawValue.numeroClasesTeoria),
      numeroClasesPractica: new FormControl(asignaturaRawValue.numeroClasesPractica),
      vigencia: new FormControl(asignaturaRawValue.vigencia),
      costo: new FormControl(asignaturaRawValue.costo, {
        validators: [Validators.required],
      }),
      imagen: new FormControl(asignaturaRawValue.imagen),
      imagenContentType: new FormControl(asignaturaRawValue.imagenContentType),
      categorias: new FormControl(asignaturaRawValue.categorias ?? []),
      adicionals: new FormControl(asignaturaRawValue.adicionals ?? []),
      horarios: new FormControl(asignaturaRawValue.horarios ?? []),
      asignaturaRequisitos: new FormControl(asignaturaRawValue.asignaturaRequisitos ?? []),
      curso: new FormControl(asignaturaRawValue.curso, {
        validators: [Validators.required],
      }),
    });
  }

  getAsignatura(form: AsignaturaFormGroup): IAsignatura | NewAsignatura {
    return form.getRawValue() as IAsignatura | NewAsignatura;
  }

  resetForm(form: AsignaturaFormGroup, asignatura: AsignaturaFormGroupInput): void {
    const asignaturaRawValue = { ...this.getFormDefaults(), ...asignatura };
    form.reset(
      {
        ...asignaturaRawValue,
        id: { value: asignaturaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AsignaturaFormDefaults {
    return {
      id: null,
      categorias: [],
      adicionals: [],
      horarios: [],
      asignaturaRequisitos: [],
    };
  }
}
