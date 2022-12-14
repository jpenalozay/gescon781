import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInscripcionAsignaturaRequisito, NewInscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscripcionAsignaturaRequisito for edit and NewInscripcionAsignaturaRequisitoFormGroupInput for create.
 */
type InscripcionAsignaturaRequisitoFormGroupInput =
  | IInscripcionAsignaturaRequisito
  | PartialWithRequiredKeyOf<NewInscripcionAsignaturaRequisito>;

type InscripcionAsignaturaRequisitoFormDefaults = Pick<NewInscripcionAsignaturaRequisito, 'id'>;

type InscripcionAsignaturaRequisitoFormGroupContent = {
  id: FormControl<IInscripcionAsignaturaRequisito['id'] | NewInscripcionAsignaturaRequisito['id']>;
  descripcion: FormControl<IInscripcionAsignaturaRequisito['descripcion']>;
  imagen: FormControl<IInscripcionAsignaturaRequisito['imagen']>;
  imagenContentType: FormControl<IInscripcionAsignaturaRequisito['imagenContentType']>;
  documento: FormControl<IInscripcionAsignaturaRequisito['documento']>;
  inscripcionDetalle: FormControl<IInscripcionAsignaturaRequisito['inscripcionDetalle']>;
  asignaturaRequisito: FormControl<IInscripcionAsignaturaRequisito['asignaturaRequisito']>;
};

export type InscripcionAsignaturaRequisitoFormGroup = FormGroup<InscripcionAsignaturaRequisitoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscripcionAsignaturaRequisitoFormService {
  createInscripcionAsignaturaRequisitoFormGroup(
    inscripcionAsignaturaRequisito: InscripcionAsignaturaRequisitoFormGroupInput = { id: null }
  ): InscripcionAsignaturaRequisitoFormGroup {
    const inscripcionAsignaturaRequisitoRawValue = {
      ...this.getFormDefaults(),
      ...inscripcionAsignaturaRequisito,
    };
    return new FormGroup<InscripcionAsignaturaRequisitoFormGroupContent>({
      id: new FormControl(
        { value: inscripcionAsignaturaRequisitoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      descripcion: new FormControl(inscripcionAsignaturaRequisitoRawValue.descripcion),
      imagen: new FormControl(inscripcionAsignaturaRequisitoRawValue.imagen),
      imagenContentType: new FormControl(inscripcionAsignaturaRequisitoRawValue.imagenContentType),
      documento: new FormControl(inscripcionAsignaturaRequisitoRawValue.documento),
      inscripcionDetalle: new FormControl(inscripcionAsignaturaRequisitoRawValue.inscripcionDetalle, {
        validators: [Validators.required],
      }),
      asignaturaRequisito: new FormControl(inscripcionAsignaturaRequisitoRawValue.asignaturaRequisito, {
        validators: [Validators.required],
      }),
    });
  }

  getInscripcionAsignaturaRequisito(
    form: InscripcionAsignaturaRequisitoFormGroup
  ): IInscripcionAsignaturaRequisito | NewInscripcionAsignaturaRequisito {
    return form.getRawValue() as IInscripcionAsignaturaRequisito | NewInscripcionAsignaturaRequisito;
  }

  resetForm(
    form: InscripcionAsignaturaRequisitoFormGroup,
    inscripcionAsignaturaRequisito: InscripcionAsignaturaRequisitoFormGroupInput
  ): void {
    const inscripcionAsignaturaRequisitoRawValue = { ...this.getFormDefaults(), ...inscripcionAsignaturaRequisito };
    form.reset(
      {
        ...inscripcionAsignaturaRequisitoRawValue,
        id: { value: inscripcionAsignaturaRequisitoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InscripcionAsignaturaRequisitoFormDefaults {
    return {
      id: null,
    };
  }
}
