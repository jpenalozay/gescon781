import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';

@Component({
  templateUrl: './inscripcion-asignatura-requisito-delete-dialog.component.html',
})
export class InscripcionAsignaturaRequisitoDeleteDialogComponent {
  inscripcionAsignaturaRequisito?: IInscripcionAsignaturaRequisito;

  constructor(
    protected inscripcionAsignaturaRequisitoService: InscripcionAsignaturaRequisitoService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscripcionAsignaturaRequisitoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
