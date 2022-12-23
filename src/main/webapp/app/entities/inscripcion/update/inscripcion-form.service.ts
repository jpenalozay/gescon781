import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInscripcion, Inscripcion, NewInscripcion } from '../inscripcion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcion for edit and NewInscripcionFormGroupInput for create.
 */
type InscripcionFormGroupInput = IInscripcion | PartialWithRequiredKeyOf<NewInscripcion>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IInscripcion | NewInscripcion> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

type InscripcionFormRawValue = FormValueOf<IInscripcion>;

type NewInscripcionFormRawValue = FormValueOf<NewInscripcion>;

type InscripcionFormDefaults = Pick<NewInscripcion, 'id' | 'fecha'>;

type InscripcionFormGroupContent = {
  id: FormControl<InscripcionFormRawValue['id'] | NewInscripcion['id']>;
  codigo: FormControl<InscripcionFormRawValue['codigo']>;
  estado: FormControl<InscripcionFormRawValue['estado']>;
  numeroDocumento: FormControl<InscripcionFormRawValue['numeroDocumento']>;
  fecha: FormControl<InscripcionFormRawValue['fecha']>;
  costoTotal: FormControl<InscripcionFormRawValue['costoTotal']>;
  alumno: FormControl<InscripcionFormRawValue['alumno']>;
};

export type InscripcionFormGroup = FormGroup<InscripcionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionFormService {
  createInscripcionFormGroup(inscripcion: InscripcionFormGroupInput = { id: null }): InscripcionFormGroup {
    const inscripcionRawValue = this.convertInscripcionToInscripcionRawValue({
      ...this.getFormDefaults(),
      ...inscripcion,
    });
    return new FormGroup<InscripcionFormGroupContent>({
      id: new FormControl(
        { value: inscripcionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(inscripcionRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      }),
      estado: new FormControl(inscripcionRawValue.estado, {
        validators: [Validators.required],
      }),
      numeroDocumento: new FormControl(inscripcionRawValue.numeroDocumento, {
        validators: [Validators.required],
      }),
      fecha: new FormControl(inscripcionRawValue.fecha, {
        validators: [Validators.required],
      }),
      costoTotal: new FormControl(inscripcionRawValue.costoTotal, {
        validators: [Validators.min(0), Validators.max(10000)],
      }),
      alumno: new FormControl(inscripcionRawValue.alumno, {
        validators: [Validators.required],
      }),
    });
  }

  getInscripcion(form: InscripcionFormGroup): IInscripcion | NewInscripcion {
    return this.convertInscripcionRawValueToInscripcion(form.getRawValue() as InscripcionFormRawValue | NewInscripcionFormRawValue);
  }

  resetForm(form: InscripcionFormGroup, inscripcion: InscripcionFormGroupInput): void {
    const inscripcionRawValue = this.convertInscripcionToInscripcionRawValue({ ...this.getFormDefaults(), ...inscripcion });
    form.reset(
      {
        ...inscripcionRawValue,
        id: { value: inscripcionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fecha: currentTime,
    };
  }

  private convertInscripcionRawValueToInscripcion(
    rawInscripcion: InscripcionFormRawValue | NewInscripcionFormRawValue
  ): IInscripcion | NewInscripcion {
    return {
      ...rawInscripcion,
      fecha: dayjs(rawInscripcion.fecha, DATE_TIME_FORMAT),
    };
  }

  private convertInscripcionToInscripcionRawValue(
    inscripcion: IInscripcion | (Partial<NewInscripcion> & InscripcionFormDefaults)
  ): InscripcionFormRawValue | PartialWithRequiredKeyOf<NewInscripcionFormRawValue> {
    return {
      inscripcion: Inscripcion,
      fecha: inscripcion.fecha ? inscripcion.fecha.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
