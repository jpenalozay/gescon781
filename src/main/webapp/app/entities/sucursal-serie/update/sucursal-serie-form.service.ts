import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISucursalSerie, NewSucursalSerie } from '../sucursal-serie.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISucursalSerie for edit and NewSucursalSerieFormGroupInput for create.
 */
type SucursalSerieFormGroupInput = ISucursalSerie | PartialWithRequiredKeyOf<NewSucursalSerie>;

type SucursalSerieFormDefaults = Pick<NewSucursalSerie, 'id'>;

type SucursalSerieFormGroupContent = {
  id: FormControl<ISucursalSerie['id'] | NewSucursalSerie['id']>;
  activo: FormControl<ISucursalSerie['activo']>;
  tipoDocumento: FormControl<ISucursalSerie['tipoDocumento']>;
  serie: FormControl<ISucursalSerie['serie']>;
  fechaEmision: FormControl<ISucursalSerie['fechaEmision']>;
  numeroMaximo: FormControl<ISucursalSerie['numeroMaximo']>;
  numeroUltimo: FormControl<ISucursalSerie['numeroUltimo']>;
  sucursal: FormControl<ISucursalSerie['sucursal']>;
};

export type SucursalSerieFormGroup = FormGroup<SucursalSerieFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SucursalSerieFormService {
  createSucursalSerieFormGroup(sucursalSerie: SucursalSerieFormGroupInput = { id: null }): SucursalSerieFormGroup {
    const sucursalSerieRawValue = {
      ...this.getFormDefaults(),
      ...sucursalSerie,
    };
    return new FormGroup<SucursalSerieFormGroupContent>({
      id: new FormControl(
        { value: sucursalSerieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(sucursalSerieRawValue.activo, {
        validators: [Validators.required],
      }),
      tipoDocumento: new FormControl(sucursalSerieRawValue.tipoDocumento, {
        validators: [Validators.required],
      }),
      serie: new FormControl(sucursalSerieRawValue.serie, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(8)],
      }),
      fechaEmision: new FormControl(sucursalSerieRawValue.fechaEmision),
      numeroMaximo: new FormControl(sucursalSerieRawValue.numeroMaximo),
      numeroUltimo: new FormControl(sucursalSerieRawValue.numeroUltimo, {
        validators: [Validators.required],
      }),
      sucursal: new FormControl(sucursalSerieRawValue.sucursal, {
        validators: [Validators.required],
      }),
    });
  }

  getSucursalSerie(form: SucursalSerieFormGroup): ISucursalSerie | NewSucursalSerie {
    return form.getRawValue() as ISucursalSerie | NewSucursalSerie;
  }

  resetForm(form: SucursalSerieFormGroup, sucursalSerie: SucursalSerieFormGroupInput): void {
    const sucursalSerieRawValue = { ...this.getFormDefaults(), ...sucursalSerie };
    form.reset(
      {
        ...sucursalSerieRawValue,
        id: { value: sucursalSerieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SucursalSerieFormDefaults {
    return {
      id: null,
    };
  }
}
