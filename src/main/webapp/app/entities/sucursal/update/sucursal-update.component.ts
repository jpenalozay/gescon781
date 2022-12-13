import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISucursal, Sucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IDistrit } from 'app/entities/distrit/distrit.model';
import { DistritService } from 'app/entities/distrit/service/distrit.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

@Component({
  selector: 'jhi-sucursal-update',
  templateUrl: './sucursal-update.component.html',
})
export class SucursalUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  siNoValues = Object.keys(SiNo);

  distritsSharedCollection: IDistrit[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
    central: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    nombreAbreviado: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    fechaInicio: [],
    telefono: [null, [Validators.maxLength(15)]],
    telefono1: [null, [Validators.maxLength(15)]],
    imagen: [],
    imagenContentType: [],
    direccion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    distrito: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected sucursalService: SucursalService,
    protected distritService: DistritService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sucursal }) => {
      this.updateForm(sucursal);

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
    const sucursal = this.createFromForm();
    if (sucursal.id !== undefined) {
      this.subscribeToSaveResponse(this.sucursalService.update(sucursal));
    } else {
      this.subscribeToSaveResponse(this.sucursalService.create(sucursal));
    }
  }

  trackDistritById(_index: number, item: IDistrit): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISucursal>>): void {
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

  protected updateForm(sucursal: ISucursal): void {
    this.editForm.patchValue({
      id: sucursal.id,
      activo: sucursal.activo,
      codigo: sucursal.codigo,
      central: sucursal.central,
      nombre: sucursal.nombre,
      nombreCorto: sucursal.nombreCorto,
      nombreAbreviado: sucursal.nombreAbreviado,
      fechaInicio: sucursal.fechaInicio,
      telefono: sucursal.telefono,
      telefono1: sucursal.telefono1,
      imagen: sucursal.imagen,
      imagenContentType: sucursal.imagenContentType,
      direccion: sucursal.direccion,
      distrito: sucursal.distrito,
    });

    this.distritsSharedCollection = this.distritService.addDistritToCollectionIfMissing(this.distritsSharedCollection, sucursal.distrito);
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

  protected createFromForm(): ISucursal {
    return {
      ...new Sucursal(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      central: this.editForm.get(['central'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      nombreAbreviado: this.editForm.get(['nombreAbreviado'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      telefono: this.editForm.get(['telefono'])!.value,
      telefono1: this.editForm.get(['telefono1'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      distrito: this.editForm.get(['distrito'])!.value,
    };
  }
}
