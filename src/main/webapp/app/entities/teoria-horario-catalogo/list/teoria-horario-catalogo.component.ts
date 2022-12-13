import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';
import { TeoriaHorarioCatalogoDeleteDialogComponent } from '../delete/teoria-horario-catalogo-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-teoria-horario-catalogo',
  templateUrl: './teoria-horario-catalogo.component.html',
})
export class TeoriaHorarioCatalogoComponent implements OnInit {
  teoriaHorarioCatalogos?: ITeoriaHorarioCatalogo[];
  isLoading = false;

  constructor(
    protected teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.teoriaHorarioCatalogoService.query().subscribe({
      next: (res: HttpResponse<ITeoriaHorarioCatalogo[]>) => {
        this.isLoading = false;
        this.teoriaHorarioCatalogos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ITeoriaHorarioCatalogo): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(teoriaHorarioCatalogo: ITeoriaHorarioCatalogo): void {
    const modalRef = this.modalService.open(TeoriaHorarioCatalogoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.teoriaHorarioCatalogo = teoriaHorarioCatalogo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
