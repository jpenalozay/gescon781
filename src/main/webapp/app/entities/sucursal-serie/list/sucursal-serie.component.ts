import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISucursalSerie } from '../sucursal-serie.model';
import { SucursalSerieService } from '../service/sucursal-serie.service';
import { SucursalSerieDeleteDialogComponent } from '../delete/sucursal-serie-delete-dialog.component';

@Component({
  selector: 'jhi-sucursal-serie',
  templateUrl: './sucursal-serie.component.html',
})
export class SucursalSerieComponent implements OnInit {
  sucursalSeries?: ISucursalSerie[];
  isLoading = false;

  constructor(protected sucursalSerieService: SucursalSerieService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.sucursalSerieService.query().subscribe({
      next: (res: HttpResponse<ISucursalSerie[]>) => {
        this.isLoading = false;
        this.sucursalSeries = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISucursalSerie): number {
    return item.id!;
  }

  delete(sucursalSerie: ISucursalSerie): void {
    const modalRef = this.modalService.open(SucursalSerieDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sucursalSerie = sucursalSerie;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
