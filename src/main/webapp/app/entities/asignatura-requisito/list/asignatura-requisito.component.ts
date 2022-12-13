import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignaturaRequisito } from '../asignatura-requisito.model';
import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';
import { AsignaturaRequisitoDeleteDialogComponent } from '../delete/asignatura-requisito-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-asignatura-requisito',
  templateUrl: './asignatura-requisito.component.html',
})
export class AsignaturaRequisitoComponent implements OnInit {
  asignaturaRequisitos?: IAsignaturaRequisito[];
  isLoading = false;

  constructor(
    protected asignaturaRequisitoService: AsignaturaRequisitoService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.asignaturaRequisitoService.query().subscribe({
      next: (res: HttpResponse<IAsignaturaRequisito[]>) => {
        this.isLoading = false;
        this.asignaturaRequisitos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAsignaturaRequisito): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(asignaturaRequisito: IAsignaturaRequisito): void {
    const modalRef = this.modalService.open(AsignaturaRequisitoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asignaturaRequisito = asignaturaRequisito;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
