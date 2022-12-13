import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TeoriaHorarioCatalogoComponent } from './list/teoria-horario-catalogo.component';
import { TeoriaHorarioCatalogoDetailComponent } from './detail/teoria-horario-catalogo-detail.component';
import { TeoriaHorarioCatalogoUpdateComponent } from './update/teoria-horario-catalogo-update.component';
import { TeoriaHorarioCatalogoDeleteDialogComponent } from './delete/teoria-horario-catalogo-delete-dialog.component';
import { TeoriaHorarioCatalogoRoutingModule } from './route/teoria-horario-catalogo-routing.module';

@NgModule({
  imports: [SharedModule, TeoriaHorarioCatalogoRoutingModule],
  declarations: [
    TeoriaHorarioCatalogoComponent,
    TeoriaHorarioCatalogoDetailComponent,
    TeoriaHorarioCatalogoUpdateComponent,
    TeoriaHorarioCatalogoDeleteDialogComponent,
  ],
  entryComponents: [TeoriaHorarioCatalogoDeleteDialogComponent],
})
export class TeoriaHorarioCatalogoModule {}
