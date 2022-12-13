import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IFecha } from '../fecha.model';
import { FechaService } from '../service/fecha.service';

@Component({
  selector: 'jhi-fecha',
  templateUrl: './fecha.component.html',
})
export class FechaComponent implements OnInit {
  fechas?: IFecha[];
  isLoading = false;

  constructor(protected fechaService: FechaService) {}

  loadAll(): void {
    this.isLoading = true;

    this.fechaService.query().subscribe({
      next: (res: HttpResponse<IFecha[]>) => {
        this.isLoading = false;
        this.fechas = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IFecha): number {
    return item.id!;
  }
}
