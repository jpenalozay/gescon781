import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IHorarioDeshabilitacion, HorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from 'app/entities/programacion-deshabilitacion/service/programacion-deshabilitacion.service';
import { IHorario } from 'app/entities/horario/horario.model';
import { HorarioService } from 'app/entities/horario/service/horario.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

@Component({
  selector: 'jhi-horario-deshabilitacion-update',
  templateUrl: './horario-deshabilitacion-update.component.html',
})
export class HorarioDeshabilitacionUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  horarioTipoValues = Object.keys(HorarioTipo);

  programacionDeshabilitacionsSharedCollection: IProgramacionDeshabilitacion[] = [];
  horariosSharedCollection: IHorario[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    programacionDeshabilitacion: [null, Validators.required],
    horario: [],
  });

  constructor(
    protected horarioDeshabilitacionService: HorarioDeshabilitacionService,
    protected programacionDeshabilitacionService: ProgramacionDeshabilitacionService,
    protected horarioService: HorarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioDeshabilitacion }) => {
      this.updateForm(horarioDeshabilitacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horarioDeshabilitacion = this.createFromForm();
    if (horarioDeshabilitacion.id !== undefined) {
      this.subscribeToSaveResponse(this.horarioDeshabilitacionService.update(horarioDeshabilitacion));
    } else {
      this.subscribeToSaveResponse(this.horarioDeshabilitacionService.create(horarioDeshabilitacion));
    }
  }

  trackProgramacionDeshabilitacionById(_index: number, item: IProgramacionDeshabilitacion): number {
    return item.id!;
  }

  trackHorarioById(_index: number, item: IHorario): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioDeshabilitacion>>): void {
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

  protected updateForm(horarioDeshabilitacion: IHorarioDeshabilitacion): void {
    this.editForm.patchValue({
      id: horarioDeshabilitacion.id,
      activo: horarioDeshabilitacion.activo,
      tipo: horarioDeshabilitacion.tipo,
      programacionDeshabilitacion: horarioDeshabilitacion.programacionDeshabilitacion,
      horario: horarioDeshabilitacion.horario,
    });

    this.programacionDeshabilitacionsSharedCollection =
      this.programacionDeshabilitacionService.addProgramacionDeshabilitacionToCollectionIfMissing(
        this.programacionDeshabilitacionsSharedCollection,
        horarioDeshabilitacion.programacionDeshabilitacion
      );
    this.horariosSharedCollection = this.horarioService.addHorarioToCollectionIfMissing(
      this.horariosSharedCollection,
      horarioDeshabilitacion.horario
    );
  }

  protected loadRelationshipsOptions(): void {
    this.programacionDeshabilitacionService
      .query()
      .pipe(map((res: HttpResponse<IProgramacionDeshabilitacion[]>) => res.body ?? []))
      .pipe(
        map((programacionDeshabilitacions: IProgramacionDeshabilitacion[]) =>
          this.programacionDeshabilitacionService.addProgramacionDeshabilitacionToCollectionIfMissing(
            programacionDeshabilitacions,
            this.editForm.get('programacionDeshabilitacion')!.value
          )
        )
      )
      .subscribe(
        (programacionDeshabilitacions: IProgramacionDeshabilitacion[]) =>
          (this.programacionDeshabilitacionsSharedCollection = programacionDeshabilitacions)
      );

    this.horarioService
      .query()
      .pipe(map((res: HttpResponse<IHorario[]>) => res.body ?? []))
      .pipe(
        map((horarios: IHorario[]) => this.horarioService.addHorarioToCollectionIfMissing(horarios, this.editForm.get('horario')!.value))
      )
      .subscribe((horarios: IHorario[]) => (this.horariosSharedCollection = horarios));
  }

  protected createFromForm(): IHorarioDeshabilitacion {
    return {
      ...new HorarioDeshabilitacion(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      programacionDeshabilitacion: this.editForm.get(['programacionDeshabilitacion'])!.value,
      horario: this.editForm.get(['horario'])!.value,
    };
  }
}
