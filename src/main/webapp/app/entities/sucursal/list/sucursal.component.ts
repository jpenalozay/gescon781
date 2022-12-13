import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal.service';
import { SucursalDeleteDialogComponent } from '../delete/sucursal-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-sucursal',
  templateUrl: './sucursal.component.html',
})
export class SucursalComponent implements OnInit {
  sucursals?: ISucursal[];
  isLoading = false;

  constructor(protected sucursalService: SucursalService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.sucursalService.query().subscribe({
      next: (res: HttpResponse<ISucursal[]>) => {
        this.isLoading = false;
        this.sucursals = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISucursal): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(sucursal: ISucursal): void {
    const modalRef = this.modalService.open(SucursalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sucursal = sucursal;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
