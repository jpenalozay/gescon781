import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILicenciaCategoria } from '../licencia-categoria.model';
import { LicenciaCategoriaService } from '../service/licencia-categoria.service';

@Component({
  templateUrl: './licencia-categoria-delete-dialog.component.html',
})
export class LicenciaCategoriaDeleteDialogComponent {
  licenciaCategoria?: ILicenciaCategoria;

  constructor(protected licenciaCategoriaService: LicenciaCategoriaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.licenciaCategoriaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
