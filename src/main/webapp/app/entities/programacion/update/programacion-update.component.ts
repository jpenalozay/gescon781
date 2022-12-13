import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProgramacion, Programacion } from '../programacion.model';
import { ProgramacionService } from '../service/programacion.service';
import { IDia } from 'app/entities/dia/dia.model';
import { DiaService } from 'app/entities/dia/service/dia.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { ProfesorService } from 'app/entities/profesor/service/profesor.service';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { AutomovilService } from 'app/entities/automovil/service/automovil.service';
import { ProgramacionEstado } from 'app/entities/enumerations/programacion-estado.model';

@Component({
  selector: 'jhi-programacion-update',
  templateUrl: './programacion-update.component.html',
})
export class ProgramacionUpdateComponent implements OnInit {
  isSaving = false;
  programacionEstadoValues = Object.keys(ProgramacionEstado);

  diasSharedCollection: IDia[] = [];
  horarioCatalogosSharedCollection: IHorarioCatalogo[] = [];
  profesorsSharedCollection: IProfesor[] = [];
  automovilsSharedCollection: IAutomovil[] = [];

  editForm = this.fb.group({
    id: [],
    estado: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(9)]],
    fechaInicio: [],
    fechaFin: [],
    deshabilitaciones: [null, [Validators.min(0), Validators.max(99)]],
    fecha: [],
    nombreUsuario: [],
    dias: [],
    horarioCatalogos: [],
    profesor: [null, Validators.required],
    automovil: [null, Validators.required],
  });

  constructor(
    protected programacionService: ProgramacionService,
    protected diaService: DiaService,
    protected horarioCatalogoService: HorarioCatalogoService,
    protected profesorService: ProfesorService,
    protected automovilService: AutomovilService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programacion }) => {
      if (programacion.id === undefined) {
        const today = dayjs().startOf('day');
        programacion.fecha = today;
      }

      this.updateForm(programacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programacion = this.createFromForm();
    if (programacion.id !== undefined) {
      this.subscribeToSaveResponse(this.programacionService.update(programacion));
    } else {
      this.subscribeToSaveResponse(this.programacionService.create(programacion));
    }
  }

  trackDiaById(_index: number, item: IDia): number {
    return item.id!;
  }

  trackHorarioCatalogoById(_index: number, item: IHorarioCatalogo): number {
    return item.id!;
  }

  trackProfesorById(_index: number, item: IProfesor): number {
    return item.id!;
  }

  trackAutomovilById(_index: number, item: IAutomovil): number {
    return item.id!;
  }

  getSelectedDia(option: IDia, selectedVals?: IDia[]): IDia {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedHorarioCatalogo(option: IHorarioCatalogo, selectedVals?: IHorarioCatalogo[]): IHorarioCatalogo {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgramacion>>): void {
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

  protected updateForm(programacion: IProgramacion): void {
    this.editForm.patchValue({
      id: programacion.id,
      estado: programacion.estado,
      codigo: programacion.codigo,
      fechaInicio: programacion.fechaInicio,
      fechaFin: programacion.fechaFin,
      deshabilitaciones: programacion.deshabilitaciones,
      fecha: programacion.fecha ? programacion.fecha.format(DATE_TIME_FORMAT) : null,
      nombreUsuario: programacion.nombreUsuario,
      dias: programacion.dias,
      horarioCatalogos: programacion.horarioCatalogos,
      profesor: programacion.profesor,
      automovil: programacion.automovil,
    });

    this.diasSharedCollection = this.diaService.addDiaToCollectionIfMissing(this.diasSharedCollection, ...(programacion.dias ?? []));
    this.horarioCatalogosSharedCollection = this.horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing(
      this.horarioCatalogosSharedCollection,
      ...(programacion.horarioCatalogos ?? [])
    );
    this.profesorsSharedCollection = this.profesorService.addProfesorToCollectionIfMissing(
      this.profesorsSharedCollection,
      programacion.profesor
    );
    this.automovilsSharedCollection = this.automovilService.addAutomovilToCollectionIfMissing(
      this.automovilsSharedCollection,
      programacion.automovil
    );
  }

  protected loadRelationshipsOptions(): void {
    this.diaService
      .query()
      .pipe(map((res: HttpResponse<IDia[]>) => res.body ?? []))
      .pipe(map((dias: IDia[]) => this.diaService.addDiaToCollectionIfMissing(dias, ...(this.editForm.get('dias')!.value ?? []))))
      .subscribe((dias: IDia[]) => (this.diasSharedCollection = dias));

    this.horarioCatalogoService
      .query()
      .pipe(map((res: HttpResponse<IHorarioCatalogo[]>) => res.body ?? []))
      .pipe(
        map((horarioCatalogos: IHorarioCatalogo[]) =>
          this.horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing(
            horarioCatalogos,
            ...(this.editForm.get('horarioCatalogos')!.value ?? [])
          )
        )
      )
      .subscribe((horarioCatalogos: IHorarioCatalogo[]) => (this.horarioCatalogosSharedCollection = horarioCatalogos));

    this.profesorService
      .query()
      .pipe(map((res: HttpResponse<IProfesor[]>) => res.body ?? []))
      .pipe(
        map((profesors: IProfesor[]) =>
          this.profesorService.addProfesorToCollectionIfMissing(profesors, this.editForm.get('profesor')!.value)
        )
      )
      .subscribe((profesors: IProfesor[]) => (this.profesorsSharedCollection = profesors));

    this.automovilService
      .query()
      .pipe(map((res: HttpResponse<IAutomovil[]>) => res.body ?? []))
      .pipe(
        map((automovils: IAutomovil[]) =>
          this.automovilService.addAutomovilToCollectionIfMissing(automovils, this.editForm.get('automovil')!.value)
        )
      )
      .subscribe((automovils: IAutomovil[]) => (this.automovilsSharedCollection = automovils));
  }

  protected createFromForm(): IProgramacion {
    return {
      ...new Programacion(),
      id: this.editForm.get(['id'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value,
      fechaFin: this.editForm.get(['fechaFin'])!.value,
      deshabilitaciones: this.editForm.get(['deshabilitaciones'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      nombreUsuario: this.editForm.get(['nombreUsuario'])!.value,
      dias: this.editForm.get(['dias'])!.value,
      horarioCatalogos: this.editForm.get(['horarioCatalogos'])!.value,
      profesor: this.editForm.get(['profesor'])!.value,
      automovil: this.editForm.get(['automovil'])!.value,
    };
  }
}
