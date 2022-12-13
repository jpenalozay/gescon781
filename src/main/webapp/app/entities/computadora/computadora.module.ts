import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComputadoraComponent } from './list/computadora.component';
import { ComputadoraDetailComponent } from './detail/computadora-detail.component';
import { ComputadoraUpdateComponent } from './update/computadora-update.component';
import { ComputadoraDeleteDialogComponent } from './delete/computadora-delete-dialog.component';
import { ComputadoraRoutingModule } from './route/computadora-routing.module';

@NgModule({
  imports: [SharedModule, ComputadoraRoutingModule],
  declarations: [ComputadoraComponent, ComputadoraDetailComponent, ComputadoraUpdateComponent, ComputadoraDeleteDialogComponent],
  entryComponents: [ComputadoraDeleteDialogComponent],
})
export class ComputadoraModule {}
