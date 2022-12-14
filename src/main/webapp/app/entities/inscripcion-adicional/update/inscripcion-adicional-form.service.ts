import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInscripcionAdicional, NewInscripcionAdicional } from '../inscripcion-adicional.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcionAdicional for edit and NewInscripcionAdicionalFormGroupInput for create.
 */
type InscripcionAdicionalFormGroupInput = IInscripcionAdicional | PartialWithRequiredKeyOf<NewInscripcionAdicional>;

type InscripcionAdicionalFormDefaults = Pick<NewInscripcionAdicional, 'id'>;

type InscripcionAdicionalFormGroupContent = {
  id: FormControl<IInscripcionAdicional['id'] | NewInscripcionAdicional['id']>;
  descripcion: FormControl<IInscripcionAdicional['descripcion']>;
  imagen: FormControl<IInscripcionAdicional['imagen']>;
  imagenContentType: FormControl<IInscripcionAdicional['imagenContentType']>;
  documento: FormControl<IInscripcionAdicional['documento']>;
  cantidad: FormControl<IInscripcionAdicional['cantidad']>;
  costo: FormControl<IInscripcionAdicional['costo']>;
  inscripcion: FormControl<IInscripcionAdicional['inscripcion']>;
  inscripcionRequisito: FormControl<IInscripcionAdicional['inscripcionRequisito']>;
};

export type InscripcionAdicionalFormGroup = FormGroup<InscripcionAdicionalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionAdicionalFormService {
  createInscripcionAdicionalFormGroup(
    inscripcionAdicional: InscripcionAdicionalFormGroupInput = { id: null }
  ): InscripcionAdicionalFormGroup {
    const inscripcionAdicionalRawValue = {
      ...this.getFormDefaults(),
      ...inscripcionAdicional,
    };
    return new FormGroup<InscripcionAdicionalFormGroupContent>({
      id: new FormControl(
        { value: inscripcionAdicionalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      descripcion: new FormControl(inscripcionAdicionalRawValue.descripcion),
      imagen: new FormControl(inscripcionAdicionalRawValue.imagen),
      imagenContentType: new FormControl(inscripcionAdicionalRawValue.imagenContentType),
      documento: new FormControl(inscripcionAdicionalRawValue.documento),
      cantidad: new FormControl(inscripcionAdicionalRawValue.cantidad),
      costo: new FormControl(inscripcionAdicionalRawValue.costo),
      inscripcion: new FormControl(inscripcionAdicionalRawValue.inscripcion, {
        validators: [Validators.required],
      }),
      inscripcionRequisito: new FormControl(inscripcionAdicionalRawValue.inscripcionRequisito),
    });
  }

  getInscripcionAdicional(form: InscripcionAdicionalFormGroup): IInscripcionAdicional | NewInscripcionAdicional {
    return form.getRawValue() as IInscripcionAdicional | NewInscripcionAdicional;
  }

  resetForm(form: InscripcionAdicionalFormGroup, inscripcionAdicional: InscripcionAdicionalFormGroupInput): void {
    const inscripcionAdicionalRawValue = { ...this.getFormDefaults(), ...inscripcionAdicional };
    form.reset(
      {
        ...inscripcionAdicionalRawValue,
        id: { value: inscripcionAdicionalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionAdicionalFormDefaults {
    return {
      id: null,
    };
  }
}
