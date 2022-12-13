import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DiaComponent } from './list/dia.component';
import { DiaDetailComponent } from './detail/dia-detail.component';
import { DiaUpdateComponent } from './update/dia-update.component';
import { DiaDeleteDialogComponent } from './delete/dia-delete-dialog.component';
import { DiaRoutingModule } from './route/dia-routing.module';

@NgModule({
  imports: [SharedModule, DiaRoutingModule],
  declarations: [DiaComponent, DiaDetailComponent, DiaUpdateComponent, DiaDeleteDialogComponent],
  entryComponents: [DiaDeleteDialogComponent],
})
export class DiaModule {}
