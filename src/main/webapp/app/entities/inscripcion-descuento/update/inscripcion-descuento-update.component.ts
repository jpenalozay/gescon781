import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInscripcionDescuento, InscripcionDescuento } from '../inscripcion-descuento.model';
import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';

@Component({
  selector: 'jhi-inscripcion-descuento-update',
  templateUrl: './inscripcion-descuento-update.component.html',
})
export class InscripcionDescuentoUpdateComponent implements OnInit {
  isSaving = false;

  inscripcionsCollection: IInscripcion[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    monto: [],
    inscripcion: [],
  });

  constructor(
    protected inscripcionDescuentoService: InscripcionDescuentoService,
    protected inscripcionService: InscripcionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionDescuento }) => {
      this.updateForm(inscripcionDescuento);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscripcionDescuento = this.createFromForm();
    if (inscripcionDescuento.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionDescuentoService.update(inscripcionDescuento));
    } else {
      this.subscribeToSaveResponse(this.inscripcionDescuentoService.create(inscripcionDescuento));
    }
  }

  trackInscripcionById(_index: number, item: IInscripcion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcionDescuento>>): void {
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

  protected updateForm(inscripcionDescuento: IInscripcionDescuento): void {
    this.editForm.patchValue({
      id: inscripcionDescuento.id,
      descripcion: inscripcionDescuento.descripcion,
      monto: inscripcionDescuento.monto,
      inscripcion: inscripcionDescuento.inscripcion,
    });

    this.inscripcionsCollection = this.inscripcionService.addInscripcionToCollectionIfMissing(
      this.inscripcionsCollection,
      inscripcionDescuento.inscripcion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.inscripcionService
      .query({ 'insDescuentoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IInscripcion[]>) => res.body ?? []))
      .pipe(
        map((inscripcions: IInscripcion[]) =>
          this.inscripcionService.addInscripcionToCollectionIfMissing(inscripcions, this.editForm.get('inscripcion')!.value)
        )
      )
      .subscribe((inscripcions: IInscripcion[]) => (this.inscripcionsCollection = inscripcions));
  }

  protected createFromForm(): IInscripcionDescuento {
    return {
      ...new InscripcionDescuento(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      inscripcion: this.editForm.get(['inscripcion'])!.value,
    };
  }
}
