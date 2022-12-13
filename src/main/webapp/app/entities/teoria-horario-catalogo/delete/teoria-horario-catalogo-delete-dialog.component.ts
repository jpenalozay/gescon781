import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';

@Component({
  templateUrl: './teoria-horario-catalogo-delete-dialog.component.html',
})
export class TeoriaHorarioCatalogoDeleteDialogComponent {
  teoriaHorarioCatalogo?: ITeoriaHorarioCatalogo;

  constructor(protected teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.teoriaHorarioCatalogoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
