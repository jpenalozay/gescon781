import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IComputadora } from '../computadora.model';
import { ComputadoraService } from '../service/computadora.service';
import { ComputadoraDeleteDialogComponent } from '../delete/computadora-delete-dialog.component';

@Component({
  selector: 'jhi-computadora',
  templateUrl: './computadora.component.html',
})
export class ComputadoraComponent implements OnInit {
  computadoras?: IComputadora[];
  isLoading = false;

  constructor(protected computadoraService: ComputadoraService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.computadoraService.query().subscribe({
      next: (res: HttpResponse<IComputadora[]>) => {
        this.isLoading = false;
        this.computadoras = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IComputadora): number {
    return item.id!;
  }

  delete(computadora: IComputadora): void {
    const modalRef = this.modalService.open(ComputadoraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.computadora = computadora;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
