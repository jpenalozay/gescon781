import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';
import { InscripcionAsignaturaRequisitoDeleteDialogComponent } from '../delete/inscripcion-asignatura-requisito-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-inscripcion-asignatura-requisito',
  templateUrl: './inscripcion-asignatura-requisito.component.html',
})
export class InscripcionAsignaturaRequisitoComponent implements OnInit {
  inscripcionAsignaturaRequisitos?: IInscripcionAsignaturaRequisito[];
  isLoading = false;

  constructor(
    protected inscripcionAsignaturaRequisitoService: InscripcionAsignaturaRequisitoService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionAsignaturaRequisitoService.query().subscribe({
      next: (res: HttpResponse<IInscripcionAsignaturaRequisito[]>) => {
        this.isLoading = false;
        this.inscripcionAsignaturaRequisitos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcionAsignaturaRequisito): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito): void {
    const modalRef = this.modalService.open(InscripcionAsignaturaRequisitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcionAsignaturaRequisito = inscripcionAsignaturaRequisito;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
