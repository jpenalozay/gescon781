import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionPago } from '../inscripcion-pago.model';
import { InscripcionPagoService } from '../service/inscripcion-pago.service';

@Component({
  templateUrl: './inscripcion-pago-delete-dialog.component.html',
})
export class InscripcionPagoDeleteDialogComponent {
  inscripcionPago?: IInscripcionPago;

  constructor(protected inscripcionPagoService: InscripcionPagoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionPagoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
