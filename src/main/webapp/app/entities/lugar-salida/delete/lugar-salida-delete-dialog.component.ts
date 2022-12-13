import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILugarSalida } from '../lugar-salida.model';
import { LugarSalidaService } from '../service/lugar-salida.service';

@Component({
  templateUrl: './lugar-salida-delete-dialog.component.html',
})
export class LugarSalidaDeleteDialogComponent {
  lugarSalida?: ILugarSalida;

  constructor(protected lugarSalidaService: LugarSalidaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lugarSalidaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
