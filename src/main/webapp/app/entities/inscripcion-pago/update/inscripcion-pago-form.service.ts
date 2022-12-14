import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInscripcionPago, NewInscripcionPago } from '../inscripcion-pago.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcionPago for edit and NewInscripcionPagoFormGroupInput for create.
 */
type InscripcionPagoFormGroupInput = IInscripcionPago | PartialWithRequiredKeyOf<NewInscripcionPago>;

type InscripcionPagoFormDefaults = Pick<NewInscripcionPago, 'id'>;

type InscripcionPagoFormGroupContent = {
  id: FormControl<IInscripcionPago['id'] | NewInscripcionPago['id']>;
  formaPago: FormControl<IInscripcionPago['formaPago']>;
  monto: FormControl<IInscripcionPago['monto']>;
  fecha: FormControl<IInscripcionPago['fecha']>;
  codigoOP: FormControl<IInscripcionPago['codigoOP']>;
  tipoDocumento: FormControl<IInscripcionPago['tipoDocumento']>;
  numeroDocumento: FormControl<IInscripcionPago['numeroDocumento']>;
  plazoPago: FormControl<IInscripcionPago['plazoPago']>;
  inscripcion: FormControl<IInscripcionPago['inscripcion']>;
  serie: FormControl<IInscripcionPago['serie']>;
};

export type InscripcionPagoFormGroup = FormGroup<InscripcionPagoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionPagoFormService {
  createInscripcionPagoFormGroup(inscripcionPago: InscripcionPagoFormGroupInput = { id: null }): InscripcionPagoFormGroup {
    const inscripcionPagoRawValue = {
      ...this.getFormDefaults(),
      ...inscripcionPago,
    };
    return new FormGroup<InscripcionPagoFormGroupContent>({
      id: new FormControl(
        { value: inscripcionPagoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      formaPago: new FormControl(inscripcionPagoRawValue.formaPago, {
        validators: [Validators.required],
      }),
      monto: new FormControl(inscripcionPagoRawValue.monto, {
        validators: [Validators.required, Validators.min(0), Validators.max(10000)],
      }),
      fecha: new FormControl(inscripcionPagoRawValue.fecha, {
        validators: [Validators.required],
      }),
      codigoOP: new FormControl(inscripcionPagoRawValue.codigoOP, {
        validators: [Validators.minLength(2), Validators.maxLength(16)],
      }),
      tipoDocumento: new FormControl(inscripcionPagoRawValue.tipoDocumento, {
        validators: [Validators.required],
      }),
      numeroDocumento: new FormControl(inscripcionPagoRawValue.numeroDocumento, {
        validators: [Validators.required],
      }),
      plazoPago: new FormControl(inscripcionPagoRawValue.plazoPago, {
        validators: [Validators.min(0), Validators.max(360)],
      }),
      inscripcion: new FormControl(inscripcionPagoRawValue.inscripcion, {
        validators: [Validators.required],
      }),
      serie: new FormControl(inscripcionPagoRawValue.serie, {
        validators: [Validators.required],
      }),
    });
  }

  getInscripcionPago(form: InscripcionPagoFormGroup): IInscripcionPago | NewInscripcionPago {
    return form.getRawValue() as IInscripcionPago | NewInscripcionPago;
  }

  resetForm(form: InscripcionPagoFormGroup, inscripcionPago: InscripcionPagoFormGroupInput): void {
    const inscripcionPagoRawValue = { ...this.getFormDefaults(), ...inscripcionPago };
    form.reset(
      {
        ...inscripcionPagoRawValue,
        id: { value: inscripcionPagoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionPagoFormDefaults {
    return {
      id: null,
    };
  }
}
