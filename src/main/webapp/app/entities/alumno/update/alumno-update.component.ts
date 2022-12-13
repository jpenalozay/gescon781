import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAlumno, Alumno } from '../alumno.model';
import { AlumnoService } from '../service/alumno.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IAlumnoClases } from 'app/entities/alumno-clases/alumno-clases.model';
import { AlumnoClasesService } from 'app/entities/alumno-clases/service/alumno-clases.service';
import { AlumnoEstado } from 'app/entities/enumerations/alumno-estado.model';
import { AlumnoTipo } from 'app/entities/enumerations/alumno-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';
import { Ocupacion } from 'app/entities/enumerations/ocupacion.model';

@Component({
  selector: 'jhi-alumno-update',
  templateUrl: './alumno-update.component.html',
})
export class AlumnoUpdateComponent implements OnInit {
  isSaving = false;
  alumnoEstadoValues = Object.keys(AlumnoEstado);
  alumnoTipoValues = Object.keys(AlumnoTipo);
  gradoInstruccionValues = Object.keys(GradoInstruccion);
  ocupacionValues = Object.keys(Ocupacion);

  personasCollection: IPersona[] = [];
  alumnoClasesCollection: IAlumnoClases[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    estado: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    alumnoGradoInstruccion: [],
    ocupacion: [],
    imagen: [],
    imagenContentType: [],
    persona: [null, Validators.required],
    alumnoClases: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected alumnoService: AlumnoService,
    protected personaService: PersonaService,
    protected alumnoClasesService: AlumnoClasesService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumno }) => {
      this.updateForm(alumno);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gesconApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alumno = this.createFromForm();
    if (alumno.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoService.update(alumno));
    } else {
      this.subscribeToSaveResponse(this.alumnoService.create(alumno));
    }
  }

  trackPersonaById(_index: number, item: IPersona): number {
    return item.id!;
  }

  trackAlumnoClasesById(_index: number, item: IAlumnoClases): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumno>>): void {
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

  protected updateForm(alumno: IAlumno): void {
    this.editForm.patchValue({
      id: alumno.id,
      codigo: alumno.codigo,
      estado: alumno.estado,
      tipo: alumno.tipo,
      alumnoGradoInstruccion: alumno.alumnoGradoInstruccion,
      ocupacion: alumno.ocupacion,
      imagen: alumno.imagen,
      imagenContentType: alumno.imagenContentType,
      persona: alumno.persona,
      alumnoClases: alumno.alumnoClases,
    });

    this.personasCollection = this.personaService.addPersonaToCollectionIfMissing(this.personasCollection, alumno.persona);
    this.alumnoClasesCollection = this.alumnoClasesService.addAlumnoClasesToCollectionIfMissing(
      this.alumnoClasesCollection,
      alumno.alumnoClases
    );
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query({ 'alumnoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing(personas, this.editForm.get('persona')!.value))
      )
      .subscribe((personas: IPersona[]) => (this.personasCollection = personas));

    this.alumnoClasesService
      .query({ 'alumnoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IAlumnoClases[]>) => res.body ?? []))
      .pipe(
        map((alumnoClases: IAlumnoClases[]) =>
          this.alumnoClasesService.addAlumnoClasesToCollectionIfMissing(alumnoClases, this.editForm.get('alumnoClases')!.value)
        )
      )
      .subscribe((alumnoClases: IAlumnoClases[]) => (this.alumnoClasesCollection = alumnoClases));
  }

  protected createFromForm(): IAlumno {
    return {
      ...new Alumno(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      alumnoGradoInstruccion: this.editForm.get(['alumnoGradoInstruccion'])!.value,
      ocupacion: this.editForm.get(['ocupacion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      persona: this.editForm.get(['persona'])!.value,
      alumnoClases: this.editForm.get(['alumnoClases'])!.value,
    };
  }
}
