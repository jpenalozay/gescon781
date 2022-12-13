import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlumnoCategoria } from '../alumno-categoria.model';

@Component({
  selector: 'jhi-alumno-categoria-detail',
  templateUrl: './alumno-categoria-detail.component.html',
})
export class AlumnoCategoriaDetailComponent implements OnInit {
  alumnoCategoria: IAlumnoCategoria | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoCategoria }) => {
      this.alumnoCategoria = alumnoCategoria;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
