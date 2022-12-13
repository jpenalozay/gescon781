import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoDesarrollo } from '../alumno-desarrollo.model';
import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';
import { AlumnoDesarrolloDeleteDialogComponent } from '../delete/alumno-desarrollo-delete-dialog.component';

@Component({
  selector: 'jhi-alumno-desarrollo',
  templateUrl: './alumno-desarrollo.component.html',
})
export class AlumnoDesarrolloComponent implements OnInit {
  alumnoDesarrollos?: IAlumnoDesarrollo[];
  isLoading = false;

  constructor(protected alumnoDesarrolloService: AlumnoDesarrolloService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.alumnoDesarrolloService.query().subscribe({
      next: (res: HttpResponse<IAlumnoDesarrollo[]>) => {
        this.isLoading = false;
        this.alumnoDesarrollos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAlumnoDesarrollo): number {
    return item.id!;
  }

  delete(alumnoDesarrollo: IAlumnoDesarrollo): void {
    const modalRef = this.modalService.open(AlumnoDesarrolloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.alumnoDesarrollo = alumnoDesarrollo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
