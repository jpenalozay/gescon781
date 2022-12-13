import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionAdicional } from '../inscripcion-adicional.model';
import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';

@Component({
  templateUrl: './inscripcion-adicional-delete-dialog.component.html',
})
export class InscripcionAdicionalDeleteDialogComponent {
  inscripcionAdicional?: IInscripcionAdicional;

  constructor(protected inscripcionAdicionalService: InscripcionAdicionalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionAdicionalService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
