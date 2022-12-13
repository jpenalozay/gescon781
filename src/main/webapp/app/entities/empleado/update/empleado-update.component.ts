import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmpleado, Empleado } from '../empleado.model';
import { EmpleadoService } from '../service/empleado.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { ICargo } from 'app/entities/cargo/cargo.model';
import { CargoService } from 'app/entities/cargo/service/cargo.service';
import { EstadoEmpleado } from 'app/entities/enumerations/estado-empleado.model';
import { EmpleadoTipo } from 'app/entities/enumerations/empleado-tipo.model';
import { GradoInstruccion } from 'app/entities/enumerations/grado-instruccion.model';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html',
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving = false;
  estadoEmpleadoValues = Object.keys(EstadoEmpleado);
  empleadoTipoValues = Object.keys(EmpleadoTipo);
  gradoInstruccionValues = Object.keys(GradoInstruccion);

  personasCollection: IPersona[] = [];
  cargosSharedCollection: ICargo[] = [];

  editForm = this.fb.group({
    id: [],
    estado: [null, [Validators.required]],
    tipo: [null, [Validators.required]],
    codigo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
    codigoAcceso: [null, [Validators.minLength(1), Validators.maxLength(5)]],
    telefonoTrabajo: [null, [Validators.minLength(1), Validators.maxLength(20)]],
    telefonoTrabajo1: [null, [Validators.minLength(1), Validators.maxLength(20)]],
    gradoInstrucion: [],
    emailCoorporativo: [null, [Validators.minLength(1), Validators.maxLength(128)]],
    fechaIngreso: [null, [Validators.required]],
    inasistencias: [null, [Validators.min(0), Validators.max(100)]],
    tardanzas: [null, [Validators.min(0), Validators.max(100)]],
    imagen: [],
    imagenContentType: [],
    sueldo: [],
    firma: [],
    firmaContentType: [],
    persona: [null, Validators.required],
    cargo: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected empleadoService: EmpleadoService,
    protected personaService: PersonaService,
    protected cargoService: CargoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gesconApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  trackPersonaById(_index: number, item: IPersona): number {
    return item.id!;
  }

  trackCargoById(_index: number, item: ICargo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>): void {
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

  protected updateForm(empleado: IEmpleado): void {
    this.editForm.patchValue({
      id: empleado.id,
      estado: empleado.estado,
      tipo: empleado.tipo,
      codigo: empleado.codigo,
      codigoAcceso: empleado.codigoAcceso,
      telefonoTrabajo: empleado.telefonoTrabajo,
      telefonoTrabajo1: empleado.telefonoTrabajo1,
      gradoInstrucion: empleado.gradoInstrucion,
      emailCoorporativo: empleado.emailCoorporativo,
      fechaIngreso: empleado.fechaIngreso,
      inasistencias: empleado.inasistencias,
      tardanzas: empleado.tardanzas,
      imagen: empleado.imagen,
      imagenContentType: empleado.imagenContentType,
      sueldo: empleado.sueldo,
      firma: empleado.firma,
      firmaContentType: empleado.firmaContentType,
      persona: empleado.persona,
      cargo: empleado.cargo,
    });

    this.personasCollection = this.personaService.addPersonaToCollectionIfMissing(this.personasCollection, empleado.persona);
    this.cargosSharedCollection = this.cargoService.addCargoToCollectionIfMissing(this.cargosSharedCollection, empleado.cargo);
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query({ 'empleadoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing(personas, this.editForm.get('persona')!.value))
      )
      .subscribe((personas: IPersona[]) => (this.personasCollection = personas));

    this.cargoService
      .query()
      .pipe(map((res: HttpResponse<ICargo[]>) => res.body ?? []))
      .pipe(map((cargos: ICargo[]) => this.cargoService.addCargoToCollectionIfMissing(cargos, this.editForm.get('cargo')!.value)))
      .subscribe((cargos: ICargo[]) => (this.cargosSharedCollection = cargos));
  }

  protected createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      codigoAcceso: this.editForm.get(['codigoAcceso'])!.value,
      telefonoTrabajo: this.editForm.get(['telefonoTrabajo'])!.value,
      telefonoTrabajo1: this.editForm.get(['telefonoTrabajo1'])!.value,
      gradoInstrucion: this.editForm.get(['gradoInstrucion'])!.value,
      emailCoorporativo: this.editForm.get(['emailCoorporativo'])!.value,
      fechaIngreso: this.editForm.get(['fechaIngreso'])!.value,
      inasistencias: this.editForm.get(['inasistencias'])!.value,
      tardanzas: this.editForm.get(['tardanzas'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      sueldo: this.editForm.get(['sueldo'])!.value,
      firmaContentType: this.editForm.get(['firmaContentType'])!.value,
      firma: this.editForm.get(['firma'])!.value,
      persona: this.editForm.get(['persona'])!.value,
      cargo: this.editForm.get(['cargo'])!.value,
    };
  }
}
