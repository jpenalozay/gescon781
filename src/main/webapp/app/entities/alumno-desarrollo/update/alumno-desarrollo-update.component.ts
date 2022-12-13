import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAlumnoDesarrollo, AlumnoDesarrollo } from '../alumno-desarrollo.model';
import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';
import { AlumnoDesarrolloEstado } from 'app/entities/enumerations/alumno-desarrollo-estado.model';

@Component({
  selector: 'jhi-alumno-desarrollo-update',
  templateUrl: './alumno-desarrollo-update.component.html',
})
export class AlumnoDesarrolloUpdateComponent implements OnInit {
  isSaving = false;
  alumnoDesarrolloEstadoValues = Object.keys(AlumnoDesarrolloEstado);

  editForm = this.fb.group({
    id: [],
    clasesTeoriaProgramadas: [null, [Validators.min(0), Validators.max(100)]],
    clasesPracticasProgramas: [null, [Validators.min(0), Validators.max(100)]],
    clasesInasistenciaTeoria: [null, [Validators.min(0), Validators.max(100)]],
    clasesInasistenciaPractica: [null, [Validators.min(0), Validators.max(100)]],
    clasesRealizadasTeoria: [null, [Validators.min(0), Validators.max(100)]],
    clasesRealizadasPractica: [null, [Validators.min(0), Validators.max(100)]],
    alumnoDesarrolloEstado: [],
  });

  constructor(
    protected alumnoDesarrolloService: AlumnoDesarrolloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoDesarrollo }) => {
      this.updateForm(alumnoDesarrollo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alumnoDesarrollo = this.createFromForm();
    if (alumnoDesarrollo.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoDesarrolloService.update(alumnoDesarrollo));
    } else {
      this.subscribeToSaveResponse(this.alumnoDesarrolloService.create(alumnoDesarrollo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumnoDesarrollo>>): void {
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

  protected updateForm(alumnoDesarrollo: IAlumnoDesarrollo): void {
    this.editForm.patchValue({
      id: alumnoDesarrollo.id,
      clasesTeoriaProgramadas: alumnoDesarrollo.clasesTeoriaProgramadas,
      clasesPracticasProgramas: alumnoDesarrollo.clasesPracticasProgramas,
      clasesInasistenciaTeoria: alumnoDesarrollo.clasesInasistenciaTeoria,
      clasesInasistenciaPractica: alumnoDesarrollo.clasesInasistenciaPractica,
      clasesRealizadasTeoria: alumnoDesarrollo.clasesRealizadasTeoria,
      clasesRealizadasPractica: alumnoDesarrollo.clasesRealizadasPractica,
      alumnoDesarrolloEstado: alumnoDesarrollo.alumnoDesarrolloEstado,
    });
  }

  protected createFromForm(): IAlumnoDesarrollo {
    return {
      ...new AlumnoDesarrollo(),
      id: this.editForm.get(['id'])!.value,
      clasesTeoriaProgramadas: this.editForm.get(['clasesTeoriaProgramadas'])!.value,
      clasesPracticasProgramas: this.editForm.get(['clasesPracticasProgramas'])!.value,
      clasesInasistenciaTeoria: this.editForm.get(['clasesInasistenciaTeoria'])!.value,
      clasesInasistenciaPractica: this.editForm.get(['clasesInasistenciaPractica'])!.value,
      clasesRealizadasTeoria: this.editForm.get(['clasesRealizadasTeoria'])!.value,
      clasesRealizadasPractica: this.editForm.get(['clasesRealizadasPractica'])!.value,
      alumnoDesarrolloEstado: this.editForm.get(['alumnoDesarrolloEstado'])!.value,
    };
  }
}
