import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumno } from '../alumno.model';
import { AlumnoService } from '../service/alumno.service';
import { AlumnoDeleteDialogComponent } from '../delete/alumno-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-alumno',
  templateUrl: './alumno.component.html',
})
export class AlumnoComponent implements OnInit {
  alumnos?: IAlumno[];
  isLoading = false;

  constructor(protected alumnoService: AlumnoService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.alumnoService.query().subscribe({
      next: (res: HttpResponse<IAlumno[]>) => {
        this.isLoading = false;
        this.alumnos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAlumno): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(alumno: IAlumno): void {
    const modalRef = this.modalService.open(AlumnoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.alumno = alumno;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
