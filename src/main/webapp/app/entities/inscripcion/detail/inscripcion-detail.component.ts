import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscripcion } from '../inscripcion.model';

@Component({
  selector: 'jhi-inscripcion-detail',
  templateUrl: './inscripcion-detail.component.html',
})
export class InscripcionDetailComponent implements OnInit {
  inscripcion: IInscripcion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscripcion }) => {
      this.inscripcion = inscripcion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
