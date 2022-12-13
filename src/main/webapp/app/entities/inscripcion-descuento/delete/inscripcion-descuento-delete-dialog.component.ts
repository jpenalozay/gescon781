import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionDescuento } from '../inscripcion-descuento.model';
import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';

@Component({
  templateUrl: './inscripcion-descuento-delete-dialog.component.html',
})
export class InscripcionDescuentoDeleteDialogComponent {
  inscripcionDescuento?: IInscripcionDescuento;

  constructor(protected inscripcionDescuentoService: InscripcionDescuentoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionDescuentoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
