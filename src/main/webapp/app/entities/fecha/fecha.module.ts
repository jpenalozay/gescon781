import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FechaComponent } from './list/fecha.component';
import { FechaDetailComponent } from './detail/fecha-detail.component';
import { FechaRoutingModule } from './route/fecha-routing.module';

@NgModule({
  imports: [SharedModule, FechaRoutingModule],
  declarations: [FechaComponent, FechaDetailComponent],
})
export class FechaModule {}
