import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICargo, NewCargo } from '../cargo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICargo for edit and NewCargoFormGroupInput for create.
 */
type CargoFormGroupInput = ICargo | PartialWithRequiredKeyOf<NewCargo>;

type CargoFormDefaults = Pick<NewCargo, 'id'>;

type CargoFormGroupContent = {
  id: FormControl<ICargo['id'] | NewCargo['id']>;
  activo: FormControl<ICargo['activo']>;
  codigo: FormControl<ICargo['codigo']>;
  nombre: FormControl<ICargo['nombre']>;
  nombreCorto: FormControl<ICargo['nombreCorto']>;
  areaPerteneciente: FormControl<ICargo['areaPerteneciente']>;
  cargoSuperior: FormControl<ICargo['cargoSuperior']>;
};

export type CargoFormGroup = FormGroup<CargoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CargoFormService {
  createCargoFormGroup(cargo: CargoFormGroupInput = { id: null }): CargoFormGroup {
    const cargoRawValue = {
      ...this.getFormDefaults(),
      ...cargo,
    };
    return new FormGroup<CargoFormGroupContent>({
      id: new FormControl(
        { value: cargoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(cargoRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(cargoRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(4)],
      }),
      nombre: new FormControl(cargoRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      }),
      nombreCorto: new FormControl(cargoRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      areaPerteneciente: new FormControl(cargoRawValue.areaPerteneciente, {
        validators: [Validators.required],
      }),
      cargoSuperior: new FormControl(cargoRawValue.cargoSuperior),
    });
  }

  getCargo(form: CargoFormGroup): ICargo | NewCargo {
    return form.getRawValue() as ICargo | NewCargo;
  }

  resetForm(form: CargoFormGroup, cargo: CargoFormGroupInput): void {
    const cargoRawValue = { ...this.getFormDefaults(), ...cargo };
    form.reset(
      {
        ...cargoRawValue,
        id: { value: cargoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CargoFormDefaults {
    return {
      id: null,
    };
  }
}
