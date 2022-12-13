import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AlumnoCategoriaComponent } from './list/alumno-categoria.component';
import { AlumnoCategoriaDetailComponent } from './detail/alumno-categoria-detail.component';
import { AlumnoCategoriaUpdateComponent } from './update/alumno-categoria-update.component';
import { AlumnoCategoriaDeleteDialogComponent } from './delete/alumno-categoria-delete-dialog.component';
import { AlumnoCategoriaRoutingModule } from './route/alumno-categoria-routing.module';

@NgModule({
  imports: [SharedModule, AlumnoCategoriaRoutingModule],
  declarations: [
    AlumnoCategoriaComponent,
    AlumnoCategoriaDetailComponent,
    AlumnoCategoriaUpdateComponent,
    AlumnoCategoriaDeleteDialogComponent,
  ],
  entryComponents: [AlumnoCategoriaDeleteDialogComponent],
})
export class AlumnoCategoriaModule {}
