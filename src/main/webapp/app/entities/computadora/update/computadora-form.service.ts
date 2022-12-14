import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComputadora, NewComputadora } from '../computadora.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComputadora for edit and NewComputadoraFormGroupInput for create.
 */
type ComputadoraFormGroupInput = IComputadora | PartialWithRequiredKeyOf<NewComputadora>;

type ComputadoraFormDefaults = Pick<NewComputadora, 'id' | 'usuarios'>;

type ComputadoraFormGroupContent = {
  id: FormControl<IComputadora['id'] | NewComputadora['id']>;
  nombre: FormControl<IComputadora['nombre']>;
  nombreCorto: FormControl<IComputadora['nombreCorto']>;
  descripcion: FormControl<IComputadora['descripcion']>;
  estadoComputadora: FormControl<IComputadora['estadoComputadora']>;
  mac: FormControl<IComputadora['mac']>;
  tipo: FormControl<IComputadora['tipo']>;
  usuarios: FormControl<IComputadora['usuarios']>;
};

export type ComputadoraFormGroup = FormGroup<ComputadoraFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComputadoraFormService {
  createComputadoraFormGroup(computadora: ComputadoraFormGroupInput = { id: null }): ComputadoraFormGroup {
    const computadoraRawValue = {
      ...this.getFormDefaults(),
      ...computadora,
    };
    return new FormGroup<ComputadoraFormGroupContent>({
      id: new FormControl(
        { value: computadoraRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombre: new FormControl(computadoraRawValue.nombre, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(256)],
      }),
      nombreCorto: new FormControl(computadoraRawValue.nombreCorto, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
      }),
      descripcion: new FormControl(computadoraRawValue.descripcion, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(512)],
      }),
      estadoComputadora: new FormControl(computadoraRawValue.estadoComputadora, {
        validators: [Validators.required],
      }),
      mac: new FormControl(computadoraRawValue.mac, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      }),
      tipo: new FormControl(computadoraRawValue.tipo, {
        validators: [Validators.required],
      }),
      usuarios: new FormControl(computadoraRawValue.usuarios ?? []),
    });
  }

  getComputadora(form: ComputadoraFormGroup): IComputadora | NewComputadora {
    return form.getRawValue() as IComputadora | NewComputadora;
  }

  resetForm(form: ComputadoraFormGroup, computadora: ComputadoraFormGroupInput): void {
    const computadoraRawValue = { ...this.getFormDefaults(), ...computadora };
    form.reset(
      {
        ...computadoraRawValue,
        id: { value: computadoraRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComputadoraFormDefaults {
    return {
      id: null,
      usuarios: [],
    };
  }
}
