import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignaturaAdiciones } from '../asignatura-adiciones.model';
import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';
import { AsignaturaAdicionesDeleteDialogComponent } from '../delete/asignatura-adiciones-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-asignatura-adiciones',
  templateUrl: './asignatura-adiciones.component.html',
})
export class AsignaturaAdicionesComponent implements OnInit {
  asignaturaAdiciones?: IAsignaturaAdiciones[];
  isLoading = false;

  constructor(
    protected asignaturaAdicionesService: AsignaturaAdicionesService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.asignaturaAdicionesService.query().subscribe({
      next: (res: HttpResponse<IAsignaturaAdiciones[]>) => {
        this.isLoading = false;
        this.asignaturaAdiciones = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAsignaturaAdiciones): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(asignaturaAdiciones: IAsignaturaAdiciones): void {
    const modalRef = this.modalService.open(AsignaturaAdicionesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asignaturaAdiciones = asignaturaAdiciones;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
