import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProgramacionDeshabilitacionComponent } from './list/programacion-deshabilitacion.component';
import { ProgramacionDeshabilitacionDetailComponent } from './detail/programacion-deshabilitacion-detail.component';
import { ProgramacionDeshabilitacionUpdateComponent } from './update/programacion-deshabilitacion-update.component';
import { ProgramacionDeshabilitacionDeleteDialogComponent } from './delete/programacion-deshabilitacion-delete-dialog.component';
import { ProgramacionDeshabilitacionRoutingModule } from './route/programacion-deshabilitacion-routing.module';

@NgModule({
  imports: [SharedModule, ProgramacionDeshabilitacionRoutingModule],
  declarations: [
    ProgramacionDeshabilitacionComponent,
    ProgramacionDeshabilitacionDetailComponent,
    ProgramacionDeshabilitacionUpdateComponent,
    ProgramacionDeshabilitacionDeleteDialogComponent,
  ],
  entryComponents: [ProgramacionDeshabilitacionDeleteDialogComponent],
})
export class ProgramacionDeshabilitacionModule {}
