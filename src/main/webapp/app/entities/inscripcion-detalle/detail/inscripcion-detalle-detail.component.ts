import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscripcionDetalle } from '../inscripcion-detalle.model';

@Component({
  selector: 'jhi-inscripcion-detalle-detail',
  templateUrl: './inscripcion-detalle-detail.component.html',
})
export class InscripcionDetalleDetailComponent implements OnInit {
  inscripcionDetalle: IInscripcionDetalle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcionDetalle }) => {
      this.inscripcionDetalle = inscripcionDetalle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
