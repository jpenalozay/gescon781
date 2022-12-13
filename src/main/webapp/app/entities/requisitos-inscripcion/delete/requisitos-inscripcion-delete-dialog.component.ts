import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequisitosInscripcion } from '../requisitos-inscripcion.model';
import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';

@Component({
  templateUrl: './requisitos-inscripcion-delete-dialog.component.html',
})
export class RequisitosInscripcionDeleteDialogComponent {
  requisitosInscripcion?: IRequisitosInscripcion;

  constructor(protected requisitosInscripcionService: RequisitosInscripcionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requisitosInscripcionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
