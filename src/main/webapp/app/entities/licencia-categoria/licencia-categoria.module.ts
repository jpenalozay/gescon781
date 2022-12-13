import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LicenciaCategoriaComponent } from './list/licencia-categoria.component';
import { LicenciaCategoriaDetailComponent } from './detail/licencia-categoria-detail.component';
import { LicenciaCategoriaUpdateComponent } from './update/licencia-categoria-update.component';
import { LicenciaCategoriaDeleteDialogComponent } from './delete/licencia-categoria-delete-dialog.component';
import { LicenciaCategoriaRoutingModule } from './route/licencia-categoria-routing.module';

@NgModule({
  imports: [SharedModule, LicenciaCategoriaRoutingModule],
  declarations: [
    LicenciaCategoriaComponent,
    LicenciaCategoriaDetailComponent,
    LicenciaCategoriaUpdateComponent,
    LicenciaCategoriaDeleteDialogComponent,
  ],
  entryComponents: [LicenciaCategoriaDeleteDialogComponent],
})
export class LicenciaCategoriaModule {}
