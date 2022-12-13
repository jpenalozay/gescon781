import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionDetalle } from '../inscripcion-detalle.model';
import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';

@Component({
  templateUrl: './inscripcion-detalle-delete-dialog.component.html',
})
export class InscripcionDetalleDeleteDialogComponent {
  inscripcionDetalle?: IInscripcionDetalle;

  constructor(protected inscripcionDetalleService: InscripcionDetalleService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionDetalleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
