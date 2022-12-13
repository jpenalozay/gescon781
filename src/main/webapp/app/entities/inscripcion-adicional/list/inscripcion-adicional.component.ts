import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionAdicional } from '../inscripcion-adicional.model';
import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';
import { InscripcionAdicionalDeleteDialogComponent } from '../delete/inscripcion-adicional-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-inscripcion-adicional',
  templateUrl: './inscripcion-adicional.component.html',
})
export class InscripcionAdicionalComponent implements OnInit {
  inscripcionAdicionals?: IInscripcionAdicional[];
  isLoading = false;

  constructor(
    protected inscripcionAdicionalService: InscripcionAdicionalService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.inscripcionAdicionalService.query().subscribe({
      next: (res: HttpResponse<IInscripcionAdicional[]>) => {
        this.isLoading = false;
        this.inscripcionAdicionals = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IInscripcionAdicional): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(inscripcionAdicional: IInscripcionAdicional): void {
    const modalRef = this.modalService.open(InscripcionAdicionalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inscripcionAdicional = inscripcionAdicional;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
