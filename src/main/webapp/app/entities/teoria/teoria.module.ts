import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TeoriaComponent } from './list/teoria.component';
import { TeoriaDetailComponent } from './detail/teoria-detail.component';
import { TeoriaUpdateComponent } from './update/teoria-update.component';
import { TeoriaDeleteDialogComponent } from './delete/teoria-delete-dialog.component';
import { TeoriaRoutingModule } from './route/teoria-routing.module';

@NgModule({
  imports: [SharedModule, TeoriaRoutingModule],
  declarations: [TeoriaComponent, TeoriaDetailComponent, TeoriaUpdateComponent, TeoriaDeleteDialogComponent],
  entryComponents: [TeoriaDeleteDialogComponent],
})
export class TeoriaModule {}
