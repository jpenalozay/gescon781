import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LugarSalidaComponent } from './list/lugar-salida.component';
import { LugarSalidaDetailComponent } from './detail/lugar-salida-detail.component';
import { LugarSalidaUpdateComponent } from './update/lugar-salida-update.component';
import { LugarSalidaDeleteDialogComponent } from './delete/lugar-salida-delete-dialog.component';
import { LugarSalidaRoutingModule } from './route/lugar-salida-routing.module';

@NgModule({
  imports: [SharedModule, LugarSalidaRoutingModule],
  declarations: [LugarSalidaComponent, LugarSalidaDetailComponent, LugarSalidaUpdateComponent, LugarSalidaDeleteDialogComponent],
  entryComponents: [LugarSalidaDeleteDialogComponent],
})
export class LugarSalidaModule {}
