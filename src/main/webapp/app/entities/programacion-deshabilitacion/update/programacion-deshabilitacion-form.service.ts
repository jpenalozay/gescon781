import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProgramacionDeshabilitacion, NewProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProgramacionDeshabilitacion for edit and NewProgramacionDeshabilitacionFormGroupInput for create.
 */
type ProgramacionDeshabilitacionFormGroupInput = IProgramacionDeshabilitacion | PartialWithRequiredKeyOf<NewProgramacionDeshabilitacion>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProgramacionDeshabilitacion | NewProgramacionDeshabilitacion> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

type ProgramacionDeshabilitacionFormRawValue = FormValueOf<IProgramacionDeshabilitacion>;

type NewProgramacionDeshabilitacionFormRawValue = FormValueOf<NewProgramacionDeshabilitacion>;

type ProgramacionDeshabilitacionFormDefaults = Pick<NewProgramacionDeshabilitacion, 'id' | 'fecha' | 'fechas' | 'horarioCatalogos'>;

type ProgramacionDeshabilitacionFormGroupContent = {
  id: FormControl<ProgramacionDeshabilitacionFormRawValue['id'] | NewProgramacionDeshabilitacion['id']>;
  activo: FormControl<ProgramacionDeshabilitacionFormRawValue['activo']>;
  codigo: FormControl<ProgramacionDeshabilitacionFormRawValue['codigo']>;
  descripcion: FormControl<ProgramacionDeshabilitacionFormRawValue['descripcion']>;
  fecha: FormControl<ProgramacionDeshabilitacionFormRawValue['fecha']>;
  nombreUsuario: FormControl<ProgramacionDeshabilitacionFormRawValue['nombreUsuario']>;
  fechas: FormControl<ProgramacionDeshabilitacionFormRawValue['fechas']>;
  horarioCatalogos: FormControl<ProgramacionDeshabilitacionFormRawValue['horarioCatalogos']>;
  programacion: FormControl<ProgramacionDeshabilitacionFormRawValue['programacion']>;
  usuario: FormControl<ProgramacionDeshabilitacionFormRawValue['usuario']>;
};

export type ProgramacionDeshabilitacionFormGroup = FormGroup<ProgramacionDeshabilitacionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProgramacionDeshabilitacionFormService {
  createProgramacionDeshabilitacionFormGroup(
    programacionDeshabilitacion: ProgramacionDeshabilitacionFormGroupInput = { id: null }
  ): ProgramacionDeshabilitacionFormGroup {
    const programacionDeshabilitacionRawValue = this.convertProgramacionDeshabilitacionToProgramacionDeshabilitacionRawValue({
      ...this.getFormDefaults(),
      ...programacionDeshabilitacion,
    });
    return new FormGroup<ProgramacionDeshabilitacionFormGroupContent>({
      id: new FormControl(
        { value: programacionDeshabilitacionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(programacionDeshabilitacionRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(programacionDeshabilitacionRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
      }),
      descripcion: new FormControl(programacionDeshabilitacionRawValue.descripcion),
      fecha: new FormControl(programacionDeshabilitacionRawValue.fecha),
      nombreUsuario: new FormControl(programacionDeshabilitacionRawValue.nombreUsuario),
      fechas: new FormControl(programacionDeshabilitacionRawValue.fechas ?? []),
      horarioCatalogos: new FormControl(programacionDeshabilitacionRawValue.horarioCatalogos ?? []),
      programacion: new FormControl(programacionDeshabilitacionRawValue.programacion, {
        validators: [Validators.required],
      }),
      usuario: new FormControl(programacionDeshabilitacionRawValue.usuario),
    });
  }

  getProgramacionDeshabilitacion(
    form: ProgramacionDeshabilitacionFormGroup
  ): IProgramacionDeshabilitacion | NewProgramacionDeshabilitacion {
    return this.convertProgramacionDeshabilitacionRawValueToProgramacionDeshabilitacion(
      form.getRawValue() as ProgramacionDeshabilitacionFormRawValue | NewProgramacionDeshabilitacionFormRawValue
    );
  }

  resetForm(form: ProgramacionDeshabilitacionFormGroup, programacionDeshabilitacion: ProgramacionDeshabilitacionFormGroupInput): void {
    const programacionDeshabilitacionRawValue = this.convertProgramacionDeshabilitacionToProgramacionDeshabilitacionRawValue({
      ...this.getFormDefaults(),
      ...programacionDeshabilitacion,
    });
    form.reset(
      {
        ...programacionDeshabilitacionRawValue,
        id: { value: programacionDeshabilitacionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProgramacionDeshabilitacionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fecha: currentTime,
      fechas: [],
      horarioCatalogos: [],
    };
  }

  private convertProgramacionDeshabilitacionRawValueToProgramacionDeshabilitacion(
    rawProgramacionDeshabilitacion: ProgramacionDeshabilitacionFormRawValue | NewProgramacionDeshabilitacionFormRawValue
  ): IProgramacionDeshabilitacion | NewProgramacionDeshabilitacion {
    return {
      ...rawProgramacionDeshabilitacion,
      fecha: dayjs(rawProgramacionDeshabilitacion.fecha, DATE_TIME_FORMAT),
    };
  }

  private convertProgramacionDeshabilitacionToProgramacionDeshabilitacionRawValue(
    programacionDeshabilitacion:
      | IProgramacionDeshabilitacion
      | (Partial<NewProgramacionDeshabilitacion> & ProgramacionDeshabilitacionFormDefaults)
  ): ProgramacionDeshabilitacionFormRawValue | PartialWithRequiredKeyOf<NewProgramacionDeshabilitacionFormRawValue> {
    return {
      ...programacionDeshabilitacion,
      fecha: programacionDeshabilitacion.fecha ? programacionDeshabilitacion.fecha.format(DATE_TIME_FORMAT) : undefined,
      fechas: programacionDeshabilitacion.fechas ?? [],
      horarioCatalogos: programacionDeshabilitacion.horarioCatalogos ?? [],
    };
  }
}
