import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IArea, Area } from '../area.model';
import { AreaService } from '../service/area.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoUnidadOrganizativa } from 'app/entities/enumerations/tipo-unidad-organizativa.model';

@Component({
  selector: 'jhi-area-update',
  templateUrl: './area-update.component.html',
})
export class AreaUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  tipoUnidadOrganizativaValues = Object.keys(TipoUnidadOrganizativa);

  areasSharedCollection: IArea[] = [];
  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
    tipo: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    sucursal: [null, Validators.required],
    areaSuperior: [],
  });

  constructor(
    protected areaService: AreaService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ area }) => {
      this.updateForm(area);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const area = this.createFromForm();
    if (area.id !== undefined) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  trackAreaById(_index: number, item: IArea): number {
    return item.id!;
  }

  trackSucursalById(_index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>): void {
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

  protected updateForm(area: IArea): void {
    this.editForm.patchValue({
      id: area.id,
      activo: area.activo,
      codigo: area.codigo,
      tipo: area.tipo,
      nombre: area.nombre,
      nombreCorto: area.nombreCorto,
      sucursal: area.sucursal,
      areaSuperior: area.areaSuperior,
    });

    this.areasSharedCollection = this.areaService.addAreaToCollectionIfMissing(this.areasSharedCollection, area.areaSuperior);
    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(this.sucursalsSharedCollection, area.sucursal);
  }

  protected loadRelationshipsOptions(): void {
    this.areaService
      .query()
      .pipe(map((res: HttpResponse<IArea[]>) => res.body ?? []))
      .pipe(map((areas: IArea[]) => this.areaService.addAreaToCollectionIfMissing(areas, this.editForm.get('areaSuperior')!.value)))
      .subscribe((areas: IArea[]) => (this.areasSharedCollection = areas));

    this.sucursalService
      .query()
      .pipe(map((res: HttpResponse<ISucursal[]>) => res.body ?? []))
      .pipe(
        map((sucursals: ISucursal[]) =>
          this.sucursalService.addSucursalToCollectionIfMissing(sucursals, this.editForm.get('sucursal')!.value)
        )
      )
      .subscribe((sucursals: ISucursal[]) => (this.sucursalsSharedCollection = sucursals));
  }

  protected createFromForm(): IArea {
    return {
      ...new Area(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
      areaSuperior: this.editForm.get(['areaSuperior'])!.value,
    };
  }
}
