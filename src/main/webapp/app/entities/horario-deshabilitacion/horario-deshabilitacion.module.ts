import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HorarioDeshabilitacionComponent } from './list/horario-deshabilitacion.component';
import { HorarioDeshabilitacionDetailComponent } from './detail/horario-deshabilitacion-detail.component';
import { HorarioDeshabilitacionUpdateComponent } from './update/horario-deshabilitacion-update.component';
import { HorarioDeshabilitacionDeleteDialogComponent } from './delete/horario-deshabilitacion-delete-dialog.component';
import { HorarioDeshabilitacionRoutingModule } from './route/horario-deshabilitacion-routing.module';

@NgModule({
  imports: [SharedModule, HorarioDeshabilitacionRoutingModule],
  declarations: [
    HorarioDeshabilitacionComponent,
    HorarioDeshabilitacionDetailComponent,
    HorarioDeshabilitacionUpdateComponent,
    HorarioDeshabilitacionDeleteDialogComponent,
  ],
  entryComponents: [HorarioDeshabilitacionDeleteDialogComponent],
})
export class HorarioDeshabilitacionModule {}
