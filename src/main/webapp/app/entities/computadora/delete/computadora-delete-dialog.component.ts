import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IComputadora } from '../computadora.model';
import { ComputadoraService } from '../service/computadora.service';

@Component({
  templateUrl: './computadora-delete-dialog.component.html',
})
export class ComputadoraDeleteDialogComponent {
  computadora?: IComputadora;

  constructor(protected computadoraService: ComputadoraService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.computadoraService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
