import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInscripcionPago, InscripcionPago } from '../inscripcion-pago.model';
import { InscripcionPagoService } from '../service/inscripcion-pago.service';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { SucursalSerieService } from 'app/entities/sucursal-serie/service/sucursal-serie.service';
import { InscripcionFormaPago } from 'app/entities/enumerations/inscripcion-forma-pago.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';

@Component({
  selector: 'jhi-inscripcion-pago-update',
  templateUrl: './inscripcion-pago-update.component.html',
})
export class InscripcionPagoUpdateComponent implements OnInit {
  isSaving = false;
  inscripcionFormaPagoValues = Object.keys(InscripcionFormaPago);
  tipoDocumentoVentaValues = Object.keys(TipoDocumentoVenta);

  inscripcionsSharedCollection: IInscripcion[] = [];
  sucursalSeriesSharedCollection: ISucursalSerie[] = [];

  editForm = this.fb.group({
    id: [],
    formaPago: [null, [Validators.required]],
    documentoPago: [null, [Validators.required]],
    monto: [null, [Validators.required, Validators.min(0), Validators.max(10000)]],
    fecha: [null, [Validators.required]],
    codigoOP: [null, [Validators.minLength(2), Validators.maxLength(16)]],
    numeroDocumento: [null, [Validators.required]],
    plazoPago: [null, [Validators.min(0), Validators.max(360)]],
    inscripcion: [null, Validators.required],
    serie: [null, Validators.required],
  });

  constructor(
    protected inscripcionPagoService: InscripcionPagoService,
    protected inscripcionService: InscripcionService,
    protected sucursalSerieService: SucursalSerieService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionPago }) => {
      this.updateForm(inscripcionPago);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscripcionPago = this.createFromForm();
    if (inscripcionPago.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionPagoService.update(inscripcionPago));
    } else {
      this.subscribeToSaveResponse(this.inscripcionPagoService.create(inscripcionPago));
    }
  }

  trackInscripcionById(_index: number, item: IInscripcion): number {
    return item.id!;
  }

  trackSucursalSerieById(_index: number, item: ISucursalSerie): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcionPago>>): void {
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

  protected updateForm(inscripcionPago: IInscripcionPago): void {
    this.editForm.patchValue({
      id: inscripcionPago.id,
      formaPago: inscripcionPago.formaPago,
      documentoPago: inscripcionPago.documentoPago,
      monto: inscripcionPago.monto,
      fecha: inscripcionPago.fecha,
      codigoOP: inscripcionPago.codigoOP,
      numeroDocumento: inscripcionPago.numeroDocumento,
      plazoPago: inscripcionPago.plazoPago,
      inscripcion: inscripcionPago.inscripcion,
      serie: inscripcionPago.serie,
    });

    this.inscripcionsSharedCollection = this.inscripcionService.addInscripcionToCollectionIfMissing(
      this.inscripcionsSharedCollection,
      inscripcionPago.inscripcion
    );
    this.sucursalSeriesSharedCollection = this.sucursalSerieService.addSucursalSerieToCollectionIfMissing(
      this.sucursalSeriesSharedCollection,
      inscripcionPago.serie
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

    this.sucursalSerieService
      .query()
      .pipe(map((res: HttpResponse<ISucursalSerie[]>) => res.body ?? []))
      .pipe(
        map((sucursalSeries: ISucursalSerie[]) =>
          this.sucursalSerieService.addSucursalSerieToCollectionIfMissing(sucursalSeries, this.editForm.get('serie')!.value)
        )
      )
      .subscribe((sucursalSeries: ISucursalSerie[]) => (this.sucursalSeriesSharedCollection = sucursalSeries));
  }

  protected createFromForm(): IInscripcionPago {
    return {
      ...new InscripcionPago(),
      id: this.editForm.get(['id'])!.value,
      formaPago: this.editForm.get(['formaPago'])!.value,
      documentoPago: this.editForm.get(['documentoPago'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      codigoOP: this.editForm.get(['codigoOP'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      plazoPago: this.editForm.get(['plazoPago'])!.value,
      inscripcion: this.editForm.get(['inscripcion'])!.value,
      serie: this.editForm.get(['serie'])!.value,
    };
  }
}
