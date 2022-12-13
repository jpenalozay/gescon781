import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';
import { ProgramacionDeshabilitacionDeleteDialogComponent } from '../delete/programacion-deshabilitacion-delete-dialog.component';

@Component({
  selector: 'jhi-programacion-deshabilitacion',
  templateUrl: './programacion-deshabilitacion.component.html',
})
export class ProgramacionDeshabilitacionComponent implements OnInit {
  programacionDeshabilitacions?: IProgramacionDeshabilitacion[];
  isLoading = false;

  constructor(protected programacionDeshabilitacionService: ProgramacionDeshabilitacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.programacionDeshabilitacionService.query().subscribe({
      next: (res: HttpResponse<IProgramacionDeshabilitacion[]>) => {
        this.isLoading = false;
        this.programacionDeshabilitacions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProgramacionDeshabilitacion): number {
    return item.id!;
  }

  delete(programacionDeshabilitacion: IProgramacionDeshabilitacion): void {
    const modalRef = this.modalService.open(ProgramacionDeshabilitacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programacionDeshabilitacion = programacionDeshabilitacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
