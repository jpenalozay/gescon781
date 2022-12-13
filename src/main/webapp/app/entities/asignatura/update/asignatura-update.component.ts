import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAsignatura, Asignatura } from '../asignatura.model';
import { AsignaturaService } from '../service/asignatura.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';
import { IAsignaturaAdiciones } from 'app/entities/asignatura-adiciones/asignatura-adiciones.model';
import { AsignaturaAdicionesService } from 'app/entities/asignatura-adiciones/service/asignatura-adiciones.service';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';
import { AsignaturaRequisitoService } from 'app/entities/asignatura-requisito/service/asignatura-requisito.service';
import { ICurso } from 'app/entities/curso/curso.model';
import { CursoService } from 'app/entities/curso/service/curso.service';
import { Estado } from 'app/entities/enumerations/estado.model';

@Component({
  selector: 'jhi-asignatura-update',
  templateUrl: './asignatura-update.component.html',
})
export class AsignaturaUpdateComponent implements OnInit {
  isSaving = false;
  estadoValues = Object.keys(Estado);

  licenciaCategoriasSharedCollection: ILicenciaCategoria[] = [];
  asignaturaAdicionesSharedCollection: IAsignaturaAdiciones[] = [];
  teoriaHorarioCatalogosSharedCollection: ITeoriaHorarioCatalogo[] = [];
  asignaturaRequisitosSharedCollection: IAsignaturaRequisito[] = [];
  cursosSharedCollection: ICurso[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [null, [Validators.required]],
    nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(512)]],
    nombreCorto: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    descripcion: [null, [Validators.minLength(2), Validators.maxLength(512)]],
    documento: [],
    horasTeoricas: [],
    horasPracticas: [],
    numeroClasesTeoria: [],
    numeroClasesPractica: [],
    vigencia: [],
    costo: [null, [Validators.required]],
    imagen: [],
    imagenContentType: [],
    categorias: [],
    adicionals: [],
    horarios: [],
    asignaturaRequisitos: [],
    curso: [null, Validators.required],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected asignaturaService: AsignaturaService,
    protected licenciaCategoriaService: LicenciaCategoriaService,
    protected asignaturaAdicionesService: AsignaturaAdicionesService,
    protected teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService,
    protected asignaturaRequisitoService: AsignaturaRequisitoService,
    protected cursoService: CursoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignatura }) => {
      this.updateForm(asignatura);

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
    const asignatura = this.createFromForm();
    if (asignatura.id !== undefined) {
      this.subscribeToSaveResponse(this.asignaturaService.update(asignatura));
    } else {
      this.subscribeToSaveResponse(this.asignaturaService.create(asignatura));
    }
  }

  trackLicenciaCategoriaById(_index: number, item: ILicenciaCategoria): number {
    return item.id!;
  }

  trackAsignaturaAdicionesById(_index: number, item: IAsignaturaAdiciones): number {
    return item.id!;
  }

  trackTeoriaHorarioCatalogoById(_index: number, item: ITeoriaHorarioCatalogo): number {
    return item.id!;
  }

  trackAsignaturaRequisitoById(_index: number, item: IAsignaturaRequisito): number {
    return item.id!;
  }

  trackCursoById(_index: number, item: ICurso): number {
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

  getSelectedAsignaturaAdiciones(option: IAsignaturaAdiciones, selectedVals?: IAsignaturaAdiciones[]): IAsignaturaAdiciones {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedTeoriaHorarioCatalogo(option: ITeoriaHorarioCatalogo, selectedVals?: ITeoriaHorarioCatalogo[]): ITeoriaHorarioCatalogo {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  getSelectedAsignaturaRequisito(option: IAsignaturaRequisito, selectedVals?: IAsignaturaRequisito[]): IAsignaturaRequisito {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignatura>>): void {
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

  protected updateForm(asignatura: IAsignatura): void {
    this.editForm.patchValue({
      id: asignatura.id,
      activo: asignatura.activo,
      nombre: asignatura.nombre,
      nombreCorto: asignatura.nombreCorto,
      descripcion: asignatura.descripcion,
      documento: asignatura.documento,
      horasTeoricas: asignatura.horasTeoricas,
      horasPracticas: asignatura.horasPracticas,
      numeroClasesTeoria: asignatura.numeroClasesTeoria,
      numeroClasesPractica: asignatura.numeroClasesPractica,
      vigencia: asignatura.vigencia,
      costo: asignatura.costo,
      imagen: asignatura.imagen,
      imagenContentType: asignatura.imagenContentType,
      categorias: asignatura.categorias,
      adicionals: asignatura.adicionals,
      horarios: asignatura.horarios,
      asignaturaRequisitos: asignatura.asignaturaRequisitos,
      curso: asignatura.curso,
    });

    this.licenciaCategoriasSharedCollection = this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(
      this.licenciaCategoriasSharedCollection,
      ...(asignatura.categorias ?? [])
    );
    this.asignaturaAdicionesSharedCollection = this.asignaturaAdicionesService.addAsignaturaAdicionesToCollectionIfMissing(
      this.asignaturaAdicionesSharedCollection,
      ...(asignatura.adicionals ?? [])
    );
    this.teoriaHorarioCatalogosSharedCollection = this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
      this.teoriaHorarioCatalogosSharedCollection,
      ...(asignatura.horarios ?? [])
    );
    this.asignaturaRequisitosSharedCollection = this.asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing(
      this.asignaturaRequisitosSharedCollection,
      ...(asignatura.asignaturaRequisitos ?? [])
    );
    this.cursosSharedCollection = this.cursoService.addCursoToCollectionIfMissing(this.cursosSharedCollection, asignatura.curso);
  }

  protected loadRelationshipsOptions(): void {
    this.licenciaCategoriaService
      .query()
      .pipe(map((res: HttpResponse<ILicenciaCategoria[]>) => res.body ?? []))
      .pipe(
        map((licenciaCategorias: ILicenciaCategoria[]) =>
          this.licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing(
            licenciaCategorias,
            ...(this.editForm.get('categorias')!.value ?? [])
          )
        )
      )
      .subscribe((licenciaCategorias: ILicenciaCategoria[]) => (this.licenciaCategoriasSharedCollection = licenciaCategorias));

    this.asignaturaAdicionesService
      .query()
      .pipe(map((res: HttpResponse<IAsignaturaAdiciones[]>) => res.body ?? []))
      .pipe(
        map((asignaturaAdiciones: IAsignaturaAdiciones[]) =>
          this.asignaturaAdicionesService.addAsignaturaAdicionesToCollectionIfMissing(
            asignaturaAdiciones,
            ...(this.editForm.get('adicionals')!.value ?? [])
          )
        )
      )
      .subscribe((asignaturaAdiciones: IAsignaturaAdiciones[]) => (this.asignaturaAdicionesSharedCollection = asignaturaAdiciones));

    this.teoriaHorarioCatalogoService
      .query()
      .pipe(map((res: HttpResponse<ITeoriaHorarioCatalogo[]>) => res.body ?? []))
      .pipe(
        map((teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) =>
          this.teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing(
            teoriaHorarioCatalogos,
            ...(this.editForm.get('horarios')!.value ?? [])
          )
        )
      )
      .subscribe(
        (teoriaHorarioCatalogos: ITeoriaHorarioCatalogo[]) => (this.teoriaHorarioCatalogosSharedCollection = teoriaHorarioCatalogos)
      );

    this.asignaturaRequisitoService
      .query()
      .pipe(map((res: HttpResponse<IAsignaturaRequisito[]>) => res.body ?? []))
      .pipe(
        map((asignaturaRequisitos: IAsignaturaRequisito[]) =>
          this.asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing(
            asignaturaRequisitos,
            ...(this.editForm.get('asignaturaRequisitos')!.value ?? [])
          )
        )
      )
      .subscribe((asignaturaRequisitos: IAsignaturaRequisito[]) => (this.asignaturaRequisitosSharedCollection = asignaturaRequisitos));

    this.cursoService
      .query()
      .pipe(map((res: HttpResponse<ICurso[]>) => res.body ?? []))
      .pipe(map((cursos: ICurso[]) => this.cursoService.addCursoToCollectionIfMissing(cursos, this.editForm.get('curso')!.value)))
      .subscribe((cursos: ICurso[]) => (this.cursosSharedCollection = cursos));
  }

  protected createFromForm(): IAsignatura {
    return {
      ...new Asignatura(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCorto: this.editForm.get(['nombreCorto'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      documento: this.editForm.get(['documento'])!.value,
      horasTeoricas: this.editForm.get(['horasTeoricas'])!.value,
      horasPracticas: this.editForm.get(['horasPracticas'])!.value,
      numeroClasesTeoria: this.editForm.get(['numeroClasesTeoria'])!.value,
      numeroClasesPractica: this.editForm.get(['numeroClasesPractica'])!.value,
      vigencia: this.editForm.get(['vigencia'])!.value,
      costo: this.editForm.get(['costo'])!.value,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      categorias: this.editForm.get(['categorias'])!.value,
      adicionals: this.editForm.get(['adicionals'])!.value,
      horarios: this.editForm.get(['horarios'])!.value,
      asignaturaRequisitos: this.editForm.get(['asignaturaRequisitos'])!.value,
      curso: this.editForm.get(['curso'])!.value,
    };
  }
}
