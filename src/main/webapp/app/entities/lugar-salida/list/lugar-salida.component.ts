import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILugarSalida } from '../lugar-salida.model';
import { LugarSalidaService } from '../service/lugar-salida.service';
import { LugarSalidaDeleteDialogComponent } from '../delete/lugar-salida-delete-dialog.component';

@Component({
  selector: 'jhi-lugar-salida',
  templateUrl: './lugar-salida.component.html',
})
export class LugarSalidaComponent implements OnInit {
  lugarSalidas?: ILugarSalida[];
  isLoading = false;

  constructor(protected lugarSalidaService: LugarSalidaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.lugarSalidaService.query().subscribe({
      next: (res: HttpResponse<ILugarSalida[]>) => {
        this.isLoading = false;
        this.lugarSalidas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ILugarSalida): number {
    return item.id!;
  }

  delete(lugarSalida: ILugarSalida): void {
    const modalRef = this.modalService.open(LugarSalidaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lugarSalida = lugarSalida;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
