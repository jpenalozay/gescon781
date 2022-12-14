import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInscripcionDetalle, NewInscripcionDetalle } from '../inscripcion-detalle.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcionDetalle for edit and NewInscripcionDetalleFormGroupInput for create.
 */
type InscripcionDetalleFormGroupInput = IInscripcionDetalle | PartialWithRequiredKeyOf<NewInscripcionDetalle>;

type InscripcionDetalleFormDefaults = Pick<NewInscripcionDetalle, 'id'>;

type InscripcionDetalleFormGroupContent = {
  id: FormControl<IInscripcionDetalle['id'] | NewInscripcionDetalle['id']>;
  codigo: FormControl<IInscripcionDetalle['codigo']>;
  fechaInicio: FormControl<IInscripcionDetalle['fechaInicio']>;
  inscripcion: FormControl<IInscripcionDetalle['inscripcion']>;
  asignatura: FormControl<IInscripcionDetalle['asignatura']>;
  horario: FormControl<IInscripcionDetalle['horario']>;
};

export type InscripcionDetalleFormGroup = FormGroup<InscripcionDetalleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionDetalleFormService {
  createInscripcionDetalleFormGroup(inscripcionDetalle: InscripcionDetalleFormGroupInput = { id: null }): InscripcionDetalleFormGroup {
    const inscripcionDetalleRawValue = {
      ...this.getFormDefaults(),
      ...inscripcionDetalle,
    };
    return new FormGroup<InscripcionDetalleFormGroupContent>({
      id: new FormControl(
        { value: inscripcionDetalleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(inscripcionDetalleRawValue.codigo),
      fechaInicio: new FormControl(inscripcionDetalleRawValue.fechaInicio),
      inscripcion: new FormControl(inscripcionDetalleRawValue.inscripcion, {
        validators: [Validators.required],
      }),
      asignatura: new FormControl(inscripcionDetalleRawValue.asignatura, {
        validators: [Validators.required],
      }),
      horario: new FormControl(inscripcionDetalleRawValue.horario, {
        validators: [Validators.required],
      }),
    });
  }

  getInscripcionDetalle(form: InscripcionDetalleFormGroup): IInscripcionDetalle | NewInscripcionDetalle {
    return form.getRawValue() as IInscripcionDetalle | NewInscripcionDetalle;
  }

  resetForm(form: InscripcionDetalleFormGroup, inscripcionDetalle: InscripcionDetalleFormGroupInput): void {
    const inscripcionDetalleRawValue = { ...this.getFormDefaults(), ...inscripcionDetalle };
    form.reset(
      {
        ...inscripcionDetalleRawValue,
        id: { value: inscripcionDetalleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionDetalleFormDefaults {
    return {
      id: null,
    };
  }
}
