import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInscripcionDescuento, NewInscripcionDescuento } from '../inscripcion-descuento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcionDescuento for edit and NewInscripcionDescuentoFormGroupInput for create.
 */
type InscripcionDescuentoFormGroupInput = IInscripcionDescuento | PartialWithRequiredKeyOf<NewInscripcionDescuento>;

type InscripcionDescuentoFormDefaults = Pick<NewInscripcionDescuento, 'id'>;

type InscripcionDescuentoFormGroupContent = {
  id: FormControl<IInscripcionDescuento['id'] | NewInscripcionDescuento['id']>;
  descripcion: FormControl<IInscripcionDescuento['descripcion']>;
  monto: FormControl<IInscripcionDescuento['monto']>;
  inscripcion: FormControl<IInscripcionDescuento['inscripcion']>;
};

export type InscripcionDescuentoFormGroup = FormGroup<InscripcionDescuentoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionDescuentoFormService {
  createInscripcionDescuentoFormGroup(
    inscripcionDescuento: InscripcionDescuentoFormGroupInput = { id: null }
  ): InscripcionDescuentoFormGroup {
    const inscripcionDescuentoRawValue = {
      ...this.getFormDefaults(),
      ...inscripcionDescuento,
    };
    return new FormGroup<InscripcionDescuentoFormGroupContent>({
      id: new FormControl(
        { value: inscripcionDescuentoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      descripcion: new FormControl(inscripcionDescuentoRawValue.descripcion),
      monto: new FormControl(inscripcionDescuentoRawValue.monto),
      inscripcion: new FormControl(inscripcionDescuentoRawValue.inscripcion),
    });
  }

  getInscripcionDescuento(form: InscripcionDescuentoFormGroup): IInscripcionDescuento | NewInscripcionDescuento {
    return form.getRawValue() as IInscripcionDescuento | NewInscripcionDescuento;
  }

  resetForm(form: InscripcionDescuentoFormGroup, inscripcionDescuento: InscripcionDescuentoFormGroupInput): void {
    const inscripcionDescuentoRawValue = { ...this.getFormDefaults(), ...inscripcionDescuento };
    form.reset(
      {
        ...inscripcionDescuentoRawValue,
        id: { value: inscripcionDescuentoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionDescuentoFormDefaults {
    return {
      id: null,
    };
  }
}
