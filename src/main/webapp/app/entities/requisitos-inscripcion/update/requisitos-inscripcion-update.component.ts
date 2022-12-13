import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRequisitosInscripcion, RequisitosInscripcion } from '../requisitos-inscripcion.model';
import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { RequitisoTipo } from 'app/entities/enumerations/requitiso-tipo.model';

@Component({
  selector: 'jhi-requisitos-inscripcion-update',
  templateUrl: './requisitos-inscripcion-update.component.html',
})
export class RequisitosInscripcionUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  siNoValues = Object.keys(SiNo);
  requitisoTipoValues = Object.keys(RequitisoTipo);

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    obligatorio: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    costo: [],
    imagen: [],
    imagenContentType: [],
    tipoRequisito: [],
    valores: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected requisitosInscripcionService: RequisitosInscripcionService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requisitosInscripcion }) => {
      this.updateForm(requisitosInscripcion);
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
    const requisitosInscripcion = this.createFromForm();
    if (requisitosInscripcion.id !== undefined) {
      this.subscribeToSaveResponse(this.requisitosInscripcionService.update(requisitosInscripcion));
    } else {
      this.subscribeToSaveResponse(this.requisitosInscripcionService.create(requisitosInscripcion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequisitosInscripcion>>): void {
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

  protected updateForm(requisitosInscripcion: IRequisitosInscripcion): void {
    this.editForm.patchValue({
      id: requisitosInscripcion.id,
      activo: requisitosInscripcion.activo,
      obligatorio: requisitosInscripcion.obligatorio,
      nombre: requisitosInscripcion.nombre,
      nombreCorto: requisitosInscripcion.nombreCorto,
      costo: requisitosInscripcion.costo,
      imagen: requisitosInscripcion.imagen,
      imagenContentType: requisitosInscripcion.imagenContentType,
      tipoRequisito: requisitosInscripcion.tipoRequisito,
      valores: requisitosInscripcion.valores,
    });
  }

  protected createFromForm(): IRequisitosInscripcion {
    return {
      ...new RequisitosInscripcion(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      obligatorio: this.editForm.get(['obligatorio'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      costo: this.editForm.get(['costo'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      tipoRequisito: this.editForm.get(['tipoRequisito'])!.value,
      valores: this.editForm.get(['valores'])!.value,
    };
  }
}
