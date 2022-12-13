import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcion } from '../inscripcion.model';
import { InscripcionService } from '../service/inscripcion.service';
import { InscripcionDeleteDialogComponent } from '../delete/inscripcion-delete-dialog.component';

@Component({
  selector: 'jhi-inscripcion',
  templateUrl: './inscripcion.component.html',
})
export class InscripcionComponent implements OnInit {
  inscripcions?: IInscripcion[];
  isLoading = false;

  constructor(protected inscripcionService: InscripcionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionService.query().subscribe({
      next: (res: HttpResponse<IInscripcion[]>) => {
        this.isLoading = false;
        this.inscripcions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcion): number {
    return item.id!;
  }

  delete(inscripcion: IInscripcion): void {
    const modalRef = this.modalService.open(InscripcionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcion = inscripcion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
