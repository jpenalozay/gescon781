import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurso } from '../curso.model';
import { CursoService } from '../service/curso.service';
import { CursoDeleteDialogComponent } from '../delete/curso-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-curso',
  templateUrl: './curso.component.html',
})
export class CursoComponent implements OnInit {
  cursos?: ICurso[];
  isLoading = false;

  constructor(protected cursoService: CursoService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cursoService.query().subscribe({
      next: (res: HttpResponse<ICurso[]>) => {
        this.isLoading = false;
        this.cursos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICurso): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(curso: ICurso): void {
    const modalRef = this.modalService.open(CursoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.curso = curso;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
