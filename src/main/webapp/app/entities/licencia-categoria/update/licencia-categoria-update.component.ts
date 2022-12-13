import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILicenciaCategoria, LicenciaCategoria } from '../licencia-categoria.model';
import { LicenciaCategoriaService } from '../service/licencia-categoria.service';

@Component({
  selector: 'jhi-licencia-categoria-update',
  templateUrl: './licencia-categoria-update.component.html',
})
export class LicenciaCategoriaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    categoria: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
  });

  constructor(
    protected licenciaCategoriaService: LicenciaCategoriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licenciaCategoria }) => {
      this.updateForm(licenciaCategoria);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const licenciaCategoria = this.createFromForm();
    if (licenciaCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.licenciaCategoriaService.update(licenciaCategoria));
    } else {
      this.subscribeToSaveResponse(this.licenciaCategoriaService.create(licenciaCategoria));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILicenciaCategoria>>): void {
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

  protected updateForm(licenciaCategoria: ILicenciaCategoria): void {
    this.editForm.patchValue({
      id: licenciaCategoria.id,
      categoria: licenciaCategoria.categoria,
    });
  }

  protected createFromForm(): ILicenciaCategoria {
    return {
      ...new LicenciaCategoria(),
      id: this.editForm.get(['id'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
    };
  }
}
