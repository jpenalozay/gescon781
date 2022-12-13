import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProfesor, Profesor } from '../profesor.model';
import { ProfesorService } from '../service/profesor.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';

@Component({
  selector: 'jhi-profesor-update',
  templateUrl: './profesor-update.component.html',
})
export class ProfesorUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  siNoValues = Object.keys(SiNo);

  empleadosCollection: IEmpleado[] = [];
  licenciaCategoriasSharedCollection: ILicenciaCategoria[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
    teoria: [null, [Validators.required]],
    practica: [null, [Validators.required]],
    licenciaNumero: [null, [Validators.minLength(2), Validators.maxLength(16)]],
    empleado: [null, Validators.required],
    licenciasPermitidas: [],
    licenciaCategoria: [],
  });

  constructor(
    protected profesorService: ProfesorService,
    protected empleadoService: EmpleadoService,
    protected licenciaCategoriaService: LicenciaCategoriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profesor }) => {
      this.updateForm(profesor);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profesor = this.createFromForm();
    if (profesor.id !== undefined) {
      this.subscribeToSaveResponse(this.profesorService.update(profesor));
    } else {
      this.subscribeToSaveResponse(this.profesorService.create(profesor));
    }
  }

  trackEmpleadoById(_index: number, item: IEmpleado): number {
    return item.id!;
  }

  trackLicenciaCategoriaById(_index: number, item: ILicenciaCategoria): number {
    return item.id!;
  }

  getSelectedLicenciaCategoria(option: ILicenciaCategoria, selectedVals?: ILicenciaCategoria[]): ILicenciaCategoria {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesor>>): void {
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

  protected updateForm(profesor: IProfesor): void {
    this.editForm.patchValue({
      id: profesor.id,
      activo: profesor.activo,
      codigo: profesor.codigo,
      teoria: profesor.teoria,
      practica: profesor.practica,
      licenciaNumero: profesor.licenciaNumero,
      empleado: profesor.empleado,
      licenciasPermitidas: profesor.licenciasPermitidas,
      licenciaCategoria: profesor.licenciaCategoria,
    });

    this.empleadosCollection = this.empleadoService.addEmpleadoToCollectionIfMissing(this.empleadosCollection, profesor.empleado);
    this.licenciaCategoriasSharedCollection = this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(
      this.licenciaCategoriasSharedCollection,
      ...(profesor.licenciasPermitidas ?? []),
      profesor.licenciaCategoria
    );
  }

  protected loadRelationshipsOptions(): void {
    this.empleadoService
      .query({ 'profesorId.specified': 'false' })
      .pipe(map((res: HttpResponse<IEmpleado[]>) => res.body ?? []))
      .pipe(
        map((empleados: IEmpleado[]) =>
          this.empleadoService.addEmpleadoToCollectionIfMissing(empleados, this.editForm.get('empleado')!.value)
        )
      )
      .subscribe((empleados: IEmpleado[]) => (this.empleadosCollection = empleados));

    this.licenciaCategoriaService
      .query()
      .pipe(map((res: HttpResponse<ILicenciaCategoria[]>) => res.body ?? []))
      .pipe(
        map((licenciaCategorias: ILicenciaCategoria[]) =>
          this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(
            licenciaCategorias,
            ...(this.editForm.get('licenciasPermitidas')!.value ?? []),
            this.editForm.get('licenciaCategoria')!.value
          )
        )
      )
      .subscribe((licenciaCategorias: ILicenciaCategoria[]) => (this.licenciaCategoriasSharedCollection = licenciaCategorias));
  }

  protected createFromForm(): IProfesor {
    return {
      ...new Profesor(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      teoria: this.editForm.get(['teoria'])!.value,
      practica: this.editForm.get(['practica'])!.value,
      licenciaNumero: this.editForm.get(['licenciaNumero'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
      licenciasPermitidas: this.editForm.get(['licenciasPermitidas'])!.value,
      licenciaCategoria: this.editForm.get(['licenciaCategoria'])!.value,
    };
  }
}
