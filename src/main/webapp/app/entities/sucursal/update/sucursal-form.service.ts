import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISucursal, NewSucursal } from '../sucursal.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISucursal for edit and NewSucursalFormGroupInput for create.
 */
type SucursalFormGroupInput = ISucursal | PartialWithRequiredKeyOf<NewSucursal>;

type SucursalFormDefaults = Pick<NewSucursal, 'id' | 'usuarios'>;

type SucursalFormGroupContent = {
  id: FormControl<ISucursal['id'] | NewSucursal['id']>;
  activo: FormControl<ISucursal['activo']>;
  codigo: FormControl<ISucursal['codigo']>;
  central: FormControl<ISucursal['central']>;
  nombre: FormControl<ISucursal['nombre']>;
  nombreCorto: FormControl<ISucursal['nombreCorto']>;
  nombreAbreviado: FormControl<ISucursal['nombreAbreviado']>;
  fechaInicio: FormControl<ISucursal['fechaInicio']>;
  telefono: FormControl<ISucursal['telefono']>;
  telefono1: FormControl<ISucursal['telefono1']>;
  imagen: FormControl<ISucursal['imagen']>;
  imagenContentType: FormControl<ISucursal['imagenContentType']>;
  direccion: FormControl<ISucursal['direccion']>;
  distrito: FormControl<ISucursal['distrito']>;
  usuarios: FormControl<ISucursal['usuarios']>;
};

export type SucursalFormGroup = FormGroup<SucursalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SucursalFormService {
  createSucursalFormGroup(sucursal: SucursalFormGroupInput = { id: null }): SucursalFormGroup {
    const sucursalRawValue = {
      ...this.getFormDefaults(),
      ...sucursal,
    };
    return new FormGroup<SucursalFormGroupContent>({
      id: new FormControl(
        { value: sucursalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(sucursalRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(sucursalRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      }),
      central: new FormControl(sucursalRawValue.central, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(sucursalRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      }),
      nombreCorto: new FormControl(sucursalRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      nombreAbreviado: new FormControl(sucursalRawValue.nombreAbreviado, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)],
      }),
      fechaInicio: new FormControl(sucursalRawValue.fechaInicio),
      telefono: new FormControl(sucursalRawValue.telefono, {
        validators: [Validators.maxLength(15)],
      }),
      telefono1: new FormControl(sucursalRawValue.telefono1, {
        validators: [Validators.maxLength(15)],
      }),
      imagen: new FormControl(sucursalRawValue.imagen),
      imagenContentType: new FormControl(sucursalRawValue.imagenContentType),
      direccion: new FormControl(sucursalRawValue.direccion, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      distrito: new FormControl(sucursalRawValue.distrito, {
        validators: [Validators.required],
      }),
      usuarios: new FormControl(sucursalRawValue.usuarios ?? []),
    });
  }

  getSucursal(form: SucursalFormGroup): ISucursal | NewSucursal {
    return form.getRawValue() as ISucursal | NewSucursal;
  }

  resetForm(form: SucursalFormGroup, sucursal: SucursalFormGroupInput): void {
    const sucursalRawValue = { ...this.getFormDefaults(), ...sucursal };
    form.reset(
      {
        ...sucursalRawValue,
        id: { value: sucursalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SucursalFormDefaults {
    return {
      id: null,
      usuarios: [],
    };
  }
}
