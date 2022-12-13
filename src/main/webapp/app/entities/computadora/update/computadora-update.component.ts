import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IComputadora, Computadora } from '../computadora.model';
import { ComputadoraService } from '../service/computadora.service';
import { Estado } from 'app/entities/enumerations/estado.model';
import { ComputadoraTipo } from 'app/entities/enumerations/computadora-tipo.model';

@Component({
  selector: 'jhi-computadora-update',
  templateUrl: './computadora-update.component.html',
})
export class ComputadoraUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);
  computadoraTipoValues = Object.keys(ComputadoraTipo);

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    descripcion: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    estadoComputadora: [null, [Validators.required]],
    mac: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    tipo: [null, [Validators.required]],
  });

  constructor(protected computadoraService: ComputadoraService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ computadora }) => {
      this.updateForm(computadora);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const computadora = this.createFromForm();
    if (computadora.id !== undefined) {
      this.subscribeToSaveResponse(this.computadoraService.update(computadora));
    } else {
      this.subscribeToSaveResponse(this.computadoraService.create(computadora));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComputadora>>): void {
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

  protected updateForm(computadora: IComputadora): void {
    this.editForm.patchValue({
      id: computadora.id,
      nombre: computadora.nombre,
      nombreCorto: computadora.nombreCorto,
      descripcion: computadora.descripcion,
      estadoComputadora: computadora.estadoComputadora,
      mac: computadora.mac,
      tipo: computadora.tipo,
    });
  }

  protected createFromForm(): IComputadora {
    return {
      ...new Computadora(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      estadoComputadora: this.editForm.get(['estadoComputadora'])!.value,
      mac: this.editForm.get(['mac'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }
}
