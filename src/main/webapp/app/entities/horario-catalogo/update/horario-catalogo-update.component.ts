import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHorarioCatalogo, HorarioCatalogo } from '../horario-catalogo.model';
import { HorarioCatalogoService } from '../service/horario-catalogo.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-horario-catalogo-update',
  templateUrl: './horario-catalogo-update.component.html',
})
export class HorarioCatalogoUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
    horaInicio: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
    horaFin: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
    descripcion: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
  });

  constructor(
    protected horarioCatalogoService: HorarioCatalogoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioCatalogo }) => {
      this.updateForm(horarioCatalogo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horarioCatalogo = this.createFromForm();
    if (horarioCatalogo.id !== undefined) {
      this.subscribeToSaveResponse(this.horarioCatalogoService.update(horarioCatalogo));
    } else {
      this.subscribeToSaveResponse(this.horarioCatalogoService.create(horarioCatalogo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioCatalogo>>): void {
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

  protected updateForm(horarioCatalogo: IHorarioCatalogo): void {
    this.editForm.patchValue({
      id: horarioCatalogo.id,
      activo: horarioCatalogo.activo,
      codigo: horarioCatalogo.codigo,
      horaInicio: horarioCatalogo.horaInicio,
      horaFin: horarioCatalogo.horaFin,
      descripcion: horarioCatalogo.descripcion,
    });
  }

  protected createFromForm(): IHorarioCatalogo {
    return {
      ...new HorarioCatalogo(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      horaInicio: this.editForm.get(['horaInicio'])!.value,
      horaFin: this.editForm.get(['horaFin'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
    };
  }
}
