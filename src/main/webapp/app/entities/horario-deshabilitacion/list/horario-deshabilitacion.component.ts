import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';
import { HorarioDeshabilitacionDeleteDialogComponent } from '../delete/horario-deshabilitacion-delete-dialog.component';

@Component({
  selector: 'jhi-horario-deshabilitacion',
  templateUrl: './horario-deshabilitacion.component.html',
})
export class HorarioDeshabilitacionComponent implements OnInit {
  horarioDeshabilitacions?: IHorarioDeshabilitacion[];
  isLoading = false;

  constructor(protected horarioDeshabilitacionService: HorarioDeshabilitacionService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.horarioDeshabilitacionService.query().subscribe({
      next: (res: HttpResponse<IHorarioDeshabilitacion[]>) => {
        this.isLoading = false;
        this.horarioDeshabilitacions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IHorarioDeshabilitacion): number {
    return item.id!;
  }

  delete(horarioDeshabilitacion: IHorarioDeshabilitacion): void {
    const modalRef = this.modalService.open(HorarioDeshabilitacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.horarioDeshabilitacion = horarioDeshabilitacion;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
