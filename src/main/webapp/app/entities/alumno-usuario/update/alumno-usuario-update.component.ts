import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAlumnoUsuario, AlumnoUsuario } from '../alumno-usuario.model';
import { AlumnoUsuarioService } from '../service/alumno-usuario.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-alumno-usuario-update',
  templateUrl: './alumno-usuario-update.component.html',
})
export class AlumnoUsuarioUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  alumnosSharedCollection: IAlumno[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [],
    usuario: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
    clave: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
    imagen: [],
    imagenContentType: [],
    alumno: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected alumnoUsuarioService: AlumnoUsuarioService,
    protected alumnoService: AlumnoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoUsuario }) => {
      this.updateForm(alumnoUsuario);

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
    const alumnoUsuario = this.createFromForm();
    if (alumnoUsuario.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoUsuarioService.update(alumnoUsuario));
    } else {
      this.subscribeToSaveResponse(this.alumnoUsuarioService.create(alumnoUsuario));
    }
  }

  trackAlumnoById(_index: number, item: IAlumno): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumnoUsuario>>): void {
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

  protected updateForm(alumnoUsuario: IAlumnoUsuario): void {
    this.editForm.patchValue({
      id: alumnoUsuario.id,
      activo: alumnoUsuario.activo,
      usuario: alumnoUsuario.usuario,
      clave: alumnoUsuario.clave,
      imagen: alumnoUsuario.imagen,
      imagenContentType: alumnoUsuario.imagenContentType,
      alumno: alumnoUsuario.alumno,
    });

    this.alumnosSharedCollection = this.alumnoService.addAlumnoToCollectionIfMissing(this.alumnosSharedCollection, alumnoUsuario.alumno);
  }

  protected loadRelationshipsOptions(): void {
    this.alumnoService
      .query()
      .pipe(map((res: HttpResponse<IAlumno[]>) => res.body ?? []))
      .pipe(map((alumnos: IAlumno[]) => this.alumnoService.addAlumnoToCollectionIfMissing(alumnos, this.editForm.get('alumno')!.value)))
      .subscribe((alumnos: IAlumno[]) => (this.alumnosSharedCollection = alumnos));
  }

  protected createFromForm(): IAlumnoUsuario {
    return {
      ...new AlumnoUsuario(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      clave: this.editForm.get(['clave'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      alumno: this.editForm.get(['alumno'])!.value,
    };
  }
}
