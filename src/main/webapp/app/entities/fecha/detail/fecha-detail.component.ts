import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFecha } from '../fecha.model';

@Component({
  selector: 'jhi-fecha-detail',
  templateUrl: './fecha-detail.component.html',
})
export class FechaDetailComponent implements OnInit {
  fecha: IFecha | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fecha }) => {
      this.fecha = fecha;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
