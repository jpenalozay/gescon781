import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProgramacionDeshabilitacion, ProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { FechaService } from 'app/entities/fecha/service/fecha.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { ProgramacionService } from 'app/entities/programacion/service/programacion.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-programacion-deshabilitacion-update',
  templateUrl: './programacion-deshabilitacion-update.component.html',
})
export class ProgramacionDeshabilitacionUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  fechasSharedCollection: IFecha[] = [];
  horarioCatalogosSharedCollection: IHorarioCatalogo[] = [];
  programacionsSharedCollection: IProgramacion[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    descripcion: [],
    fecha: [],
    nombreUsuario: [],
    fechas: [],
    horarioCatalogos: [],
    programacion: [null, Validators.required],
    usuario: [],
  });

  constructor(
    protected programacionDeshabilitacionService: ProgramacionDeshabilitacionService,
    protected fechaService: FechaService,
    protected horarioCatalogoService: HorarioCatalogoService,
    protected programacionService: ProgramacionService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programacionDeshabilitacion }) => {
      if (programacionDeshabilitacion.id === undefined) {
        const today = dayjs().startOf('day');
        programacionDeshabilitacion.fecha = today;
      }

      this.updateForm(programacionDeshabilitacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programacionDeshabilitacion = this.createFromForm();
    if (programacionDeshabilitacion.id !== undefined) {
      this.subscribeToSaveResponse(this.programacionDeshabilitacionService.update(programacionDeshabilitacion));
    } else {
      this.subscribeToSaveResponse(this.programacionDeshabilitacionService.create(programacionDeshabilitacion));
    }
  }

  trackFechaById(_index: number, item: IFecha): number {
    return item.id!;
  }

  trackHorarioCatalogoById(_index: number, item: IHorarioCatalogo): number {
    return item.id!;
  }

  trackProgramacionById(_index: number, item: IProgramacion): number {
    return item.id!;
  }

  trackUsuarioById(_index: number, item: IUsuario): number {
    return item.id!;
  }

  getSelectedFecha(option: IFecha, selectedVals?: IFecha[]): IFecha {
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgramacionDeshabilitacion>>): void {
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

  protected updateForm(programacionDeshabilitacion: IProgramacionDeshabilitacion): void {
    this.editForm.patchValue({
      id: programacionDeshabilitacion.id,
      activo: programacionDeshabilitacion.activo,
      codigo: programacionDeshabilitacion.codigo,
      descripcion: programacionDeshabilitacion.descripcion,
      fecha: programacionDeshabilitacion.fecha ? programacionDeshabilitacion.fecha.format(DATE_TIME_FORMAT) : null,
      nombreUsuario: programacionDeshabilitacion.nombreUsuario,
      fechas: programacionDeshabilitacion.fechas,
      horarioCatalogos: programacionDeshabilitacion.horarioCatalogos,
      programacion: programacionDeshabilitacion.programacion,
      usuario: programacionDeshabilitacion.usuario,
    });

    this.fechasSharedCollection = this.fechaService.addFechaToCollectionIfMissing(
      this.fechasSharedCollection,
      ...(programacionDeshabilitacion.fechas ?? [])
    );
    this.horarioCatalogosSharedCollection = this.horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing(
      this.horarioCatalogosSharedCollection,
      ...(programacionDeshabilitacion.horarioCatalogos ?? [])
    );
    this.programacionsSharedCollection = this.programacionService.addProgramacionToCollectionIfMissing(
      this.programacionsSharedCollection,
      programacionDeshabilitacion.programacion
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing(
      this.usuariosSharedCollection,
      programacionDeshabilitacion.usuario
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fechaService
      .query()
      .pipe(map((res: HttpResponse<IFecha[]>) => res.body ?? []))
      .pipe(
        map((fechas: IFecha[]) => this.fechaService.addFechaToCollectionIfMissing(fechas, ...(this.editForm.get('fechas')!.value ?? [])))
      )
      .subscribe((fechas: IFecha[]) => (this.fechasSharedCollection = fechas));

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

    this.programacionService
      .query()
      .pipe(map((res: HttpResponse<IProgramacion[]>) => res.body ?? []))
      .pipe(
        map((programacions: IProgramacion[]) =>
          this.programacionService.addProgramacionToCollectionIfMissing(programacions, this.editForm.get('programacion')!.value)
        )
      )
      .subscribe((programacions: IProgramacion[]) => (this.programacionsSharedCollection = programacions));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing(usuarios, this.editForm.get('usuario')!.value))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }

  protected createFromForm(): IProgramacionDeshabilitacion {
    return {
      ...new ProgramacionDeshabilitacion(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      nombreUsuario: this.editForm.get(['nombreUsuario'])!.value,
      fechas: this.editForm.get(['fechas'])!.value,
      horarioCatalogos: this.editForm.get(['horarioCatalogos'])!.value,
      programacion: this.editForm.get(['programacion'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
    };
  }
}
