import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHorarioCatalogo } from '../horario-catalogo.model';

@Component({
  selector: 'jhi-horario-catalogo-detail',
  templateUrl: './horario-catalogo-detail.component.html',
})
export class HorarioCatalogoDetailComponent implements OnInit {
  horarioCatalogo: IHorarioCatalogo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioCatalogo }) => {
      this.horarioCatalogo = horarioCatalogo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
