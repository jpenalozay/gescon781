import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramacion } from '../programacion.model';
import { ProgramacionService } from '../service/programacion.service';

@Component({
  templateUrl: './programacion-delete-dialog.component.html',
})
export class ProgramacionDeleteDialogComponent {
  programacion?: IProgramacion;

  constructor(protected programacionService: ProgramacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
