import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDia } from '../dia.model';
import { DiaService } from '../service/dia.service';
import { DiaDeleteDialogComponent } from '../delete/dia-delete-dialog.component';

@Component({
  selector: 'jhi-dia',
  templateUrl: './dia.component.html',
})
export class DiaComponent implements OnInit {
  dias?: IDia[];
  isLoading = false;

  constructor(protected diaService: DiaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.diaService.query().subscribe({
      next: (res: HttpResponse<IDia[]>) => {
        this.isLoading = false;
        this.dias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDia): number {
    return item.id!;
  }

  delete(dia: IDia): void {
    const modalRef = this.modalService.open(DiaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dia = dia;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
