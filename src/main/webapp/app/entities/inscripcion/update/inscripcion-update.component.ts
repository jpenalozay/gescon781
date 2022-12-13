import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IInscripcion, Inscripcion } from '../inscripcion.model';
import { InscripcionService } from '../service/inscripcion.service';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { InscripcionEstado } from 'app/entities/enumerations/inscripcion-estado.model';

@Component({
  selector: 'jhi-inscripcion-update',
  templateUrl: './inscripcion-update.component.html',
})
export class InscripcionUpdateComponent implements OnInit {
  isSaving = false;
  inscripcionEstadoValues = Object.keys(InscripcionEstado);

  alumnosSharedCollection: IAlumno[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    estado: [null, [Validators.required]],
    numeroDocumento: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    costoTotal: [null, [Validators.min(0), Validators.max(10000)]],
    alumno: [null, Validators.required],
  });

  constructor(
    protected inscripcionService: InscripcionService,
    protected alumnoService: AlumnoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcion }) => {
      if (inscripcion.id === undefined) {
        const today = dayjs().startOf('day');
        inscripcion.fecha = today;
      }

      this.updateForm(inscripcion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscripcion = this.createFromForm();
    if (inscripcion.id !== undefined) {
      this.subscribeToSaveResponse(this.inscripcionService.update(inscripcion));
    } else {
      this.subscribeToSaveResponse(this.inscripcionService.create(inscripcion));
    }
  }

  trackAlumnoById(_index: number, item: IAlumno): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscripcion>>): void {
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

  protected updateForm(inscripcion: IInscripcion): void {
    this.editForm.patchValue({
      id: inscripcion.id,
      codigo: inscripcion.codigo,
      estado: inscripcion.estado,
      numeroDocumento: inscripcion.numeroDocumento,
      fecha: inscripcion.fecha ? inscripcion.fecha.format(DATE_TIME_FORMAT) : null,
      costoTotal: inscripcion.costoTotal,
      alumno: inscripcion.alumno,
    });

    this.alumnosSharedCollection = this.alumnoService.addAlumnoToCollectionIfMissing(this.alumnosSharedCollection, inscripcion.alumno);
  }

  protected loadRelationshipsOptions(): void {
    this.alumnoService
      .query()
      .pipe(map((res: HttpResponse<IAlumno[]>) => res.body ?? []))
      .pipe(map((alumnos: IAlumno[]) => this.alumnoService.addAlumnoToCollectionIfMissing(alumnos, this.editForm.get('alumno')!.value)))
      .subscribe((alumnos: IAlumno[]) => (this.alumnosSharedCollection = alumnos));
  }

  protected createFromForm(): IInscripcion {
    return {
      ...new Inscripcion(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      numeroDocumento: this.editForm.get(['numeroDocumento'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      costoTotal: this.editForm.get(['costoTotal'])!.value,
      alumno: this.editForm.get(['alumno'])!.value,
    };
  }
}
