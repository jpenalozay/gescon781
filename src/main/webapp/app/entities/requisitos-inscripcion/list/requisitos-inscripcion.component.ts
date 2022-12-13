import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequisitosInscripcion } from '../requisitos-inscripcion.model';
import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';
import { RequisitosInscripcionDeleteDialogComponent } from '../delete/requisitos-inscripcion-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-requisitos-inscripcion',
  templateUrl: './requisitos-inscripcion.component.html',
})
export class RequisitosInscripcionComponent implements OnInit {
  requisitosInscripcions?: IRequisitosInscripcion[];
  isLoading = false;

  constructor(
    protected requisitosInscripcionService: RequisitosInscripcionService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.requisitosInscripcionService.query().subscribe({
      next: (res: HttpResponse<IRequisitosInscripcion[]>) => {
        this.isLoading = false;
        this.requisitosInscripcions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRequisitosInscripcion): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(requisitosInscripcion: IRequisitosInscripcion): void {
    const modalRef = this.modalService.open(RequisitosInscripcionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.requisitosInscripcion = requisitosInscripcion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
