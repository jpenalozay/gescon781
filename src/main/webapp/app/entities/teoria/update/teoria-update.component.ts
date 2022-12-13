import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITeoria, Teoria } from '../teoria.model';
import { TeoriaService } from '../service/teoria.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-teoria-update',
  templateUrl: './teoria-update.component.html',
})
export class TeoriaUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  teoriaHorarioCatalogosSharedCollection: ITeoriaHorarioCatalogo[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    descripcion: [null, [Validators.minLength(2), Validators.maxLength(512)]],
    imagen: [],
    imagenContentType: [],
    horarios: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected teoriaService: TeoriaService,
    protected teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teoria }) => {
      this.updateForm(teoria);

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
    const teoria = this.createFromForm();
    if (teoria.id !== undefined) {
      this.subscribeToSaveResponse(this.teoriaService.update(teoria));
    } else {
      this.subscribeToSaveResponse(this.teoriaService.create(teoria));
    }
  }

  trackTeoriaHorarioCatalogoById(_index: number, item: ITeoriaHorarioCatalogo): number {
    return item.id!;
  }

  getSelectedTeoriaHorarioCatalogo(option: ITeoriaHorarioCatalogo, selectedVals?: ITeoriaHorarioCatalogo[]): ITeoriaHorarioCatalogo {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeoria>>): void {
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

  protected updateForm(teoria: ITeoria): void {
    this.editForm.patchValue({
      id: teoria.id,
      activo: teoria.activo,
      nombre: teoria.nombre,
      nombreCorto: teoria.nombreCorto,
      descripcion: teoria.descripcion,
      imagen: teoria.imagen,
      imagenContentType: teoria.imagenContentType,
      horarios: teoria.horarios,
    });

    this.teoriaHorarioCatalogosSharedCollection = this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
      this.teoriaHorarioCatalogosSharedCollection,
      ...(teoria.horarios ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.teoriaHorarioCatalogoService
      .query()
      .pipe(map((res: HttpResponse<ITeoriaHorarioCatalogo[]>) => res.body ?? []))
      .pipe(
        map((teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) =>
          this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
            teoriaHorarioCatalogos,
            ...(this.editForm.get('horarios')!.value ?? [])
          )
        )
      )
      .subscribe(
        (teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) => (this.teoriaHorarioCatalogosSharedCollection = teoriaHorarioCatalogos)
      );
  }

  protected createFromForm(): ITeoria {
    return {
      ...new Teoria(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      horarios: this.editForm.get(['horarios'])!.value,
    };
  }
}
