import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionDetalle } from '../inscripcion-detalle.model';
import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';
import { InscripcionDetalleDeleteDialogComponent } from '../delete/inscripcion-detalle-delete-dialog.component';

@Component({
  selector: 'jhi-inscripcion-detalle',
  templateUrl: './inscripcion-detalle.component.html',
})
export class InscripcionDetalleComponent implements OnInit {
  inscripcionDetalles?: IInscripcionDetalle[];
  isLoading = false;

  constructor(protected inscripcionDetalleService: InscripcionDetalleService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionDetalleService.query().subscribe({
      next: (res: HttpResponse<IInscripcionDetalle[]>) => {
        this.isLoading = false;
        this.inscripcionDetalles = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcionDetalle): number {
    return item.id!;
  }

  delete(inscripcionDetalle: IInscripcionDetalle): void {
    const modalRef = this.modalService.open(InscripcionDetalleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcionDetalle = inscripcionDetalle;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
