import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoDesarrollo } from '../alumno-desarrollo.model';
import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';

@Component({
  templateUrl: './alumno-desarrollo-delete-dialog.component.html',
})
export class AlumnoDesarrolloDeleteDialogComponent {
  alumnoDesarrollo?: IAlumnoDesarrollo;

  constructor(protected alumnoDesarrolloService: AlumnoDesarrolloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alumnoDesarrolloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
