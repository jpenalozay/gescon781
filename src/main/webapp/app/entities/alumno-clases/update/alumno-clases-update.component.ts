import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAlumnoClases, AlumnoClases } from '../alumno-clases.model';
import { AlumnoClasesService } from '../service/alumno-clases.service';

@Component({
  selector: 'jhi-alumno-clases-update',
  templateUrl: './alumno-clases-update.component.html',
})
export class AlumnoClasesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    clasesTotales: [],
    clasesProgramadas: [],
    clasesRealizadas: [],
  });

  constructor(protected alumnoClasesService: AlumnoClasesService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoClases }) => {
      this.updateForm(alumnoClases);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alumnoClases = this.createFromForm();
    if (alumnoClases.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoClasesService.update(alumnoClases));
    } else {
      this.subscribeToSaveResponse(this.alumnoClasesService.create(alumnoClases));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumnoClases>>): void {
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

  protected updateForm(alumnoClases: IAlumnoClases): void {
    this.editForm.patchValue({
      id: alumnoClases.id,
      clasesTotales: alumnoClases.clasesTotales,
      clasesProgramadas: alumnoClases.clasesProgramadas,
      clasesRealizadas: alumnoClases.clasesRealizadas,
    });
  }

  protected createFromForm(): IAlumnoClases {
    return {
      ...new AlumnoClases(),
      id: this.editForm.get(['id'])!.value,
      clasesTotales: this.editForm.get(['clasesTotales'])!.value,
      clasesProgramadas: this.editForm.get(['clasesProgramadas'])!.value,
      clasesRealizadas: this.editForm.get(['clasesRealizadas'])!.value,
    };
  }
}
