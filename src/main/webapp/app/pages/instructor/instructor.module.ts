import { NgModule } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { InstructorRoutingModule } from './instructor-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ComponentesModule } from 'app/comps/componentes.module';
import { InstructorPracticasRegistroComponent } from './practicas/instructor-practicas-registro.component';
import { InstructorSeguimientoComponent } from './seguimiento/instructor-seguimiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarPopupComponent } from './seguimiento/editar-popup.component';

@NgModule({
  declarations: [InstructorPracticasRegistroComponent, InstructorSeguimientoComponent, EditarPopupComponent],
  imports: [SharedModule, ComponentesModule, InstructorRoutingModule, ReactiveFormsModule, NgbAccordionModule],
})
export class InstructorModule {}
