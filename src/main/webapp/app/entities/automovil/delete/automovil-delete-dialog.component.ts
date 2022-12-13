import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAutomovil } from '../automovil.model';
import { AutomovilService } from '../service/automovil.service';

@Component({
  templateUrl: './automovil-delete-dialog.component.html',
})
export class AutomovilDeleteDialogComponent {
  automovil?: IAutomovil;

  constructor(protected automovilService: AutomovilService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.automovilService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
