import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscripcionPago } from '../inscripcion-pago.model';

@Component({
  selector: 'jhi-inscripcion-pago-detail',
  templateUrl: './inscripcion-pago-detail.component.html',
})
export class InscripcionPagoDetailComponent implements OnInit {
  inscripcionPago: IInscripcionPago | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionPago }) => {
      this.inscripcionPago = inscripcionPago;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
