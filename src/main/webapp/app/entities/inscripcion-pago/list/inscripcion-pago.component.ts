import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionPago } from '../inscripcion-pago.model';
import { InscripcionPagoService } from '../service/inscripcion-pago.service';
import { InscripcionPagoDeleteDialogComponent } from '../delete/inscripcion-pago-delete-dialog.component';

@Component({
  selector: 'jhi-inscripcion-pago',
  templateUrl: './inscripcion-pago.component.html',
})
export class InscripcionPagoComponent implements OnInit {
  inscripcionPagos?: IInscripcionPago[];
  isLoading = false;

  constructor(protected inscripcionPagoService: InscripcionPagoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionPagoService.query().subscribe({
      next: (res: HttpResponse<IInscripcionPago[]>) => {
        this.isLoading = false;
        this.inscripcionPagos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcionPago): number {
    return item.id!;
  }

  delete(inscripcionPago: IInscripcionPago): void {
    const modalRef = this.modalService.open(InscripcionPagoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcionPago = inscripcionPago;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
