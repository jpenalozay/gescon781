import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISucursalSerie } from '../sucursal-serie.model';
import { SucursalSerieService } from '../service/sucursal-serie.service';

@Component({
  templateUrl: './sucursal-serie-delete-dialog.component.html',
})
export class SucursalSerieDeleteDialogComponent {
  sucursalSerie?: ISucursalSerie;

  constructor(protected sucursalSerieService: SucursalSerieService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sucursalSerieService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
