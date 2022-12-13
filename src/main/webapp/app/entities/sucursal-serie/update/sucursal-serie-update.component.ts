import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISucursalSerie, SucursalSerie } from '../sucursal-serie.model';
import { SucursalSerieService } from '../service/sucursal-serie.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';

@Component({
  selector: 'jhi-sucursal-serie-update',
  templateUrl: './sucursal-serie-update.component.html',
})
export class SucursalSerieUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  tipoDocumentoVentaValues = Object.keys(TipoDocumentoVenta);

  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    tipoDocumento: [null, [Validators.required]],
    serie: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
    fechaEmision: [],
    numeroMaximo: [],
    numeroUltimo: [null, [Validators.required]],
    sucursal: [null, Validators.required],
  });

  constructor(
    protected sucursalSerieService: SucursalSerieService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sucursalSerie }) => {
      this.updateForm(sucursalSerie);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sucursalSerie = this.createFromForm();
    if (sucursalSerie.id !== undefined) {
      this.subscribeToSaveResponse(this.sucursalSerieService.update(sucursalSerie));
    } else {
      this.subscribeToSaveResponse(this.sucursalSerieService.create(sucursalSerie));
    }
  }

  trackSucursalById(_index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISucursalSerie>>): void {
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

  protected updateForm(sucursalSerie: ISucursalSerie): void {
    this.editForm.patchValue({
      id: sucursalSerie.id,
      activo: sucursalSerie.activo,
      tipoDocumento: sucursalSerie.tipoDocumento,
      serie: sucursalSerie.serie,
      fechaEmision: sucursalSerie.fechaEmision,
      numeroMaximo: sucursalSerie.numeroMaximo,
      numeroUltimo: sucursalSerie.numeroUltimo,
      sucursal: sucursalSerie.sucursal,
    });

    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(
      this.sucursalsSharedCollection,
      sucursalSerie.sucursal
    );
  }

  protected loadRelationshipsOptions(): void {
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

  protected createFromForm(): ISucursalSerie {
    return {
      ...new SucursalSerie(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      tipoDocumento: this.editForm.get(['tipoDocumento'])!.value,
      serie: this.editForm.get(['serie'])!.value,
      fechaEmision: this.editForm.get(['fechaEmision'])!.value,
      numeroMaximo: this.editForm.get(['numeroMaximo'])!.value,
      numeroUltimo: this.editForm.get(['numeroUltimo'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}
