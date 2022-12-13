import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscripcionDescuento } from '../inscripcion-descuento.model';

@Component({
  selector: 'jhi-inscripcion-descuento-detail',
  templateUrl: './inscripcion-descuento-detail.component.html',
})
export class InscripcionDescuentoDetailComponent implements OnInit {
  inscripcionDescuento: IInscripcionDescuento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionDescuento }) => {
      this.inscripcionDescuento = inscripcionDescuento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
