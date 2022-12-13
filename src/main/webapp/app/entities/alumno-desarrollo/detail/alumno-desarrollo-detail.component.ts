import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlumnoDesarrollo } from '../alumno-desarrollo.model';

@Component({
  selector: 'jhi-alumno-desarrollo-detail',
  templateUrl: './alumno-desarrollo-detail.component.html',
})
export class AlumnoDesarrolloDetailComponent implements OnInit {
  alumnoDesarrollo: IAlumnoDesarrollo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoDesarrollo }) => {
      this.alumnoDesarrollo = alumnoDesarrollo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
