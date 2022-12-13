import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioCatalogo } from '../horario-catalogo.model';
import { HorarioCatalogoService } from '../service/horario-catalogo.service';
import { HorarioCatalogoDeleteDialogComponent } from '../delete/horario-catalogo-delete-dialog.component';

@Component({
  selector: 'jhi-horario-catalogo',
  templateUrl: './horario-catalogo.component.html',
})
export class HorarioCatalogoComponent implements OnInit {
  horarioCatalogos?: IHorarioCatalogo[];
  isLoading = false;

  constructor(protected horarioCatalogoService: HorarioCatalogoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.horarioCatalogoService.query().subscribe({
      next: (res: HttpResponse<IHorarioCatalogo[]>) => {
        this.isLoading = false;
        this.horarioCatalogos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IHorarioCatalogo): number {
    return item.id!;
  }

  delete(horarioCatalogo: IHorarioCatalogo): void {
    const modalRef = this.modalService.open(HorarioCatalogoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.horarioCatalogo = horarioCatalogo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
