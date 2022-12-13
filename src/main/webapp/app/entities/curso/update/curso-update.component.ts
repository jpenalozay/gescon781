import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICurso, Curso } from '../curso.model';
import { CursoService } from '../service/curso.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { CursoTipo } from 'app/entities/enumerations/curso-tipo.model';

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html',
})
export class CursoUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  cursoTipoValues = Object.keys(CursoTipo);

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    descripcion: [null, [Validators.minLength(2), Validators.maxLength(512)]],
    imagen: [],
    imagenContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected cursoService: CursoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);
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
    const curso = this.createFromForm();
    if (curso.id !== undefined) {
      this.subscribeToSaveResponse(this.cursoService.update(curso));
    } else {
      this.subscribeToSaveResponse(this.cursoService.create(curso));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>): void {
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

  protected updateForm(curso: ICurso): void {
    this.editForm.patchValue({
      id: curso.id,
      activo: curso.activo,
      tipo: curso.tipo,
      nombre: curso.nombre,
      nombreCorto: curso.nombreCorto,
      descripcion: curso.descripcion,
      imagen: curso.imagen,
      imagenContentType: curso.imagenContentType,
    });
  }

  protected createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
    };
  }
}
