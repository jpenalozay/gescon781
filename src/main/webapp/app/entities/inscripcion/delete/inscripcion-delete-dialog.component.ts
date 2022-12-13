import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcion } from '../inscripcion.model';
import { InscripcionService } from '../service/inscripcion.service';

@Component({
  templateUrl: './inscripcion-delete-dialog.component.html',
})
export class InscripcionDeleteDialogComponent {
  inscripcion?: IInscripcion;

  constructor(protected inscripcionService: InscripcionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
