import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISucursalSerie } from '../sucursal-serie.model';

@Component({
  selector: 'jhi-sucursal-serie-detail',
  templateUrl: './sucursal-serie-detail.component.html',
})
export class SucursalSerieDetailComponent implements OnInit {
  sucursalSerie: ISucursalSerie | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sucursalSerie }) => {
      this.sucursalSerie = sucursalSerie;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
