import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IUsuario, Usuario } from '../usuario.model';
import { UsuarioService } from '../service/usuario.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';
import { IComputadora } from 'app/entities/computadora/computadora.model';
import { ComputadoraService } from 'app/entities/computadora/service/computadora.service';

@Component({
  selector: 'jhi-usuario-update',
  templateUrl: './usuario-update.component.html',
})
export class UsuarioUpdateComponent implements OnInit {
  isSaving = false;

  usersSharedCollection: IUser[] = [];
  empleadosCollection: IEmpleado[] = [];
  sucursalsSharedCollection: ISucursal[] = [];
  computadorasSharedCollection: IComputadora[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
    codigoSecreto: [null, [Validators.minLength(2), Validators.maxLength(6)]],
    imagen: [],
    imagenContentType: [],
    user: [null, Validators.required],
    empleado: [],
    sucursals: [null, Validators.required],
    computadoras: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected usuarioService: UsuarioService,
    protected userService: UserService,
    protected empleadoService: EmpleadoService,
    protected sucursalService: SucursalService,
    protected computadoraService: ComputadoraService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuario }) => {
      this.updateForm(usuario);

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
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  trackUserById(_index: number, item: IUser): number {
    return item.id!;
  }

  trackEmpleadoById(_index: number, item: IEmpleado): number {
    return item.id!;
  }

  trackSucursalById(_index: number, item: ISucursal): number {
    return item.id!;
  }

  trackComputadoraById(_index: number, item: IComputadora): number {
    return item.id!;
  }

  getSelectedSucursal(option: ISucursal, selectedVals?: ISucursal[]): ISucursal {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedComputadora(option: IComputadora, selectedVals?: IComputadora[]): IComputadora {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
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

  protected updateForm(usuario: IUsuario): void {
    this.editForm.patchValue({
      id: usuario.id,
      codigo: usuario.codigo,
      codigoSecreto: usuario.codigoSecreto,
      imagen: usuario.imagen,
      imagenContentType: usuario.imagenContentType,
      user: usuario.user,
      empleado: usuario.empleado,
      sucursals: usuario.sucursals,
      computadoras: usuario.computadoras,
    });

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, usuario.user);
    this.empleadosCollection = this.empleadoService.addEmpleadoToCollectionIfMissing(this.empleadosCollection, usuario.empleado);
    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(
      this.sucursalsSharedCollection,
      ...(usuario.sucursals ?? [])
    );
    this.computadorasSharedCollection = this.computadoraService.addComputadoraToCollectionIfMissing(
      this.computadorasSharedCollection,
      ...(usuario.computadoras ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.empleadoService
      .query({ 'usuarioId.specified': 'false' })
      .pipe(map((res: HttpResponse<IEmpleado[]>) => res.body ?? []))
      .pipe(
        map((empleados: IEmpleado[]) =>
          this.empleadoService.addEmpleadoToCollectionIfMissing(empleados, this.editForm.get('empleado')!.value)
        )
      )
      .subscribe((empleados: IEmpleado[]) => (this.empleadosCollection = empleados));

    this.sucursalService
      .query()
      .pipe(map((res: HttpResponse<ISucursal[]>) => res.body ?? []))
      .pipe(
        map((sucursals: ISucursal[]) =>
          this.sucursalService.addSucursalToCollectionIfMissing(sucursals, ...(this.editForm.get('sucursals')!.value ?? []))
        )
      )
      .subscribe((sucursals: ISucursal[]) => (this.sucursalsSharedCollection = sucursals));

    this.computadoraService
      .query()
      .pipe(map((res: HttpResponse<IComputadora[]>) => res.body ?? []))
      .pipe(
        map((computadoras: IComputadora[]) =>
          this.computadoraService.addComputadoraToCollectionIfMissing(computadoras, ...(this.editForm.get('computadoras')!.value ?? []))
        )
      )
      .subscribe((computadoras: IComputadora[]) => (this.computadorasSharedCollection = computadoras));
  }

  protected createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      codigoSecreto: this.editForm.get(['codigoSecreto'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      user: this.editForm.get(['user'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
      sucursals: this.editForm.get(['sucursals'])!.value,
      computadoras: this.editForm.get(['computadoras'])!.value,
    };
  }
}
