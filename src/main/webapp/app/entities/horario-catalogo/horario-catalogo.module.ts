import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HorarioCatalogoComponent } from './list/horario-catalogo.component';
import { HorarioCatalogoDetailComponent } from './detail/horario-catalogo-detail.component';
import { HorarioCatalogoUpdateComponent } from './update/horario-catalogo-update.component';
import { HorarioCatalogoDeleteDialogComponent } from './delete/horario-catalogo-delete-dialog.component';
import { HorarioCatalogoRoutingModule } from './route/horario-catalogo-routing.module';

@NgModule({
  imports: [SharedModule, HorarioCatalogoRoutingModule],
  declarations: [
    HorarioCatalogoComponent,
    HorarioCatalogoDetailComponent,
    HorarioCatalogoUpdateComponent,
    HorarioCatalogoDeleteDialogComponent,
  ],
  entryComponents: [HorarioCatalogoDeleteDialogComponent],
})
export class HorarioCatalogoModule {}
