import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITeoria } from '../teoria.model';
import { TeoriaService } from '../service/teoria.service';

@Component({
  templateUrl: './teoria-delete-dialog.component.html',
})
export class TeoriaDeleteDialogComponent {
  teoria?: ITeoria;

  constructor(protected teoriaService: TeoriaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.teoriaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
