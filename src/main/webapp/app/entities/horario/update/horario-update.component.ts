import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IHorario, Horario } from '../horario.model';
import { HorarioService } from '../service/horario.service';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { ProfesorService } from 'app/entities/profesor/service/profesor.service';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { ProgramacionService } from 'app/entities/programacion/service/programacion.service';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { FechaService } from 'app/entities/fecha/service/fecha.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { AutomovilService } from 'app/entities/automovil/service/automovil.service';
import { ILugarSalida } from 'app/entities/lugar-salida/lugar-salida.model';
import { LugarSalidaService } from 'app/entities/lugar-salida/service/lugar-salida.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';

@Component({
  selector: 'jhi-horario-update',
  templateUrl: './horario-update.component.html',
})
export class HorarioUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  horarioTipoValues = Object.keys(HorarioTipo);

  alumnosSharedCollection: IAlumno[] = [];
  profesorsSharedCollection: IProfesor[] = [];
  programacionsSharedCollection: IProgramacion[] = [];
  fechasSharedCollection: IFecha[] = [];
  horarioCatalogosSharedCollection: IHorarioCatalogo[] = [];
  automovilsSharedCollection: IAutomovil[] = [];
  lugarSalidasSharedCollection: ILugarSalida[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    fechaDia: [],
    fechaDiaSem: [null, [Validators.min(1), Validators.max(7)]],
    alumno: [],
    instructor: [],
    programacion: [null, Validators.required],
    fecha: [null, Validators.required],
    horarioCatalogo: [null, Validators.required],
    automovil: [null, Validators.required],
    lugarSalida: [],
  });

  constructor(
    protected horarioService: HorarioService,
    protected alumnoService: AlumnoService,
    protected profesorService: ProfesorService,
    protected programacionService: ProgramacionService,
    protected fechaService: FechaService,
    protected horarioCatalogoService: HorarioCatalogoService,
    protected automovilService: AutomovilService,
    protected lugarSalidaService: LugarSalidaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horario }) => {
      this.updateForm(horario);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horario = this.createFromForm();
    if (horario.id !== undefined) {
      this.subscribeToSaveResponse(this.horarioService.update(horario));
    } else {
      this.subscribeToSaveResponse(this.horarioService.create(horario));
    }
  }

  trackAlumnoById(_index: number, item: IAlumno): number {
    return item.id!;
  }

  trackProfesorById(_index: number, item: IProfesor): number {
    return item.id!;
  }

  trackProgramacionById(_index: number, item: IProgramacion): number {
    return item.id!;
  }

  trackFechaById(_index: number, item: IFecha): number {
    return item.id!;
  }

  trackHorarioCatalogoById(_index: number, item: IHorarioCatalogo): number {
    return item.id!;
  }

  trackAutomovilById(_index: number, item: IAutomovil): number {
    return item.id!;
  }

  trackLugarSalidaById(_index: number, item: ILugarSalida): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorario>>): void {
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

  protected updateForm(horario: IHorario): void {
    this.editForm.patchValue({
      id: horario.id,
      activo: horario.activo,
      tipo: horario.tipo,
      fechaDia: horario.fechaDia,
      fechaDiaSem: horario.fechaDiaSem,
      alumno: horario.alumno,
      instructor: horario.instructor,
      programacion: horario.programacion,
      fecha: horario.fecha,
      horarioCatalogo: horario.horarioCatalogo,
      automovil: horario.automovil,
      lugarSalida: horario.lugarSalida,
    });

    this.alumnosSharedCollection = this.alumnoService.addAlumnoToCollectionIfMissing(this.alumnosSharedCollection, horario.alumno);
    this.profesorsSharedCollection = this.profesorService.addProfesorToCollectionIfMissing(
      this.profesorsSharedCollection,
      horario.instructor
    );
    this.programacionsSharedCollection = this.programacionService.addProgramacionToCollectionIfMissing(
      this.programacionsSharedCollection,
      horario.programacion
    );
    this.fechasSharedCollection = this.fechaService.addFechaToCollectionIfMissing(this.fechasSharedCollection, horario.fecha);
    this.horarioCatalogosSharedCollection = this.horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing(
      this.horarioCatalogosSharedCollection,
      horario.horarioCatalogo
    );
    this.automovilsSharedCollection = this.automovilService.addAutomovilToCollectionIfMissing(
      this.automovilsSharedCollection,
      horario.automovil
    );
    this.lugarSalidasSharedCollection = this.lugarSalidaService.addLugarSalidaToCollectionIfMissing(
      this.lugarSalidasSharedCollection,
      horario.lugarSalida
    );
  }

  protected loadRelationshipsOptions(): void {
    this.alumnoService
      .query()
      .pipe(map((res: HttpResponse<IAlumno[]>) => res.body ?? []))
      .pipe(map((alumnos: IAlumno[]) => this.alumnoService.addAlumnoToCollectionIfMissing(alumnos, this.editForm.get('alumno')!.value)))
      .subscribe((alumnos: IAlumno[]) => (this.alumnosSharedCollection = alumnos));

    this.profesorService
      .query()
      .pipe(map((res: HttpResponse<IProfesor[]>) => res.body ?? []))
      .pipe(
        map((profesors: IProfesor[]) =>
          this.profesorService.addProfesorToCollectionIfMissing(profesors, this.editForm.get('instructor')!.value)
        )
      )
      .subscribe((profesors: IProfesor[]) => (this.profesorsSharedCollection = profesors));

    this.programacionService
      .query()
      .pipe(map((res: HttpResponse<IProgramacion[]>) => res.body ?? []))
      .pipe(
        map((programacions: IProgramacion[]) =>
          this.programacionService.addProgramacionToCollectionIfMissing(programacions, this.editForm.get('programacion')!.value)
        )
      )
      .subscribe((programacions: IProgramacion[]) => (this.programacionsSharedCollection = programacions));

    this.fechaService
      .query()
      .pipe(map((res: HttpResponse<IFecha[]>) => res.body ?? []))
      .pipe(map((fechas: IFecha[]) => this.fechaService.addFechaToCollectionIfMissing(fechas, this.editForm.get('fecha')!.value)))
      .subscribe((fechas: IFecha[]) => (this.fechasSharedCollection = fechas));

    this.horarioCatalogoService
      .query()
      .pipe(map((res: HttpResponse<IHorarioCatalogo[]>) => res.body ?? []))
      .pipe(
        map((horarioCatalogos: IHorarioCatalogo[]) =>
          this.horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing(horarioCatalogos, this.editForm.get('horarioCatalogo')!.value)
        )
      )
      .subscribe((horarioCatalogos: IHorarioCatalogo[]) => (this.horarioCatalogosSharedCollection = horarioCatalogos));

    this.automovilService
      .query()
      .pipe(map((res: HttpResponse<IAutomovil[]>) => res.body ?? []))
      .pipe(
        map((automovils: IAutomovil[]) =>
          this.automovilService.addAutomovilToCollectionIfMissing(automovils, this.editForm.get('automovil')!.value)
        )
      )
      .subscribe((automovils: IAutomovil[]) => (this.automovilsSharedCollection = automovils));

    this.lugarSalidaService
      .query()
      .pipe(map((res: HttpResponse<ILugarSalida[]>) => res.body ?? []))
      .pipe(
        map((lugarSalidas: ILugarSalida[]) =>
          this.lugarSalidaService.addLugarSalidaToCollectionIfMissing(lugarSalidas, this.editForm.get('lugarSalida')!.value)
        )
      )
      .subscribe((lugarSalidas: ILugarSalida[]) => (this.lugarSalidasSharedCollection = lugarSalidas));
  }

  protected createFromForm(): IHorario {
    return {
      ...new Horario(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      fechaDia: this.editForm.get(['fechaDia'])!.value,
      fechaDiaSem: this.editForm.get(['fechaDiaSem'])!.value,
      alumno: this.editForm.get(['alumno'])!.value,
      instructor: this.editForm.get(['instructor'])!.value,
      programacion: this.editForm.get(['programacion'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      horarioCatalogo: this.editForm.get(['horarioCatalogo'])!.value,
      automovil: this.editForm.get(['automovil'])!.value,
      lugarSalida: this.editForm.get(['lugarSalida'])!.value,
    };
  }
}
