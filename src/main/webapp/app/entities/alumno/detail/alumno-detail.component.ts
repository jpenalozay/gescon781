import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlumno } from '../alumno.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-alumno-detail',
  templateUrl: './alumno-detail.component.html',
})
export class AlumnoDetailComponent implements OnInit {
  alumno: IAlumno | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumno }) => {
      this.alumno = alumno;
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
