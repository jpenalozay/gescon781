import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioCatalogo } from '../horario-catalogo.model';
import { HorarioCatalogoService } from '../service/horario-catalogo.service';

@Component({
  templateUrl: './horario-catalogo-delete-dialog.component.html',
})
export class HorarioCatalogoDeleteDialogComponent {
  horarioCatalogo?: IHorarioCatalogo;

  constructor(protected horarioCatalogoService: HorarioCatalogoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioCatalogoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
