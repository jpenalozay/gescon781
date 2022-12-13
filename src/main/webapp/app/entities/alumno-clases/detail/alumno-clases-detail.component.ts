import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlumnoClases } from '../alumno-clases.model';

@Component({
  selector: 'jhi-alumno-clases-detail',
  templateUrl: './alumno-clases-detail.component.html',
})
export class AlumnoClasesDetailComponent implements OnInit {
  alumnoClases: IAlumnoClases | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoClases }) => {
      this.alumnoClases = alumnoClases;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
