import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAlumnoCategoria, AlumnoCategoria } from '../alumno-categoria.model';
import { AlumnoCategoriaService } from '../service/alumno-categoria.service';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';

@Component({
  selector: 'jhi-alumno-categoria-update',
  templateUrl: './alumno-categoria-update.component.html',
})
export class AlumnoCategoriaUpdateComponent implements OnInit {
  isSaving = false;

  alumnosSharedCollection: IAlumno[] = [];
  licenciaCategoriasSharedCollection: ILicenciaCategoria[] = [];

  editForm = this.fb.group({
    id: [],
    licenciaNumeroAlumno: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    alumno: [null, Validators.required],
    categoria: [null, Validators.required],
  });

  constructor(
    protected alumnoCategoriaService: AlumnoCategoriaService,
    protected alumnoService: AlumnoService,
    protected licenciaCategoriaService: LicenciaCategoriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoCategoria }) => {
      this.updateForm(alumnoCategoria);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const alumnoCategoria = this.createFromForm();
    if (alumnoCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.alumnoCategoriaService.update(alumnoCategoria));
    } else {
      this.subscribeToSaveResponse(this.alumnoCategoriaService.create(alumnoCategoria));
    }
  }

  trackAlumnoById(_index: number, item: IAlumno): number {
    return item.id!;
  }

  trackLicenciaCategoriaById(_index: number, item: ILicenciaCategoria): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlumnoCategoria>>): void {
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

  protected updateForm(alumnoCategoria: IAlumnoCategoria): void {
    this.editForm.patchValue({
      id: alumnoCategoria.id,
      licenciaNumeroAlumno: alumnoCategoria.licenciaNumeroAlumno,
      alumno: alumnoCategoria.alumno,
      categoria: alumnoCategoria.categoria,
    });

    this.alumnosSharedCollection = this.alumnoService.addAlumnoToCollectionIfMissing(this.alumnosSharedCollection, alumnoCategoria.alumno);
    this.licenciaCategoriasSharedCollection = this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(
      this.licenciaCategoriasSharedCollection,
      alumnoCategoria.categoria
    );
  }

  protected loadRelationshipsOptions(): void {
    this.alumnoService
      .query()
      .pipe(map((res: HttpResponse<IAlumno[]>) => res.body ?? []))
      .pipe(map((alumnos: IAlumno[]) => this.alumnoService.addAlumnoToCollectionIfMissing(alumnos, this.editForm.get('alumno')!.value)))
      .subscribe((alumnos: IAlumno[]) => (this.alumnosSharedCollection = alumnos));

    this.licenciaCategoriaService
      .query()
      .pipe(map((res: HttpResponse<ILicenciaCategoria[]>) => res.body ?? []))
      .pipe(
        map((licenciaCategorias: ILicenciaCategoria[]) =>
          this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(licenciaCategorias, this.editForm.get('categoria')!.value)
        )
      )
      .subscribe((licenciaCategorias: ILicenciaCategoria[]) => (this.licenciaCategoriasSharedCollection = licenciaCategorias));
  }

  protected createFromForm(): IAlumnoCategoria {
    return {
      ...new AlumnoCategoria(),
      id: this.editForm.get(['id'])!.value,
      licenciaNumeroAlumno: this.editForm.get(['licenciaNumeroAlumno'])!.value,
      alumno: this.editForm.get(['alumno'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
    };
  }
}
