import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';

@Component({
  templateUrl: './horario-deshabilitacion-delete-dialog.component.html',
})
export class HorarioDeshabilitacionDeleteDialogComponent {
  horarioDeshabilitacion?: IHorarioDeshabilitacion;

  constructor(protected horarioDeshabilitacionService: HorarioDeshabilitacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioDeshabilitacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
