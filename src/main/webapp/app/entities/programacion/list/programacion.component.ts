import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramacion } from '../programacion.model';
import { ProgramacionService } from '../service/programacion.service';
import { ProgramacionDeleteDialogComponent } from '../delete/programacion-delete-dialog.component';

@Component({
  selector: 'jhi-programacion',
  templateUrl: './programacion.component.html',
})
export class ProgramacionComponent implements OnInit {
  programacions?: IProgramacion[];
  isLoading = false;

  constructor(protected programacionService: ProgramacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.programacionService.query().subscribe({
      next: (res: HttpResponse<IProgramacion[]>) => {
        this.isLoading = false;
        this.programacions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IProgramacion): number {
    return item.id!;
  }

  delete(programacion: IProgramacion): void {
    const modalRef = this.modalService.open(ProgramacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programacion = programacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
