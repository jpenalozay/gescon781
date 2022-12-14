import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRequisitosInscripcion, NewRequisitosInscripcion } from '../requisitos-inscripcion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRequisitosInscripcion for edit and NewRequisitosInscripcionFormGroupInput for create.
 */
type RequisitosInscripcionFormGroupInput = IRequisitosInscripcion | PartialWithRequiredKeyOf<NewRequisitosInscripcion>;

type RequisitosInscripcionFormDefaults = Pick<NewRequisitosInscripcion, 'id'>;

type RequisitosInscripcionFormGroupContent = {
  id: FormControl<IRequisitosInscripcion['id'] | NewRequisitosInscripcion['id']>;
  activo: FormControl<IRequisitosInscripcion['activo']>;
  obligatorio: FormControl<IRequisitosInscripcion['obligatorio']>;
  nombre: FormControl<IRequisitosInscripcion['nombre']>;
  nombreCorto: FormControl<IRequisitosInscripcion['nombreCorto']>;
  costo: FormControl<IRequisitosInscripcion['costo']>;
  imagen: FormControl<IRequisitosInscripcion['imagen']>;
  imagenContentType: FormControl<IRequisitosInscripcion['imagenContentType']>;
  tipoRequisito: FormControl<IRequisitosInscripcion['tipoRequisito']>;
  valores: FormControl<IRequisitosInscripcion['valores']>;
};

export type RequisitosInscripcionFormGroup = FormGroup<RequisitosInscripcionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RequisitosInscripcionFormService {
  createRequisitosInscripcionFormGroup(
    requisitosInscripcion: RequisitosInscripcionFormGroupInput = { id: null }
  ): RequisitosInscripcionFormGroup {
    const requisitosInscripcionRawValue = {
      ...this.getFormDefaults(),
      ...requisitosInscripcion,
    };
    return new FormGroup<RequisitosInscripcionFormGroupContent>({
      id: new FormControl(
        { value: requisitosInscripcionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(requisitosInscripcionRawValue.activo, {
        validators: [Validators.required],
      }),
      obligatorio: new FormControl(requisitosInscripcionRawValue.obligatorio, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(requisitosInscripcionRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      nombreCorto: new FormControl(requisitosInscripcionRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      costo: new FormControl(requisitosInscripcionRawValue.costo),
      imagen: new FormControl(requisitosInscripcionRawValue.imagen),
      imagenContentType: new FormControl(requisitosInscripcionRawValue.imagenContentType),
      tipoRequisito: new FormControl(requisitosInscripcionRawValue.tipoRequisito),
      valores: new FormControl(requisitosInscripcionRawValue.valores),
    });
  }

  getRequisitosInscripcion(form: RequisitosInscripcionFormGroup): IRequisitosInscripcion | NewRequisitosInscripcion {
    return form.getRawValue() as IRequisitosInscripcion | NewRequisitosInscripcion;
  }

  resetForm(form: RequisitosInscripcionFormGroup, requisitosInscripcion: RequisitosInscripcionFormGroupInput): void {
    const requisitosInscripcionRawValue = { ...this.getFormDefaults(), ...requisitosInscripcion };
    form.reset(
      {
        ...requisitosInscripcionRawValue,
        id: { value: requisitosInscripcionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RequisitosInscripcionFormDefaults {
    return {
      id: null,
    };
  }
}
