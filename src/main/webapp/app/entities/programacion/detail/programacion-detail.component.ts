import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgramacion } from '../programacion.model';

@Component({
  selector: 'jhi-programacion-detail',
  templateUrl: './programacion-detail.component.html',
})
export class ProgramacionDetailComponent implements OnInit {
  programacion: IProgramacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programacion }) => {
      this.programacion = programacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
