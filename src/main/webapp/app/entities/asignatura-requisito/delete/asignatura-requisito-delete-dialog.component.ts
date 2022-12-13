import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignaturaRequisito } from '../asignatura-requisito.model';
import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';

@Component({
  templateUrl: './asignatura-requisito-delete-dialog.component.html',
})
export class AsignaturaRequisitoDeleteDialogComponent {
  asignaturaRequisito?: IAsignaturaRequisito;

  constructor(protected asignaturaRequisitoService: AsignaturaRequisitoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asignaturaRequisitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
