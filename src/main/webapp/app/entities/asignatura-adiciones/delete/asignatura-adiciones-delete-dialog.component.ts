import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignaturaAdiciones } from '../asignatura-adiciones.model';
import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';

@Component({
  templateUrl: './asignatura-adiciones-delete-dialog.component.html',
})
export class AsignaturaAdicionesDeleteDialogComponent {
  asignaturaAdiciones?: IAsignaturaAdiciones;

  constructor(protected asignaturaAdicionesService: AsignaturaAdicionesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asignaturaAdicionesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
