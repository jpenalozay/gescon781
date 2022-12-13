import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IDistrit } from '../distrit.model';
import { DistritService } from '../service/distrit.service';

@Component({
  selector: 'jhi-distrit',
  templateUrl: './distrit.component.html',
})
export class DistritComponent implements OnInit {
  distrits?: IDistrit[];
  isLoading = false;

  constructor(protected distritService: DistritService) {}

  loadAll(): void {
    this.isLoading = true;

    this.distritService.query().subscribe({
      next: (res: HttpResponse<IDistrit[]>) => {
        this.isLoading = false;
        this.distrits = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDistrit): number {
    return item.id!;
  }
}
