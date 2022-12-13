import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILugarSalida } from '../lugar-salida.model';

@Component({
  selector: 'jhi-lugar-salida-detail',
  templateUrl: './lugar-salida-detail.component.html',
})
export class LugarSalidaDetailComponent implements OnInit {
  lugarSalida: ILugarSalida | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lugarSalida }) => {
      this.lugarSalida = lugarSalida;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
