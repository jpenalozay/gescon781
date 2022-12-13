import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICargo, Cargo } from '../cargo.model';
import { CargoService } from '../service/cargo.service';
import { IArea } from 'app/entities/area/area.model';
import { AreaService } from 'app/entities/area/service/area.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-cargo-update',
  templateUrl: './cargo-update.component.html',
})
export class CargoUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  cargosSharedCollection: ICargo[] = [];
  areasSharedCollection: IArea[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    areaPerteneciente: [null, Validators.required],
    cargoSuperior: [],
  });

  constructor(
    protected cargoService: CargoService,
    protected areaService: AreaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cargo }) => {
      this.updateForm(cargo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cargo = this.createFromForm();
    if (cargo.id !== undefined) {
      this.subscribeToSaveResponse(this.cargoService.update(cargo));
    } else {
      this.subscribeToSaveResponse(this.cargoService.create(cargo));
    }
  }

  trackCargoById(_index: number, item: ICargo): number {
    return item.id!;
  }

  trackAreaById(_index: number, item: IArea): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICargo>>): void {
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

  protected updateForm(cargo: ICargo): void {
    this.editForm.patchValue({
      id: cargo.id,
      activo: cargo.activo,
      codigo: cargo.codigo,
      nombre: cargo.nombre,
      nombreCorto: cargo.nombreCorto,
      areaPerteneciente: cargo.areaPerteneciente,
      cargoSuperior: cargo.cargoSuperior,
    });

    this.cargosSharedCollection = this.cargoService.addCargoToCollectionIfMissing(this.cargosSharedCollection, cargo.cargoSuperior);
    this.areasSharedCollection = this.areaService.addAreaToCollectionIfMissing(this.areasSharedCollection, cargo.areaPerteneciente);
  }

  protected loadRelationshipsOptions(): void {
    this.cargoService
      .query()
      .pipe(map((res: HttpResponse<ICargo[]>) => res.body ?? []))
      .pipe(map((cargos: ICargo[]) => this.cargoService.addCargoToCollectionIfMissing(cargos, this.editForm.get('cargoSuperior')!.value)))
      .subscribe((cargos: ICargo[]) => (this.cargosSharedCollection = cargos));

    this.areaService
      .query()
      .pipe(map((res: HttpResponse<IArea[]>) => res.body ?? []))
      .pipe(map((areas: IArea[]) => this.areaService.addAreaToCollectionIfMissing(areas, this.editForm.get('areaPerteneciente')!.value)))
      .subscribe((areas: IArea[]) => (this.areasSharedCollection = areas));
  }

  protected createFromForm(): ICargo {
    return {
      ...new Cargo(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      areaPerteneciente: this.editForm.get(['areaPerteneciente'])!.value,
      cargoSuperior: this.editForm.get(['cargoSuperior'])!.value,
    };
  }
}
