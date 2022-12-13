import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsignaturaAdiciones } from '../asignatura-adiciones.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-asignatura-adiciones-detail',
  templateUrl: './asignatura-adiciones-detail.component.html',
})
export class AsignaturaAdicionesDetailComponent implements OnInit {
  asignaturaAdiciones: IAsignaturaAdiciones | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignaturaAdiciones }) => {
      this.asignaturaAdiciones = asignaturaAdiciones;
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
