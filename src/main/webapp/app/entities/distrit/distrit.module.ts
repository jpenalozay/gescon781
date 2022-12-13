import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DistritComponent } from './list/distrit.component';
import { DistritDetailComponent } from './detail/distrit-detail.component';
import { DistritRoutingModule } from './route/distrit-routing.module';

@NgModule({
  imports: [SharedModule, DistritRoutingModule],
  declarations: [DistritComponent, DistritDetailComponent],
})
export class DistritModule {}
