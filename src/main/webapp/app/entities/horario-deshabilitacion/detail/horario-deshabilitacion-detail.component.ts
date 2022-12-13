import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioDeshabilitacion } from '../horario-deshabilitacion.model';

@Component({
  selector: 'jhi-horario-deshabilitacion-detail',
  templateUrl: './horario-deshabilitacion-detail.component.html',
})
export class HorarioDeshabilitacionDetailComponent implements OnInit {
  horarioDeshabilitacion: IHorarioDeshabilitacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioDeshabilitacion }) => {
      this.horarioDeshabilitacion = horarioDeshabilitacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
