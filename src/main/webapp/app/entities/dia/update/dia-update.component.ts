import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDia, Dia } from '../dia.model';
import { DiaService } from '../service/dia.service';

@Component({
  selector: 'jhi-dia-update',
  templateUrl: './dia-update.component.html',
})
export class DiaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
  });

  constructor(protected diaService: DiaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dia }) => {
      this.updateForm(dia);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dia = this.createFromForm();
    if (dia.id !== undefined) {
      this.subscribeToSaveResponse(this.diaService.update(dia));
    } else {
      this.subscribeToSaveResponse(this.diaService.create(dia));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDia>>): void {
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

  protected updateForm(dia: IDia): void {
    this.editForm.patchValue({
      id: dia.id,
      nombre: dia.nombre,
      nombreCorto: dia.nombreCorto,
    });
  }

  protected createFromForm(): IDia {
    return {
      ...new Dia(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
    };
  }
}
