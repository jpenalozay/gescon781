import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInscripcionAsignaturaRequisito, InscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { InscripcionDetalleService } from 'app/entities/inscripcion-detalle/service/inscripcion-detalle.service';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';
import { AsignaturaRequisitoService } from 'app/entities/asignatura-requisito/service/asignatura-requisito.service';

@Component({
  selector: 'jhi-inscripcion-asignatura-requisito-update',
  templateUrl: './inscripcion-asignatura-requisito-update.component.html',
})
export class InscripcionAsignaturaRequisitoUpdateComponent implements OnInit {
  isSaving = false;

  inscripcionDetallesSharedCollection: IInscripcionDetalle[] = [];
  asignaturaRequisitosSharedCollection: IAsignaturaRequisito[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    imagen: [],
    imagenContentType: [],
    documento: [],
    inscripcionDetalle: [null, Validators.required],
    asignaturaRequisito: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected inscripcionAsignaturaRequisitoService: InscripcionAsignaturaRequisitoService,
    protected inscripcionDetalleService: InscripcionDetalleService,
    protected asignaturaRequisitoService: AsignaturaRequisitoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionAsignaturaRequisito }) => {
      this.updateForm(inscripcionAsignaturaRequisito);

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
    const inscripcionAsignaturaRequisito = this.createFromForm();
    if (inscripcionAsignaturaRequisito.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionAsignaturaRequisitoService.update(inscripcionAsignaturaRequisito));
    } else {
      this.subscribeToSaveResponse(this.inscripcionAsignaturaRequisitoService.create(inscripcionAsignaturaRequisito));
    }
  }

  trackInscripcionDetalleById(_index: number, item: IInscripcionDetalle): number {
    return item.id!;
  }

  trackAsignaturaRequisitoById(_index: number, item: IAsignaturaRequisito): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcionAsignaturaRequisito>>): void {
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

  protected updateForm(inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito): void {
    this.editForm.patchValue({
      id: inscripcionAsignaturaRequisito.id,
      descripcion: inscripcionAsignaturaRequisito.descripcion,
      imagen: inscripcionAsignaturaRequisito.imagen,
      imagenContentType: inscripcionAsignaturaRequisito.imagenContentType,
      documento: inscripcionAsignaturaRequisito.documento,
      inscripcionDetalle: inscripcionAsignaturaRequisito.inscripcionDetalle,
      asignaturaRequisito: inscripcionAsignaturaRequisito.asignaturaRequisito,
    });

    this.inscripcionDetallesSharedCollection = this.inscripcionDetalleService.addInscripcionDetalleToCollectionIfMissing(
      this.inscripcionDetallesSharedCollection,
      inscripcionAsignaturaRequisito.inscripcionDetalle
    );
    this.asignaturaRequisitosSharedCollection = this.asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing(
      this.asignaturaRequisitosSharedCollection,
      inscripcionAsignaturaRequisito.asignaturaRequisito
    );
  }

  protected loadRelationshipsOptions(): void {
    this.inscripcionDetalleService
      .query()
      .pipe(map((res: HttpResponse<IInscripcionDetalle[]>) => res.body ?? []))
      .pipe(
        map((inscripcionDetalles: IInscripcionDetalle[]) =>
          this.inscripcionDetalleService.addInscripcionDetalleToCollectionIfMissing(
            inscripcionDetalles,
            this.editForm.get('inscripcionDetalle')!.value
          )
        )
      )
      .subscribe((inscripcionDetalles: IInscripcionDetalle[]) => (this.inscripcionDetallesSharedCollection = inscripcionDetalles));

    this.asignaturaRequisitoService
      .query()
      .pipe(map((res: HttpResponse<IAsignaturaRequisito[]>) => res.body ?? []))
      .pipe(
        map((asignaturaRequisitos: IAsignaturaRequisito[]) =>
          this.asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing(
            asignaturaRequisitos,
            this.editForm.get('asignaturaRequisito')!.value
          )
        )
      )
      .subscribe((asignaturaRequisitos: IAsignaturaRequisito[]) => (this.asignaturaRequisitosSharedCollection = asignaturaRequisitos));
  }

  protected createFromForm(): IInscripcionAsignaturaRequisito {
    return {
      ...new InscripcionAsignaturaRequisito(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      inscripcionDetalle: this.editForm.get(['inscripcionDetalle'])!.value,
      asignaturaRequisito: this.editForm.get(['asignaturaRequisito'])!.value,
    };
  }
}
