import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-teoria-horario-catalogo-detail',
  templateUrl: './teoria-horario-catalogo-detail.component.html',
})
export class TeoriaHorarioCatalogoDetailComponent implements OnInit {
  teoriaHorarioCatalogo: ITeoriaHorarioCatalogo | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ teoriaHorarioCatalogo }) => {
      this.teoriaHorarioCatalogo = teoriaHorarioCatalogo;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
