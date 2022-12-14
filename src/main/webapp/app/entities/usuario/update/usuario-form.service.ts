import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuario, NewUsuario } from '../usuario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuario for edit and NewUsuarioFormGroupInput for create.
 */
type UsuarioFormGroupInput = IUsuario | PartialWithRequiredKeyOf<NewUsuario>;

type UsuarioFormDefaults = Pick<NewUsuario, 'id' | 'sucursals' | 'computadoras'>;

type UsuarioFormGroupContent = {
  id: FormControl<IUsuario['id'] | NewUsuario['id']>;
  codigo: FormControl<IUsuario['codigo']>;
  codigoSecreto: FormControl<IUsuario['codigoSecreto']>;
  imagen: FormControl<IUsuario['imagen']>;
  imagenContentType: FormControl<IUsuario['imagenContentType']>;
  user: FormControl<IUsuario['user']>;
  empleado: FormControl<IUsuario['empleado']>;
  sucursals: FormControl<IUsuario['sucursals']>;
  computadoras: FormControl<IUsuario['computadoras']>;
};

export type UsuarioFormGroup = FormGroup<UsuarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioFormService {
  createUsuarioFormGroup(usuario: UsuarioFormGroupInput = { id: null }): UsuarioFormGroup {
    const usuarioRawValue = {
      ...this.getFormDefaults(),
      ...usuario,
    };
    return new FormGroup<UsuarioFormGroupContent>({
      id: new FormControl(
        { value: usuarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(usuarioRawValue.codigo, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      }),
      codigoSecreto: new FormControl(usuarioRawValue.codigoSecreto, {
        validators: [Validators.minLength(2), Validators.maxLength(6)],
      }),
      imagen: new FormControl(usuarioRawValue.imagen),
      imagenContentType: new FormControl(usuarioRawValue.imagenContentType),
      user: new FormControl(usuarioRawValue.user, {
        validators: [Validators.required],
      }),
      empleado: new FormControl(usuarioRawValue.empleado),
      sucursals: new FormControl(usuarioRawValue.sucursals ?? []),
      computadoras: new FormControl(usuarioRawValue.computadoras ?? []),
    });
  }

  getUsuario(form: UsuarioFormGroup): IUsuario | NewUsuario {
    return form.getRawValue() as IUsuario | NewUsuario;
  }

  resetForm(form: UsuarioFormGroup, usuario: UsuarioFormGroupInput): void {
    const usuarioRawValue = { ...this.getFormDefaults(), ...usuario };
    form.reset(
      {
        ...usuarioRawValue,
        id: { value: usuarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuarioFormDefaults {
    return {
      id: null,
      sucursals: [],
      computadoras: [],
    };
  }
}
