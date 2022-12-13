import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuario',
        data: { pageTitle: 'gesconApp.usuario.home.title' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'computadora',
        data: { pageTitle: 'gesconApp.computadora.home.title' },
        loadChildren: () => import('./computadora/computadora.module').then(m => m.ComputadoraModule),
      },
      {
        path: 'fecha',
        data: { pageTitle: 'gesconApp.fecha.home.title' },
        loadChildren: () => import('./fecha/fecha.module').then(m => m.FechaModule),
      },
      {
        path: 'distrit',
        data: { pageTitle: 'gesconApp.distrit.home.title' },
        loadChildren: () => import('./distrit/distrit.module').then(m => m.DistritModule),
      },
      {
        path: 'licencia-categoria',
        data: { pageTitle: 'gesconApp.licenciaCategoria.home.title' },
        loadChildren: () => import('./licencia-categoria/licencia-categoria.module').then(m => m.LicenciaCategoriaModule),
      },
      {
        path: 'sucursal',
        data: { pageTitle: 'gesconApp.sucursal.home.title' },
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule),
      },
      {
        path: 'sucursal-serie',
        data: { pageTitle: 'gesconApp.sucursalSerie.home.title' },
        loadChildren: () => import('./sucursal-serie/sucursal-serie.module').then(m => m.SucursalSerieModule),
      },
      {
        path: 'area',
        data: { pageTitle: 'gesconApp.area.home.title' },
        loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
      },
      {
        path: 'cargo',
        data: { pageTitle: 'gesconApp.cargo.home.title' },
        loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule),
      },
      {
        path: 'persona',
        data: { pageTitle: 'gesconApp.persona.home.title' },
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule),
      },
      {
        path: 'empleado',
        data: { pageTitle: 'gesconApp.empleado.home.title' },
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
      },
      {
        path: 'profesor',
        data: { pageTitle: 'gesconApp.profesor.home.title' },
        loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorModule),
      },
      {
        path: 'curso',
        data: { pageTitle: 'gesconApp.curso.home.title' },
        loadChildren: () => import('./curso/curso.module').then(m => m.CursoModule),
      },
      {
        path: 'asignatura',
        data: { pageTitle: 'gesconApp.asignatura.home.title' },
        loadChildren: () => import('./asignatura/asignatura.module').then(m => m.AsignaturaModule),
      },
      {
        path: 'asignatura-adiciones',
        data: { pageTitle: 'gesconApp.asignaturaAdiciones.home.title' },
        loadChildren: () => import('./asignatura-adiciones/asignatura-adiciones.module').then(m => m.AsignaturaAdicionesModule),
      },
      {
        path: 'teoria',
        data: { pageTitle: 'gesconApp.teoria.home.title' },
        loadChildren: () => import('./teoria/teoria.module').then(m => m.TeoriaModule),
      },
      {
        path: 'teoria-horario-catalogo',
        data: { pageTitle: 'gesconApp.teoriaHorarioCatalogo.home.title' },
        loadChildren: () => import('./teoria-horario-catalogo/teoria-horario-catalogo.module').then(m => m.TeoriaHorarioCatalogoModule),
      },
      {
        path: 'asignatura-requisito',
        data: { pageTitle: 'gesconApp.asignaturaRequisito.home.title' },
        loadChildren: () => import('./asignatura-requisito/asignatura-requisito.module').then(m => m.AsignaturaRequisitoModule),
      },
      {
        path: 'automovil',
        data: { pageTitle: 'gesconApp.automovil.home.title' },
        loadChildren: () => import('./automovil/automovil.module').then(m => m.AutomovilModule),
      },
      {
        path: 'alumno',
        data: { pageTitle: 'gesconApp.alumno.home.title' },
        loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoModule),
      },
      {
        path: 'alumno-usuario',
        data: { pageTitle: 'gesconApp.alumnoUsuario.home.title' },
        loadChildren: () => import('./alumno-usuario/alumno-usuario.module').then(m => m.AlumnoUsuarioModule),
      },
      {
        path: 'alumno-categoria',
        data: { pageTitle: 'gesconApp.alumnoCategoria.home.title' },
        loadChildren: () => import('./alumno-categoria/alumno-categoria.module').then(m => m.AlumnoCategoriaModule),
      },
      {
        path: 'alumno-clases',
        data: { pageTitle: 'gesconApp.alumnoClases.home.title' },
        loadChildren: () => import('./alumno-clases/alumno-clases.module').then(m => m.AlumnoClasesModule),
      },
      {
        path: 'inscripcion',
        data: { pageTitle: 'gesconApp.inscripcion.home.title' },
        loadChildren: () => import('./inscripcion/inscripcion.module').then(m => m.InscripcionModule),
      },
      {
        path: 'inscripcion-detalle',
        data: { pageTitle: 'gesconApp.inscripcionDetalle.home.title' },
        loadChildren: () => import('./inscripcion-detalle/inscripcion-detalle.module').then(m => m.InscripcionDetalleModule),
      },
      {
        path: 'inscripcion-pago',
        data: { pageTitle: 'gesconApp.inscripcionPago.home.title' },
        loadChildren: () => import('./inscripcion-pago/inscripcion-pago.module').then(m => m.InscripcionPagoModule),
      },
      {
        path: 'requisitos-inscripcion',
        data: { pageTitle: 'gesconApp.requisitosInscripcion.home.title' },
        loadChildren: () => import('./requisitos-inscripcion/requisitos-inscripcion.module').then(m => m.RequisitosInscripcionModule),
      },
      {
        path: 'inscripcion-adicional',
        data: { pageTitle: 'gesconApp.inscripcionAdicional.home.title' },
        loadChildren: () => import('./inscripcion-adicional/inscripcion-adicional.module').then(m => m.InscripcionAdicionalModule),
      },
      {
        path: 'inscripcion-descuento',
        data: { pageTitle: 'gesconApp.inscripcionDescuento.home.title' },
        loadChildren: () => import('./inscripcion-descuento/inscripcion-descuento.module').then(m => m.InscripcionDescuentoModule),
      },
      {
        path: 'alumno-desarrollo',
        data: { pageTitle: 'gesconApp.alumnoDesarrollo.home.title' },
        loadChildren: () => import('./alumno-desarrollo/alumno-desarrollo.module').then(m => m.AlumnoDesarrolloModule),
      },
      {
        path: 'dia',
        data: { pageTitle: 'gesconApp.dia.home.title' },
        loadChildren: () => import('./dia/dia.module').then(m => m.DiaModule),
      },
      {
        path: 'horario-catalogo',
        data: { pageTitle: 'gesconApp.horarioCatalogo.home.title' },
        loadChildren: () => import('./horario-catalogo/horario-catalogo.module').then(m => m.HorarioCatalogoModule),
      },
      {
        path: 'programacion',
        data: { pageTitle: 'gesconApp.programacion.home.title' },
        loadChildren: () => import('./programacion/programacion.module').then(m => m.ProgramacionModule),
      },
      {
        path: 'programacion-deshabilitacion',
        data: { pageTitle: 'gesconApp.programacionDeshabilitacion.home.title' },
        loadChildren: () =>
          import('./programacion-deshabilitacion/programacion-deshabilitacion.module').then(m => m.ProgramacionDeshabilitacionModule),
      },
      {
        path: 'horario',
        data: { pageTitle: 'gesconApp.horario.home.title' },
        loadChildren: () => import('./horario/horario.module').then(m => m.HorarioModule),
      },
      {
        path: 'horario-deshabilitacion',
        data: { pageTitle: 'gesconApp.horarioDeshabilitacion.home.title' },
        loadChildren: () => import('./horario-deshabilitacion/horario-deshabilitacion.module').then(m => m.HorarioDeshabilitacionModule),
      },
      {
        path: 'inscripcion-asignatura-requisito',
        data: { pageTitle: 'gesconApp.inscripcionAsignaturaRequisito.home.title' },
        loadChildren: () =>
          import('./inscripcion-asignatura-requisito/inscripcion-asignatura-requisito.module').then(
            m => m.InscripcionAsignaturaRequisitoModule
          ),
      },
      {
        path: 'lugar-salida',
        data: { pageTitle: 'gesconApp.lugarSalida.home.title' },
        loadChildren: () => import('./lugar-salida/lugar-salida.module').then(m => m.LugarSalidaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
