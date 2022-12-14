import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmpleado, NewEmpleado } from '../empleado.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmpleado for edit and NewEmpleadoFormGroupInput for create.
 */
type EmpleadoFormGroupInput = IEmpleado | PartialWithRequiredKeyOf<NewEmpleado>;

type EmpleadoFormDefaults = Pick<NewEmpleado, 'id'>;

type EmpleadoFormGroupContent = {
  id: FormControl<IEmpleado['id'] | NewEmpleado['id']>;
  estado: FormControl<IEmpleado['estado']>;
  tipo: FormControl<IEmpleado['tipo']>;
  codigo: FormControl<IEmpleado['codigo']>;
  codigoAcceso: FormControl<IEmpleado['codigoAcceso']>;
  telefonoTrabajo: FormControl<IEmpleado['telefonoTrabajo']>;
  telefonoTrabajo1: FormControl<IEmpleado['telefonoTrabajo1']>;
  gradoInstrucion: FormControl<IEmpleado['gradoInstrucion']>;
  emailCoorporativo: FormControl<IEmpleado['emailCoorporativo']>;
  fechaIngreso: FormControl<IEmpleado['fechaIngreso']>;
  inasistencias: FormControl<IEmpleado['inasistencias']>;
  tardanzas: FormControl<IEmpleado['tardanzas']>;
  imagen: FormControl<IEmpleado['imagen']>;
  imagenContentType: FormControl<IEmpleado['imagenContentType']>;
  sueldo: FormControl<IEmpleado['sueldo']>;
  firma: FormControl<IEmpleado['firma']>;
  firmaContentType: FormControl<IEmpleado['firmaContentType']>;
  persona: FormControl<IEmpleado['persona']>;
  cargo: FormControl<IEmpleado['cargo']>;
};

export type EmpleadoFormGroup = FormGroup<EmpleadoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmpleadoFormService {
  createEmpleadoFormGroup(empleado: EmpleadoFormGroupInput = { id: null }): EmpleadoFormGroup {
    const empleadoRawValue = {
      ...this.getFormDefaults(),
      ...empleado,
    };
    return new FormGroup<EmpleadoFormGroupContent>({
      id: new FormControl(
        { value: empleadoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      estado: new FormControl(empleadoRawValue.estado, {
        validators: [Validators.required],
      }),
      tipo: new FormControl(empleadoRawValue.tipo, {
        validators: [Validators.required],
      }),
      codigo: new FormControl(empleadoRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(6)],
      }),
      codigoAcceso: new FormControl(empleadoRawValue.codigoAcceso, {
        validators: [Validators.minLength(1), Validators.maxLength(5)],
      }),
      telefonoTrabajo: new FormControl(empleadoRawValue.telefonoTrabajo, {
        validators: [Validators.minLength(1), Validators.maxLength(20)],
      }),
      telefonoTrabajo1: new FormControl(empleadoRawValue.telefonoTrabajo1, {
        validators: [Validators.minLength(1), Validators.maxLength(20)],
      }),
      gradoInstrucion: new FormControl(empleadoRawValue.gradoInstrucion),
      emailCoorporativo: new FormControl(empleadoRawValue.emailCoorporativo, {
        validators: [Validators.minLength(1), Validators.maxLength(128)],
      }),
      fechaIngreso: new FormControl(empleadoRawValue.fechaIngreso, {
        validators: [Validators.required],
      }),
      inasistencias: new FormControl(empleadoRawValue.inasistencias, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      tardanzas: new FormControl(empleadoRawValue.tardanzas, {
        validators: [Validators.min(0), Validators.max(100)],
      }),
      imagen: new FormControl(empleadoRawValue.imagen),
      imagenContentType: new FormControl(empleadoRawValue.imagenContentType),
      sueldo: new FormControl(empleadoRawValue.sueldo),
      firma: new FormControl(empleadoRawValue.firma),
      firmaContentType: new FormControl(empleadoRawValue.firmaContentType),
      persona: new FormControl(empleadoRawValue.persona, {
        validators: [Validators.required],
      }),
      cargo: new FormControl(empleadoRawValue.cargo, {
        validators: [Validators.required],
      }),
    });
  }

  getEmpleado(form: EmpleadoFormGroup): IEmpleado | NewEmpleado {
    return form.getRawValue() as IEmpleado | NewEmpleado;
  }

  resetForm(form: EmpleadoFormGroup, empleado: EmpleadoFormGroupInput): void {
    const empleadoRawValue = { ...this.getFormDefaults(), ...empleado };
    form.reset(
      {
        ...empleadoRawValue,
        id: { value: empleadoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmpleadoFormDefaults {
    return {
      id: null,
    };
  }
}
