import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInscripcionAdicional, InscripcionAdicional } from '../inscripcion-adicional.model';
import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { IRequisitosInscripcion } from 'app/entities/requisitos-inscripcion/requisitos-inscripcion.model';
import { RequisitosInscripcionService } from 'app/entities/requisitos-inscripcion/service/requisitos-inscripcion.service';

@Component({
  selector: 'jhi-inscripcion-adicional-update',
  templateUrl: './inscripcion-adicional-update.component.html',
})
export class InscripcionAdicionalUpdateComponent implements OnInit {
  isSaving = false;

  inscripcionsSharedCollection: IInscripcion[] = [];
  requisitosInscripcionsSharedCollection: IRequisitosInscripcion[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    imagen: [],
    imagenContentType: [],
    documento: [],
    cantidad: [],
    costo: [],
    inscripcion: [null, Validators.required],
    inscripcionRequisito: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected inscripcionAdicionalService: InscripcionAdicionalService,
    protected inscripcionService: InscripcionService,
    protected requisitosInscripcionService: RequisitosInscripcionService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionAdicional }) => {
      this.updateForm(inscripcionAdicional);

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
    const inscripcionAdicional = this.createFromForm();
    if (inscripcionAdicional.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionAdicionalService.update(inscripcionAdicional));
    } else {
      this.subscribeToSaveResponse(this.inscripcionAdicionalService.create(inscripcionAdicional));
    }
  }

  trackInscripcionById(_index: number, item: IInscripcion): number {
    return item.id!;
  }

  trackRequisitosInscripcionById(_index: number, item: IRequisitosInscripcion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcionAdicional>>): void {
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

  protected updateForm(inscripcionAdicional: IInscripcionAdicional): void {
    this.editForm.patchValue({
      id: inscripcionAdicional.id,
      descripcion: inscripcionAdicional.descripcion,
      imagen: inscripcionAdicional.imagen,
      imagenContentType: inscripcionAdicional.imagenContentType,
      documento: inscripcionAdicional.documento,
      cantidad: inscripcionAdicional.cantidad,
      costo: inscripcionAdicional.costo,
      inscripcion: inscripcionAdicional.inscripcion,
      inscripcionRequisito: inscripcionAdicional.inscripcionRequisito,
    });

    this.inscripcionsSharedCollection = this.inscripcionService.addInscripcionToCollectionIfMissing(
      this.inscripcionsSharedCollection,
      inscripcionAdicional.inscripcion
    );
    this.requisitosInscripcionsSharedCollection = this.requisitosInscripcionService.addRequisitosInscripcionToCollectionIfMissing(
      this.requisitosInscripcionsSharedCollection,
      inscripcionAdicional.inscripcionRequisito
    );
  }

  protected loadRelationshipsOptions(): void {
    this.inscripcionService
      .query()
      .pipe(map((res: HttpResponse<IInscripcion[]>) => res.body ?? []))
      .pipe(
        map((inscripcions: IInscripcion[]) =>
          this.inscripcionService.addInscripcionToCollectionIfMissing(inscripcions, this.editForm.get('inscripcion')!.value)
        )
      )
      .subscribe((inscripcions: IInscripcion[]) => (this.inscripcionsSharedCollection = inscripcions));

    this.requisitosInscripcionService
      .query()
      .pipe(map((res: HttpResponse<IRequisitosInscripcion[]>) => res.body ?? []))
      .pipe(
        map((requisitosInscripcions: IRequisitosInscripcion[]) =>
          this.requisitosInscripcionService.addRequisitosInscripcionToCollectionIfMissing(
            requisitosInscripcions,
            this.editForm.get('inscripcionRequisito')!.value
          )
        )
      )
      .subscribe(
        (requisitosInscripcions: IRequisitosInscripcion[]) => (this.requisitosInscripcionsSharedCollection = requisitosInscripcions)
      );
  }

  protected createFromForm(): IInscripcionAdicional {
    return {
      ...new InscripcionAdicional(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      costo: this.editForm.get(['costo'])!.value,
      inscripcion: this.editForm.get(['inscripcion'])!.value,
      inscripcionRequisito: this.editForm.get(['inscripcionRequisito'])!.value,
    };
  }
}
