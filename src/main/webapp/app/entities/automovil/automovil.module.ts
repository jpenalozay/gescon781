import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AutomovilComponent } from './list/automovil.component';
import { AutomovilDetailComponent } from './detail/automovil-detail.component';
import { AutomovilUpdateComponent } from './update/automovil-update.component';
import { AutomovilDeleteDialogComponent } from './delete/automovil-delete-dialog.component';
import { AutomovilRoutingModule } from './route/automovil-routing.module';

@NgModule({
  imports: [SharedModule, AutomovilRoutingModule],
  declarations: [AutomovilComponent, AutomovilDetailComponent, AutomovilUpdateComponent, AutomovilDeleteDialogComponent],
  entryComponents: [AutomovilDeleteDialogComponent],
})
export class AutomovilModule {}
