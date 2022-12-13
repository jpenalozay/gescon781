import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILicenciaCategoria } from '../licencia-categoria.model';
import { LicenciaCategoriaService } from '../service/licencia-categoria.service';
import { LicenciaCategoriaDeleteDialogComponent } from '../delete/licencia-categoria-delete-dialog.component';

@Component({
  selector: 'jhi-licencia-categoria',
  templateUrl: './licencia-categoria.component.html',
})
export class LicenciaCategoriaComponent implements OnInit {
  licenciaCategorias?: ILicenciaCategoria[];
  isLoading = false;

  constructor(protected licenciaCategoriaService: LicenciaCategoriaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.licenciaCategoriaService.query().subscribe({
      next: (res: HttpResponse<ILicenciaCategoria[]>) => {
        this.isLoading = false;
        this.licenciaCategorias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ILicenciaCategoria): number {
    return item.id!;
  }

  delete(licenciaCategoria: ILicenciaCategoria): void {
    const modalRef = this.modalService.open(LicenciaCategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.licenciaCategoria = licenciaCategoria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
