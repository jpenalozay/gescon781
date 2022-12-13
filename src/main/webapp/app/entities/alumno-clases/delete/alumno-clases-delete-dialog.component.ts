import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoClases } from '../alumno-clases.model';
import { AlumnoClasesService } from '../service/alumno-clases.service';

@Component({
  templateUrl: './alumno-clases-delete-dialog.component.html',
})
export class AlumnoClasesDeleteDialogComponent {
  alumnoClases?: IAlumnoClases;

  constructor(protected alumnoClasesService: AlumnoClasesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alumnoClasesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
