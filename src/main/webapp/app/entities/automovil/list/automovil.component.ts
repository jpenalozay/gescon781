import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAutomovil } from '../automovil.model';
import { AutomovilService } from '../service/automovil.service';
import { AutomovilDeleteDialogComponent } from '../delete/automovil-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-automovil',
  templateUrl: './automovil.component.html',
})
export class AutomovilComponent implements OnInit {
  automovils?: IAutomovil[];
  isLoading = false;

  constructor(protected automovilService: AutomovilService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.automovilService.query().subscribe({
      next: (res: HttpResponse<IAutomovil[]>) => {
        this.isLoading = false;
        this.automovils = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAutomovil): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(automovil: IAutomovil): void {
    const modalRef = this.modalService.open(AutomovilDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.automovil = automovil;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
