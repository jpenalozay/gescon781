import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionDescuento } from '../inscripcion-descuento.model';
import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';
import { InscripcionDescuentoDeleteDialogComponent } from '../delete/inscripcion-descuento-delete-dialog.component';

@Component({
  selector: 'jhi-inscripcion-descuento',
  templateUrl: './inscripcion-descuento.component.html',
})
export class InscripcionDescuentoComponent implements OnInit {
  inscripcionDescuentos?: IInscripcionDescuento[];
  isLoading = false;

  constructor(protected inscripcionDescuentoService: InscripcionDescuentoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionDescuentoService.query().subscribe({
      next: (res: HttpResponse<IInscripcionDescuento[]>) => {
        this.isLoading = false;
        this.inscripcionDescuentos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcionDescuento): number {
    return item.id!;
  }

  delete(inscripcionDescuento: IInscripcionDescuento): void {
    const modalRef = this.modalService.open(InscripcionDescuentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcionDescuento = inscripcionDescuento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
