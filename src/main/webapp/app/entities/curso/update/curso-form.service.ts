import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICurso, NewCurso } from '../curso.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICurso for edit and NewCursoFormGroupInput for create.
 */
type CursoFormGroupInput = ICurso | PartialWithRequiredKeyOf<NewCurso>;

type CursoFormDefaults = Pick<NewCurso, 'id'>;

type CursoFormGroupContent = {
  id: FormControl<ICurso['id'] | NewCurso['id']>;
  activo: FormControl<ICurso['activo']>;
  tipo: FormControl<ICurso['tipo']>;
  nombre: FormControl<ICurso['nombre']>;
  nombreCorto: FormControl<ICurso['nombreCorto']>;
  descripcion: FormControl<ICurso['descripcion']>;
  imagen: FormControl<ICurso['imagen']>;
  imagenContentType: FormControl<ICurso['imagenContentType']>;
};

export type CursoFormGroup = FormGroup<CursoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CursoFormService {
  createCursoFormGroup(curso: CursoFormGroupInput = { id: null }): CursoFormGroup {
    const cursoRawValue = {
      ...this.getFormDefaults(),
      ...curso,
    };
    return new FormGroup<CursoFormGroupContent>({
      id: new FormControl(
        { value: cursoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(cursoRawValue.activo, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(cursoRawValue.tipo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(cursoRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      nombreCorto: new FormControl(cursoRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(cursoRawValue.descripcion, {
        validators: [Validators.minLength(2), Validators.maxLength(512)],
      }),
      imagen: new FormControl(cursoRawValue.imagen),
      imagenContentType: new FormControl(cursoRawValue.imagenContentType),
    });
  }

  getCurso(form: CursoFormGroup): ICurso | NewCurso {
    return form.getRawValue() as ICurso | NewCurso;
  }

  resetForm(form: CursoFormGroup, curso: CursoFormGroupInput): void {
    const cursoRawValue = { ...this.getFormDefaults(), ...curso };
    form.reset(
      {
        ...cursoRawValue,
        id: { value: cursoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CursoFormDefaults {
    return {
      id: null,
    };
  }
}
