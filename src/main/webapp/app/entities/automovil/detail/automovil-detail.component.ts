import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAutomovil } from '../automovil.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-automovil-detail',
  templateUrl: './automovil-detail.component.html',
})
export class AutomovilDetailComponent implements OnInit {
  automovil: IAutomovil | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ automovil }) => {
      this.automovil = automovil;
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
