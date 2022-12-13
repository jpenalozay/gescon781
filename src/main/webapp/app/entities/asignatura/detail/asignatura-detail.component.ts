import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsignatura } from '../asignatura.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-asignatura-detail',
  templateUrl: './asignatura-detail.component.html',
})
export class AsignaturaDetailComponent implements OnInit {
  asignatura: IAsignatura | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignatura }) => {
      this.asignatura = asignatura;
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
