import { NgModule } from '@angular/core';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoInscripcionComponent } from './inscripcion/alumno-inscripcion.component';
import { SharedModule } from 'app/shared/shared.module';
import { ComponentesModule } from 'app/comps/componentes.module';
import { ProgramacionPracticaComponent } from './practica/programacion-practica.component';
import { PagoComponent } from './pago/pago.component';
import { Pago1Component } from './pago1/pago1.component';
import { InfoComponent } from './info/info.component';

//import {NgForm} from '@angular/forms';

@NgModule({
  declarations: [AlumnoInscripcionComponent, ProgramacionPracticaComponent, PagoComponent, Pago1Component, InfoComponent],
  imports: [SharedModule, AlumnoRoutingModule, ComponentesModule],
})
export class AlumnoModule {}
