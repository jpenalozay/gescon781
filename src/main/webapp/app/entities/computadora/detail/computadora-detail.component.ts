import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComputadora } from '../computadora.model';

@Component({
  selector: 'jhi-computadora-detail',
  templateUrl: './computadora-detail.component.html',
})
export class ComputadoraDetailComponent implements OnInit {
  computadora: IComputadora | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ computadora }) => {
      this.computadora = computadora;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
