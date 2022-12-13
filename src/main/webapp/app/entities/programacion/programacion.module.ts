import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProgramacionComponent } from './list/programacion.component';
import { ProgramacionDetailComponent } from './detail/programacion-detail.component';
import { ProgramacionUpdateComponent } from './update/programacion-update.component';
import { ProgramacionDeleteDialogComponent } from './delete/programacion-delete-dialog.component';
import { ProgramacionRoutingModule } from './route/programacion-routing.module';

@NgModule({
  imports: [SharedModule, ProgramacionRoutingModule],
  declarations: [ProgramacionComponent, ProgramacionDetailComponent, ProgramacionUpdateComponent, ProgramacionDeleteDialogComponent],
  entryComponents: [ProgramacionDeleteDialogComponent],
})
export class ProgramacionModule {}
