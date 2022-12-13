import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPersona, Persona } from '../persona.model';
import { PersonaService } from '../service/persona.service';
import { IDistrit } from 'app/entities/distrit/distrit.model';
import { DistritService } from 'app/entities/distrit/service/distrit.service';
import { Paises } from 'app/entities/enumerations/paises.model';
import { Sexo } from 'app/entities/enumerations/sexo.model';
import { EstadoCivilPersona } from 'app/entities/enumerations/estado-civil-persona.model';
import { TipoDocumentoPersona } from 'app/entities/enumerations/tipo-documento-persona.model';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html',
})
export class PersonaUpdateComponent implements OnInit {
  isSaving = false;
  paisesValues = Object.keys(Paises);
  sexoValues = Object.keys(Sexo);
  estadoCivilPersonaValues = Object.keys(EstadoCivilPersona);
  tipoDocumentoPersonaValues = Object.keys(TipoDocumentoPersona);

  distritsSharedCollection: IDistrit[] = [];

  editForm = this.fb.group({
    id: [],
    nacionalidad: [],
    nombres: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    apellidoPaterno: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
    apellidoMaterno: [null, [Validators.minLength(1), Validators.maxLength(128)]],
    fechaNacimiento: [],
    genero: [],
    estadoCivil: [],
    tipoDocumento: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    telefonoParticular: [null, [Validators.minLength(1), Validators.maxLength(20)]],
    telefonoParticular1: [null, [Validators.minLength(1), Validators.maxLength(20)]],
    emailPersonal: [null, [Validators.minLength(1), Validators.maxLength(128)]],
    direccion: [null, [Validators.minLength(1), Validators.maxLength(512)]],
    distrito: [],
  });

  constructor(
    protected personaService: PersonaService,
    protected distritService: DistritService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  trackDistritById(_index: number, item: IDistrit): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      id: persona.id,
      nacionalidad: persona.nacionalidad,
      nombres: persona.nombres,
      apellidoPaterno: persona.apellidoPaterno,
      apellidoMaterno: persona.apellidoMaterno,
      fechaNacimiento: persona.fechaNacimiento,
      genero: persona.genero,
      estadoCivil: persona.estadoCivil,
      tipoDocumento: persona.tipoDocumento,
      numeroDocumento: persona.numeroDocumento,
      telefonoParticular: persona.telefonoParticular,
      telefonoParticular1: persona.telefonoParticular1,
      emailPersonal: persona.emailPersonal,
      direccion: persona.direccion,
      distrito: persona.distrito,
    });

    this.distritsSharedCollection = this.distritService.addDistritToCollectionIfMissing(this.distritsSharedCollection, persona.distrito);
  }

  protected loadRelationshipsOptions(): void {
    this.distritService
      .query()
      .pipe(map((res: HttpResponse<IDistrit[]>) => res.body ?? []))
      .pipe(
        map((distrits: IDistrit[]) => this.distritService.addDistritToCollectionIfMissing(distrits, this.editForm.get('distrito')!.value))
      )
      .subscribe((distrits: IDistrit[]) => (this.distritsSharedCollection = distrits));
  }

  protected createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id'])!.value,
      nacionalidad: this.editForm.get(['nacionalidad'])!.value,
      nombres: this.editForm.get(['nombres'])!.value,
      apellidoPaterno: this.editForm.get(['apellidoPaterno'])!.value,
      apellidoMaterno: this.editForm.get(['apellidoMaterno'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value,
      genero: this.editForm.get(['genero'])!.value,
      estadoCivil: this.editForm.get(['estadoCivil'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      telefonoParticular: this.editForm.get(['telefonoParticular'])!.value,
      telefonoParticular1: this.editForm.get(['telefonoParticular1'])!.value,
      emailPersonal: this.editForm.get(['emailPersonal'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      distrito: this.editForm.get(['distrito'])!.value,
    };
  }
}
