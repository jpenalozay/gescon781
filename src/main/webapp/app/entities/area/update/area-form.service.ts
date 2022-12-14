import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IArea, NewArea } from '../area.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArea for edit and NewAreaFormGroupInput for create.
 */
type AreaFormGroupInput = IArea | PartialWithRequiredKeyOf<NewArea>;

type AreaFormDefaults = Pick<NewArea, 'id'>;

type AreaFormGroupContent = {
  id: FormControl<IArea['id'] | NewArea['id']>;
  activo: FormControl<IArea['activo']>;
  codigo: FormControl<IArea['codigo']>;
  tipo: FormControl<IArea['tipo']>;
  nombre: FormControl<IArea['nombre']>;
  nombreCorto: FormControl<IArea['nombreCorto']>;
  sucursal: FormControl<IArea['sucursal']>;
  areaSuperior: FormControl<IArea['areaSuperior']>;
};

export type AreaFormGroup = FormGroup<AreaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AreaFormService {
  createAreaFormGroup(area: AreaFormGroupInput = { id: null }): AreaFormGroup {
    const areaRawValue = {
      ...this.getFormDefaults(),
      ...area,
    };
    return new FormGroup<AreaFormGroupContent>({
      id: new FormControl(
        { value: areaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(areaRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(areaRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
      }),
      tipo: new FormControl(areaRawValue.tipo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(areaRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      }),
      nombreCorto: new FormControl(areaRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      sucursal: new FormControl(areaRawValue.sucursal, {
        validators: [Validators.required],
      }),
      areaSuperior: new FormControl(areaRawValue.areaSuperior),
    });
  }

  getArea(form: AreaFormGroup): IArea | NewArea {
    return form.getRawValue() as IArea | NewArea;
  }

  resetForm(form: AreaFormGroup, area: AreaFormGroupInput): void {
    const areaRawValue = { ...this.getFormDefaults(), ...area };
    form.reset(
      {
        ...areaRawValue,
        id: { value: areaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AreaFormDefaults {
    return {
      id: null,
    };
  }
}
