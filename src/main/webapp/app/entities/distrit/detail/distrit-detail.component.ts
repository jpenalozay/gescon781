import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDistrit } from '../distrit.model';

@Component({
  selector: 'jhi-distrit-detail',
  templateUrl: './distrit-detail.component.html',
})
export class DistritDetailComponent implements OnInit {
  distrit: IDistrit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ distrit }) => {
      this.distrit = distrit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
