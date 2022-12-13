import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';

@Component({
  templateUrl: './programacion-deshabilitacion-delete-dialog.component.html',
})
export class ProgramacionDeshabilitacionDeleteDialogComponent {
  programacionDeshabilitacion?: IProgramacionDeshabilitacion;

  constructor(protected programacionDeshabilitacionService: ProgramacionDeshabilitacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programacionDeshabilitacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
