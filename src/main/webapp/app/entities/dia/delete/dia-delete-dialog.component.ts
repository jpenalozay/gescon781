import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDia } from '../dia.model';
import { DiaService } from '../service/dia.service';

@Component({
  templateUrl: './dia-delete-dialog.component.html',
})
export class DiaDeleteDialogComponent {
  dia?: IDia;

  constructor(protected diaService: DiaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
