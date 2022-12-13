import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeoria } from '../teoria.model';
import { TeoriaService } from '../service/teoria.service';
import { TeoriaDeleteDialogComponent } from '../delete/teoria-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-teoria',
  templateUrl: './teoria.component.html',
})
export class TeoriaComponent implements OnInit {
  teorias?: ITeoria[];
  isLoading = false;

  constructor(protected teoriaService: TeoriaService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.teoriaService.query().subscribe({
      next: (res: HttpResponse<ITeoria[]>) => {
        this.isLoading = false;
        this.teorias = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ITeoria): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(teoria: ITeoria): void {
    const modalRef = this.modalService.open(TeoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.teoria = teoria;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
