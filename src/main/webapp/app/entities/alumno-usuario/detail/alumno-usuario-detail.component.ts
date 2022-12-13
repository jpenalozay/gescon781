import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlumnoUsuario } from '../alumno-usuario.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-alumno-usuario-detail',
  templateUrl: './alumno-usuario-detail.component.html',
})
export class AlumnoUsuarioDetailComponent implements OnInit {
  alumnoUsuario: IAlumnoUsuario | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ alumnoUsuario }) => {
      this.alumnoUsuario = alumnoUsuario;
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
