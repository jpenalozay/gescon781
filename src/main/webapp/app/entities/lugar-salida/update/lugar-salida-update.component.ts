import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILugarSalida, LugarSalida } from '../lugar-salida.model';
import { LugarSalidaService } from '../service/lugar-salida.service';

@Component({
  selector: 'jhi-lugar-salida-update',
  templateUrl: './lugar-salida-update.component.html',
})
export class LugarSalidaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
  });

  constructor(protected lugarSalidaService: LugarSalidaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lugarSalida }) => {
      this.updateForm(lugarSalida);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lugarSalida = this.createFromForm();
    if (lugarSalida.id !== undefined) {
      this.subscribeToSaveResponse(this.lugarSalidaService.update(lugarSalida));
    } else {
      this.subscribeToSaveResponse(this.lugarSalidaService.create(lugarSalida));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILugarSalida>>): void {
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

  protected updateForm(lugarSalida: ILugarSalida): void {
    this.editForm.patchValue({
      id: lugarSalida.id,
      nombre: lugarSalida.nombre,
    });
  }

  protected createFromForm(): ILugarSalida {
    return {
      ...new LugarSalida(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }
}
