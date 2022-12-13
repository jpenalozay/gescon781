import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoCategoria } from '../alumno-categoria.model';
import { AlumnoCategoriaService } from '../service/alumno-categoria.service';
import { AlumnoCategoriaDeleteDialogComponent } from '../delete/alumno-categoria-delete-dialog.component';

@Component({
  selector: 'jhi-alumno-categoria',
  templateUrl: './alumno-categoria.component.html',
})
export class AlumnoCategoriaComponent implements OnInit {
  alumnoCategorias?: IAlumnoCategoria[];
  isLoading = false;

  constructor(protected alumnoCategoriaService: AlumnoCategoriaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.alumnoCategoriaService.query().subscribe({
      next: (res: HttpResponse<IAlumnoCategoria[]>) => {
        this.isLoading = false;
        this.alumnoCategorias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAlumnoCategoria): number {
    return item.id!;
  }

  delete(alumnoCategoria: IAlumnoCategoria): void {
    const modalRef = this.modalService.open(AlumnoCategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.alumnoCategoria = alumnoCategoria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
