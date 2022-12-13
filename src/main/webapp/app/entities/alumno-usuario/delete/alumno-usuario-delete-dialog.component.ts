import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoUsuario } from '../alumno-usuario.model';
import { AlumnoUsuarioService } from '../service/alumno-usuario.service';

@Component({
  templateUrl: './alumno-usuario-delete-dialog.component.html',
})
export class AlumnoUsuarioDeleteDialogComponent {
  alumnoUsuario?: IAlumnoUsuario;

  constructor(protected alumnoUsuarioService: AlumnoUsuarioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alumnoUsuarioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
