import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDia } from '../dia.model';

@Component({
  selector: 'jhi-dia-detail',
  templateUrl: './dia-detail.component.html',
})
export class DiaDetailComponent implements OnInit {
  dia: IDia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dia }) => {
      this.dia = dia;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
