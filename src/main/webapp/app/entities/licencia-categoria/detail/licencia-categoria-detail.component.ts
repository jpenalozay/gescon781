import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILicenciaCategoria } from '../licencia-categoria.model';

@Component({
  selector: 'jhi-licencia-categoria-detail',
  templateUrl: './licencia-categoria-detail.component.html',
})
export class LicenciaCategoriaDetailComponent implements OnInit {
  licenciaCategoria: ILicenciaCategoria | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licenciaCategoria }) => {
      this.licenciaCategoria = licenciaCategoria;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
