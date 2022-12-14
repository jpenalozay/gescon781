import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPersona, NewPersona } from '../persona.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPersona for edit and NewPersonaFormGroupInput for create.
 */
type PersonaFormGroupInput = IPersona | PartialWithRequiredKeyOf<NewPersona>;

type PersonaFormDefaults = Pick<NewPersona, 'id'>;

type PersonaFormGroupContent = {
  id: FormControl<IPersona['id'] | NewPersona['id']>;
  nacionalidad: FormControl<IPersona['nacionalidad']>;
  nombres: FormControl<IPersona['nombres']>;
  apellidoPaterno: FormControl<IPersona['apellidoPaterno']>;
  apellidoMaterno: FormControl<IPersona['apellidoMaterno']>;
  fechaNacimiento: FormControl<IPersona['fechaNacimiento']>;
  genero: FormControl<IPersona['genero']>;
  estadoCivil: FormControl<IPersona['estadoCivil']>;
  tipoDocumento: FormControl<IPersona['tipoDocumento']>;
  numeroDocumento: FormControl<IPersona['numeroDocumento']>;
  telefonoParticular: FormControl<IPersona['telefonoParticular']>;
  telefonoParticular1: FormControl<IPersona['telefonoParticular1']>;
  emailPersonal: FormControl<IPersona['emailPersonal']>;
  direccion: FormControl<IPersona['direccion']>;
  distrito: FormControl<IPersona['distrito']>;
};

export type PersonaFormGroup = FormGroup<PersonaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PersonaFormService {
  createPersonaFormGroup(persona: PersonaFormGroupInput = { id: null }): PersonaFormGroup {
    const personaRawValue = {
      ...this.getFormDefaults(),
      ...persona,
    };
    return new FormGroup<PersonaFormGroupContent>({
      id: new FormControl(
        { value: personaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nacionalidad: new FormControl(personaRawValue.nacionalidad),
      nombres: new FormControl(personaRawValue.nombres, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(128)],
      }),
      apellidoPaterno: new FormControl(personaRawValue.apellidoPaterno, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(128)],
      }),
      apellidoMaterno: new FormControl(personaRawValue.apellidoMaterno, {
        validators: [Validators.minLength(1), Validators.maxLength(128)],
      }),
      fechaNacimiento: new FormControl(personaRawValue.fechaNacimiento),
      genero: new FormControl(personaRawValue.genero),
      estadoCivil: new FormControl(personaRawValue.estadoCivil),
      tipoDocumento: new FormControl(personaRawValue.tipoDocumento, {
        validators: [Validators.required],
      }),
      numeroDocumento: new FormControl(personaRawValue.numeroDocumento, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
      }),
      telefonoParticular: new FormControl(personaRawValue.telefonoParticular, {
        validators: [Validators.minLength(1), Validators.maxLength(20)],
      }),
      telefonoParticular1: new FormControl(personaRawValue.telefonoParticular1, {
        validators: [Validators.minLength(1), Validators.maxLength(20)],
      }),
      emailPersonal: new FormControl(personaRawValue.emailPersonal, {
        validators: [Validators.minLength(1), Validators.maxLength(128)],
      }),
      direccion: new FormControl(personaRawValue.direccion, {
        validators: [Validators.minLength(1), Validators.maxLength(512)],
      }),
      distrito: new FormControl(personaRawValue.distrito),
    });
  }

  getPersona(form: PersonaFormGroup): IPersona | NewPersona {
    return form.getRawValue() as IPersona | NewPersona;
  }

  resetForm(form: PersonaFormGroup, persona: PersonaFormGroupInput): void {
    const personaRawValue = { ...this.getFormDefaults(), ...persona };
    form.reset(
      {
        ...personaRawValue,
        id: { value: personaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PersonaFormDefaults {
    return {
      id: null,
    };
  }
}
