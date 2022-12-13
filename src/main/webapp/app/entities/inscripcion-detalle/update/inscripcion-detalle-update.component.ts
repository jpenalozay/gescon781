import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IInscripcionDetalle, InscripcionDetalle } from '../inscripcion-detalle.model';
import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/service/asignatura.service';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';

@Component({
  selector: 'jhi-inscripcion-detalle-update',
  templateUrl: './inscripcion-detalle-update.component.html',
})
export class InscripcionDetalleUpdateComponent implements OnInit {
  isSaving = false;

  inscripcionsSharedCollection: IInscripcion[] = [];
  asignaturasSharedCollection: IAsignatura[] = [];
  teoriaHorarioCatalogosSharedCollection: ITeoriaHorarioCatalogo[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [],
    fechaInicio: [],
    inscripcion: [null, Validators.required],
    asignatura: [null, Validators.required],
    horario: [null, Validators.required],
  });

  constructor(
    protected inscripcionDetalleService: InscripcionDetalleService,
    protected inscripcionService: InscripcionService,
    protected asignaturaService: AsignaturaService,
    protected teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionDetalle }) => {
      this.updateForm(inscripcionDetalle);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscripcionDetalle = this.createFromForm();
    if (inscripcionDetalle.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionDetalleService.update(inscripcionDetalle));
    } else {
      this.subscribeToSaveResponse(this.inscripcionDetalleService.create(inscripcionDetalle));
    }
  }

  trackInscripcionById(_index: number, item: IInscripcion): number {
    return item.id!;
  }

  trackAsignaturaById(_index: number, item: IAsignatura): number {
    return item.id!;
  }

  trackTeoriaHorarioCatalogoById(_index: number, item: ITeoriaHorarioCatalogo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcionDetalle>>): void {
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

  protected updateForm(inscripcionDetalle: IInscripcionDetalle): void {
    this.editForm.patchValue({
      id: inscripcionDetalle.id,
      codigo: inscripcionDetalle.codigo,
      fechaInicio: inscripcionDetalle.fechaInicio,
      inscripcion: inscripcionDetalle.inscripcion,
      asignatura: inscripcionDetalle.asignatura,
      horario: inscripcionDetalle.horario,
    });

    this.inscripcionsSharedCollection = this.inscripcionService.addInscripcionToCollectionIfMissing(
      this.inscripcionsSharedCollection,
      inscripcionDetalle.inscripcion
    );
    this.asignaturasSharedCollection = this.asignaturaService.addAsignaturaToCollectionIfMissing(
      this.asignaturasSharedCollection,
      inscripcionDetalle.asignatura
    );
    this.teoriaHorarioCatalogosSharedCollection = this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
      this.teoriaHorarioCatalogosSharedCollection,
      inscripcionDetalle.horario
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

    this.asignaturaService
      .query()
      .pipe(map((res: HttpResponse<IAsignatura[]>) => res.body ?? []))
      .pipe(
        map((asignaturas: IAsignatura[]) =>
          this.asignaturaService.addAsignaturaToCollectionIfMissing(asignaturas, this.editForm.get('asignatura')!.value)
        )
      )
      .subscribe((asignaturas: IAsignatura[]) => (this.asignaturasSharedCollection = asignaturas));

    this.teoriaHorarioCatalogoService
      .query()
      .pipe(map((res: HttpResponse<ITeoriaHorarioCatalogo[]>) => res.body ?? []))
      .pipe(
        map((teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) =>
          this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
            teoriaHorarioCatalogos,
            this.editForm.get('horario')!.value
          )
        )
      )
      .subscribe(
        (teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) => (this.teoriaHorarioCatalogosSharedCollection = teoriaHorarioCatalogos)
      );
  }

  protected createFromForm(): IInscripcionDetalle {
    return {
      ...new InscripcionDetalle(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      inscripcion: this.editForm.get(['inscripcion'])!.value,
      asignatura: this.editForm.get(['asignatura'])!.value,
      horario: this.editForm.get(['horario'])!.value,
    };
  }
}
