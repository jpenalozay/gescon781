import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Automovil, IAutomovil, NewAutomovil } from '../automovil.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAutomovil for edit and NewAutomovilFormGroupInput for create.
 */
type AutomovilFormGroupInput = IAutomovil | PartialWithRequiredKeyOf<NewAutomovil>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAutomovil | NewAutomovil> = Omit<T, 'soatVencimiento' | 'revisionTecnicaVencimiento'> & {
  soatVencimiento?: string | null;
  revisionTecnicaVencimiento?: string | null;
};

type AutomovilFormRawValue = FormValueOf<IAutomovil>;

type NewAutomovilFormRawValue = FormValueOf<NewAutomovil>;

type AutomovilFormDefaults = Pick<NewAutomovil, 'id' | 'soatVencimiento' | 'revisionTecnicaVencimiento'>;

type AutomovilFormGroupContent = {
  id: FormControl<AutomovilFormRawValue['id'] | NewAutomovil['id']>;
  activo: FormControl<AutomovilFormRawValue['activo']>;
  codigo: FormControl<AutomovilFormRawValue['codigo']>;
  nombre: FormControl<AutomovilFormRawValue['nombre']>;
  tipo: FormControl<AutomovilFormRawValue['tipo']>;
  placa: FormControl<AutomovilFormRawValue['placa']>;
  marca: FormControl<AutomovilFormRawValue['marca']>;
  modelo: FormControl<AutomovilFormRawValue['modelo']>;
  anio: FormControl<AutomovilFormRawValue['anio']>;
  soatVencimiento: FormControl<AutomovilFormRawValue['soatVencimiento']>;
  revisionTecnicaVencimiento: FormControl<AutomovilFormRawValue['revisionTecnicaVencimiento']>;
  caja: FormControl<AutomovilFormRawValue['caja']>;
  imagen: FormControl<AutomovilFormRawValue['imagen']>;
  imagenContentType: FormControl<AutomovilFormRawValue['imagenContentType']>;
};

export type AutomovilFormGroup = FormGroup<AutomovilFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AutomovilFormService {
  createAutomovilFormGroup(automovil: AutomovilFormGroupInput = { id: null }): AutomovilFormGroup {
    const automovilRawValue = this.convertAutomovilToAutomovilRawValue({
      ...this.getFormDefaults(),
      ...automovil,
    });
    return new FormGroup<AutomovilFormGroupContent>({
      id: new FormControl(
        { value: automovilRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      activo: new FormControl(automovilRawValue.activo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(automovilRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(6)],
      }),
      nombre: new FormControl(automovilRawValue.nombre, {
        validators: [Validators.minLength(2), Validators.maxLength(64)],
      }),
      tipo: new FormControl(automovilRawValue.tipo, {
        validators: [Validators.required],
      }),
      placa: new FormControl(automovilRawValue.placa, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      marca: new FormControl(automovilRawValue.marca, {
        validators: [Validators.minLength(2), Validators.maxLength(64)],
      }),
      modelo: new FormControl(automovilRawValue.modelo, {
        validators: [Validators.minLength(2), Validators.maxLength(64)],
      }),
      anio: new FormControl(automovilRawValue.anio, {
        validators: [Validators.minLength(4), Validators.maxLength(4)],
      }),
      soatVencimiento: new FormControl(automovilRawValue.soatVencimiento),
      revisionTecnicaVencimiento: new FormControl(automovilRawValue.revisionTecnicaVencimiento),
      caja: new FormControl(automovilRawValue.caja),
      imagen: new FormControl(automovilRawValue.imagen),
      imagenContentType: new FormControl(automovilRawValue.imagenContentType),
    });
  }

  getAutomovil(form: AutomovilFormGroup): IAutomovil | NewAutomovil {
    return this.convertAutomovilRawValueToAutomovil(form.getRawValue() as AutomovilFormRawValue | NewAutomovilFormRawValue);
  }

  resetForm(form: AutomovilFormGroup, automovil: AutomovilFormGroupInput): void {
    const automovilRawValue = this.convertAutomovilToAutomovilRawValue({ ...this.getFormDefaults(), ...automovil });
    form.reset(
      {
        ...automovilRawValue,
        id: { value: automovilRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AutomovilFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      soatVencimiento: currentTime,
      revisionTecnicaVencimiento: currentTime,
    };
  }

  private convertAutomovilRawValueToAutomovil(rawAutomovil: AutomovilFormRawValue | NewAutomovilFormRawValue): IAutomovil | NewAutomovil {
    return {
      ...rawAutomovil,
      soatVencimiento: dayjs(rawAutomovil.soatVencimiento, DATE_TIME_FORMAT),
      revisionTecnicaVencimiento: dayjs(rawAutomovil.revisionTecnicaVencimiento, DATE_TIME_FORMAT),
    };
  }

  private convertAutomovilToAutomovilRawValue(
    automovil: IAutomovil | (Partial<NewAutomovil> & AutomovilFormDefaults)
  ): AutomovilFormRawValue | PartialWithRequiredKeyOf<NewAutomovilFormRawValue> {
    return {
      automovil: Automovil,
      soatVencimiento: automovil.soatVencimiento ? automovil.soatVencimiento.format(DATE_TIME_FORMAT) : undefined,
      revisionTecnicaVencimiento: automovil.revisionTecnicaVencimiento
        ? automovil.revisionTecnicaVencimiento.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
