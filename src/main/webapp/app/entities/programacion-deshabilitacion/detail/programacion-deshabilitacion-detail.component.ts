import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';

@Component({
  selector: 'jhi-programacion-deshabilitacion-detail',
  templateUrl: './programacion-deshabilitacion-detail.component.html',
})
export class ProgramacionDeshabilitacionDetailComponent implements OnInit {
  programacionDeshabilitacion: IProgramacionDeshabilitacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programacionDeshabilitacion }) => {
      this.programacionDeshabilitacion = programacionDeshabilitacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
