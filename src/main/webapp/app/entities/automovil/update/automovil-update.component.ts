import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IAutomovil, Automovil } from '../automovil.model';
import { AutomovilService } from '../service/automovil.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { AutomovilTipo } from 'app/entities/enumerations/automovil-tipo.model';
import { AutomovilCaja } from 'app/entities/enumerations/automovil-caja.model';

@Component({
  selector: 'jhi-automovil-update',
  templateUrl: './automovil-update.component.html',
})
export class AutomovilUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  automovilTipoValues = Object.keys(AutomovilTipo);
  automovilCajaValues = Object.keys(AutomovilCaja);

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
    nombre: [null, [Validators.minLength(2), Validators.maxLength(64)]],
    tipo: [null, [Validators.required]],
    placa: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    marca: [null, [Validators.minLength(2), Validators.maxLength(64)]],
    modelo: [null, [Validators.minLength(2), Validators.maxLength(64)]],
    anio: [null, [Validators.minLength(4), Validators.maxLength(4)]],
    soatVencimiento: [],
    revisionTecnicaVencimiento: [],
    caja: [],
    imagen: [],
    imagenContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected automovilService: AutomovilService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ automovil }) => {
      if (automovil.id === undefined) {
        const today = dayjs().startOf('day');
        automovil.soatVencimiento = today;
        automovil.revisionTecnicaVencimiento = today;
      }

      this.updateForm(automovil);
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
    const automovil = this.createFromForm();
    if (automovil.id !== undefined) {
      this.subscribeToSaveResponse(this.automovilService.update(automovil));
    } else {
      this.subscribeToSaveResponse(this.automovilService.create(automovil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAutomovil>>): void {
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

  protected updateForm(automovil: IAutomovil): void {
    this.editForm.patchValue({
      id: automovil.id,
      activo: automovil.activo,
      codigo: automovil.codigo,
      nombre: automovil.nombre,
      tipo: automovil.tipo,
      placa: automovil.placa,
      marca: automovil.marca,
      modelo: automovil.modelo,
      anio: automovil.anio,
      soatVencimiento: automovil.soatVencimiento ? automovil.soatVencimiento.format(DATE_TIME_FORMAT) : null,
      revisionTecnicaVencimiento: automovil.revisionTecnicaVencimiento
        ? automovil.revisionTecnicaVencimiento.format(DATE_TIME_FORMAT)
        : null,
      caja: automovil.caja,
      imagen: automovil.imagen,
      imagenContentType: automovil.imagenContentType,
    });
  }

  protected createFromForm(): IAutomovil {
    return {
      ...new Automovil(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      placa: this.editForm.get(['placa'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      anio: this.editForm.get(['anio'])!.value,
      soatVencimiento: this.editForm.get(['soatVencimiento'])!.value
        ? dayjs(this.editForm.get(['soatVencimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      revisionTecnicaVencimiento: this.editForm.get(['revisionTecnicaVencimiento'])!.value
        ? dayjs(this.editForm.get(['revisionTecnicaVencimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      caja: this.editForm.get(['caja'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
    };
  }
}
