import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAlumnoCategoria } from '../alumno-categoria.model';
import { AlumnoCategoriaService } from '../service/alumno-categoria.service';

@Component({
  templateUrl: './alumno-categoria-delete-dialog.component.html',
})
export class AlumnoCategoriaDeleteDialogComponent {
  alumnoCategoria?: IAlumnoCategoria;

  constructor(protected alumnoCategoriaService: AlumnoCategoriaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alumnoCategoriaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
