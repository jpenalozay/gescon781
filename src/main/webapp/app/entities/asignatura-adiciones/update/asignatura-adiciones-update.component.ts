import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAsignaturaAdiciones, AsignaturaAdiciones } from '../asignatura-adiciones.model';
import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-asignatura-adiciones-update',
  templateUrl: './asignatura-adiciones-update.component.html',
})
export class AsignaturaAdicionesUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    descripcion: [null, [Validators.minLength(2), Validators.maxLength(512)]],
    imagen: [],
    imagenContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected asignaturaAdicionesService: AsignaturaAdicionesService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignaturaAdiciones }) => {
      this.updateForm(asignaturaAdiciones);
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
    const asignaturaAdiciones = this.createFromForm();
    if (asignaturaAdiciones.id !== undefined) {
      this.subscribeToSaveResponse(this.asignaturaAdicionesService.update(asignaturaAdiciones));
    } else {
      this.subscribeToSaveResponse(this.asignaturaAdicionesService.create(asignaturaAdiciones));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignaturaAdiciones>>): void {
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

  protected updateForm(asignaturaAdiciones: IAsignaturaAdiciones): void {
    this.editForm.patchValue({
      id: asignaturaAdiciones.id,
      activo: asignaturaAdiciones.activo,
      nombre: asignaturaAdiciones.nombre,
      nombreCorto: asignaturaAdiciones.nombreCorto,
      descripcion: asignaturaAdiciones.descripcion,
      imagen: asignaturaAdiciones.imagen,
      imagenContentType: asignaturaAdiciones.imagenContentType,
    });
  }

  protected createFromForm(): IAsignaturaAdiciones {
    return {
      ...new AsignaturaAdiciones(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
    };
  }
}
