import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AsignaturaAdicionesComponent } from './list/asignatura-adiciones.component';
import { AsignaturaAdicionesDetailComponent } from './detail/asignatura-adiciones-detail.component';
import { AsignaturaAdicionesUpdateComponent } from './update/asignatura-adiciones-update.component';
import { AsignaturaAdicionesDeleteDialogComponent } from './delete/asignatura-adiciones-delete-dialog.component';
import { AsignaturaAdicionesRoutingModule } from './route/asignatura-adiciones-routing.module';

@NgModule({
  imports: [SharedModule, AsignaturaAdicionesRoutingModule],
  declarations: [
    AsignaturaAdicionesComponent,
    AsignaturaAdicionesDetailComponent,
    AsignaturaAdicionesUpdateComponent,
    AsignaturaAdicionesDeleteDialogComponent,
  ],
  entryComponents: [AsignaturaAdicionesDeleteDialogComponent],
})
export class AsignaturaAdicionesModule {}
