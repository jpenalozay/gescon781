import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoClases } from '../alumno-clases.model';
import { AlumnoClasesService } from '../service/alumno-clases.service';
import { AlumnoClasesDeleteDialogComponent } from '../delete/alumno-clases-delete-dialog.component';

@Component({
  selector: 'jhi-alumno-clases',
  templateUrl: './alumno-clases.component.html',
})
export class AlumnoClasesComponent implements OnInit {
  alumnoClases?: IAlumnoClases[];
  isLoading = false;

  constructor(protected alumnoClasesService: AlumnoClasesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.alumnoClasesService.query().subscribe({
      next: (res: HttpResponse<IAlumnoClases[]>) => {
        this.isLoading = false;
        this.alumnoClases = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAlumnoClases): number {
    return item.id!;
  }

  delete(alumnoClases: IAlumnoClases): void {
    const modalRef = this.modalService.open(AlumnoClasesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.alumnoClases = alumnoClases;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
