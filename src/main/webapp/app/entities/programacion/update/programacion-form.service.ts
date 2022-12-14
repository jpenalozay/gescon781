import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProgramacion, NewProgramacion } from '../programacion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProgramacion for edit and NewProgramacionFormGroupInput for create.
 */
type ProgramacionFormGroupInput = IProgramacion | PartialWithRequiredKeyOf<NewProgramacion>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProgramacion | NewProgramacion> = Omit<T, 'fecha'> & {
  fecha?: string | null;
};

type ProgramacionFormRawValue = FormValueOf<IProgramacion>;

type NewProgramacionFormRawValue = FormValueOf<NewProgramacion>;

type ProgramacionFormDefaults = Pick<NewProgramacion, 'id' | 'fecha' | 'dias' | 'horarioCatalogos'>;

type ProgramacionFormGroupContent = {
  id: FormControl<ProgramacionFormRawValue['id'] | NewProgramacion['id']>;
  estado: FormControl<ProgramacionFormRawValue['estado']>;
  codigo: FormControl<ProgramacionFormRawValue['codigo']>;
  fechaInicio: FormControl<ProgramacionFormRawValue['fechaInicio']>;
  fechaFin: FormControl<ProgramacionFormRawValue['fechaFin']>;
  deshabilitaciones: FormControl<ProgramacionFormRawValue['deshabilitaciones']>;
  fecha: FormControl<ProgramacionFormRawValue['fecha']>;
  nombreUsuario: FormControl<ProgramacionFormRawValue['nombreUsuario']>;
  dias: FormControl<ProgramacionFormRawValue['dias']>;
  horarioCatalogos: FormControl<ProgramacionFormRawValue['horarioCatalogos']>;
  profesor: FormControl<ProgramacionFormRawValue['profesor']>;
  automovil: FormControl<ProgramacionFormRawValue['automovil']>;
};

export type ProgramacionFormGroup = FormGroup<ProgramacionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProgramacionFormService {
  createProgramacionFormGroup(programacion: ProgramacionFormGroupInput = { id: null }): ProgramacionFormGroup {
    const programacionRawValue = this.convertProgramacionToProgramacionRawValue({
      ...this.getFormDefaults(),
      ...programacion,
    });
    return new FormGroup<ProgramacionFormGroupContent>({
      id: new FormControl(
        { value: programacionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      estado: new FormControl(programacionRawValue.estado, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(programacionRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(9)],
      }),
      fechaInicio: new FormControl(programacionRawValue.fechaInicio),
      fechaFin: new FormControl(programacionRawValue.fechaFin),
      deshabilitaciones: new FormControl(programacionRawValue.deshabilitaciones, {
        validators: [Validators.min(0), Validators.max(99)],
      }),
      fecha: new FormControl(programacionRawValue.fecha),
      nombreUsuario: new FormControl(programacionRawValue.nombreUsuario),
      dias: new FormControl(programacionRawValue.dias ?? []),
      horarioCatalogos: new FormControl(programacionRawValue.horarioCatalogos ?? []),
      profesor: new FormControl(programacionRawValue.profesor, {
        validators: [Validators.required],
      }),
      automovil: new FormControl(programacionRawValue.automovil, {
        validators: [Validators.required],
      }),
    });
  }

  getProgramacion(form: ProgramacionFormGroup): IProgramacion | NewProgramacion {
    return this.convertProgramacionRawValueToProgramacion(form.getRawValue() as ProgramacionFormRawValue | NewProgramacionFormRawValue);
  }

  resetForm(form: ProgramacionFormGroup, programacion: ProgramacionFormGroupInput): void {
    const programacionRawValue = this.convertProgramacionToProgramacionRawValue({ ...this.getFormDefaults(), ...programacion });
    form.reset(
      {
        ...programacionRawValue,
        id: { value: programacionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProgramacionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fecha: currentTime,
      dias: [],
      horarioCatalogos: [],
    };
  }

  private convertProgramacionRawValueToProgramacion(
    rawProgramacion: ProgramacionFormRawValue | NewProgramacionFormRawValue
  ): IProgramacion | NewProgramacion {
    return {
      ...rawProgramacion,
      fecha: dayjs(rawProgramacion.fecha, DATE_TIME_FORMAT),
    };
  }

  private convertProgramacionToProgramacionRawValue(
    programacion: IProgramacion | (Partial<NewProgramacion> & ProgramacionFormDefaults)
  ): ProgramacionFormRawValue | PartialWithRequiredKeyOf<NewProgramacionFormRawValue> {
    return {
      ...programacion,
      fecha: programacion.fecha ? programacion.fecha.format(DATE_TIME_FORMAT) : undefined,
      dias: programacion.dias ?? [],
      horarioCatalogos: programacion.horarioCatalogos ?? [],
    };
  }
}
