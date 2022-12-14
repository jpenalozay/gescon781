import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILicenciaCategoria, NewLicenciaCategoria } from '../licencia-categoria.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILicenciaCategoria for edit and NewLicenciaCategoriaFormGroupInput for create.
 */
type LicenciaCategoriaFormGroupInput = ILicenciaCategoria | PartialWithRequiredKeyOf<NewLicenciaCategoria>;

type LicenciaCategoriaFormDefaults = Pick<NewLicenciaCategoria, 'id' | 'asignaturas' | 'intructores'>;

type LicenciaCategoriaFormGroupContent = {
  id: FormControl<ILicenciaCategoria['id'] | NewLicenciaCategoria['id']>;
  categoria: FormControl<ILicenciaCategoria['categoria']>;
  asignaturas: FormControl<ILicenciaCategoria['asignaturas']>;
  intructores: FormControl<ILicenciaCategoria['intructores']>;
};

export type LicenciaCategoriaFormGroup = FormGroup<LicenciaCategoriaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LicenciaCategoriaFormService {
  createLicenciaCategoriaFormGroup(licenciaCategoria: LicenciaCategoriaFormGroupInput = { id: null }): LicenciaCategoriaFormGroup {
    const licenciaCategoriaRawValue = {
      ...this.getFormDefaults(),
      ...licenciaCategoria,
    };
    return new FormGroup<LicenciaCategoriaFormGroupContent>({
      id: new FormControl(
        { value: licenciaCategoriaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      categoria: new FormControl(licenciaCategoriaRawValue.categoria, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      asignaturas: new FormControl(licenciaCategoriaRawValue.asignaturas ?? []),
      intructores: new FormControl(licenciaCategoriaRawValue.intructores ?? []),
    });
  }

  getLicenciaCategoria(form: LicenciaCategoriaFormGroup): ILicenciaCategoria | NewLicenciaCategoria {
    return form.getRawValue() as ILicenciaCategoria | NewLicenciaCategoria;
  }

  resetForm(form: LicenciaCategoriaFormGroup, licenciaCategoria: LicenciaCategoriaFormGroupInput): void {
    const licenciaCategoriaRawValue = { ...this.getFormDefaults(), ...licenciaCategoria };
    form.reset(
      {
        ...licenciaCategoriaRawValue,
        id: { value: licenciaCategoriaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LicenciaCategoriaFormDefaults {
    return {
      id: null,
      asignaturas: [],
      intructores: [],
    };
  }
}
