import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { CommonValidateService, INumberStringPair } from 'app/core/service/common-validate.service';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { SucursalSerieService } from 'app/entities/sucursal-serie/service/sucursal-serie.service';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import dayjs, { Dayjs } from 'dayjs/esm';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InscripcionPagoService } from 'app/entities/inscripcion-pago/service/inscripcion-pago.service';
import { InscripcionDetalleService } from 'app/entities/inscripcion-detalle/service/inscripcion-detalle.service';
import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { IInscripcionPago } from 'app/entities/inscripcion-pago/inscripcion-pago.model';
import { AsignaturaService } from 'app/entities/asignatura/service/asignatura.service';

interface IHistorial {
  id: number;
  incripcion: string;
  estado: string;
  fecha: Dayjs;
  monto: number;
  Local: string;
  documento: string;
  numero: string;
}

@Component({
  selector: 'jhi-pago',
  templateUrl: './pago1.component.html',
})
export class Pago1Component implements OnInit {
  formEntity: FormGroup = {} as FormGroup;
  filterAlumno = '';
  selAlumno: IAlumno = {} as IAlumno;
  cacheAlumnos: INumberStringPair[] = [];
  isDisable = true;
  alumnoId = 0;
  account: Account = {} as Account;
  sysAccount: Account = {} as Account;
  cacheSucursales: ISucursal[] = [];
  selSucursalId?: number;
  cacheSucursalSeries: ISucursalSerie[] = [];
  cacheSucursalSeriesMap: Map<TipoDocumentoVenta, ISucursalSerie[]> = new Map<TipoDocumentoVenta, ISucursalSerie[]>();
  cacheSucursalSeriesTipos: string[] = [];
  cacheSucursalSeriesSerie: ISucursalSerie[] = [];
  selSucursalSerieId?: number;
  document?: IInscripcion;
  tipoDoc = '';
  serieDoc = '';
  cacheHistorial: IHistorial[] = [];
  pagosAlumno = 0;
  cachePagoHistorial: IInscripcionPago[] = [];
  debe = 0;
  isCollapsed = true;

  constructor(
    private serviceCommon: CommonValidateService,
    private serviceAccount: AccountService,
    private serviceUser: UserService,
    private serviceUsuario: UsuarioService,
    private serviceSucursalSerie: SucursalSerieService,
    private modalService: NgbModal,
    private serviceInsPago: InscripcionPagoService,
    private serviceInsDetail: InscripcionDetalleService,
    private serviceAsignatura: AsignaturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.serviceAccount.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
    this.serviceAccount.getAuthenticationState().subscribe((resp: Account | null) => {
      if (resp) {
        this.sysAccount = resp;

        this.serviceUser.query().subscribe({
          next: (respUsers: HttpResponse<IUser[]>) => {
            const users: IUser[] = respUsers.body ?? [];
            users.forEach((user: IUser) => {
              if (resp.login === user.login) {
                this.serviceUsuario.query({ 'userId.equals': user.id! }).subscribe({
                  next: (respUsuario: HttpResponse<IUsuario[]>) => {
                    respUsuario.body?.some((usuario: IUsuario) => {
                      this.serviceUsuario.find(usuario.id!).subscribe({
                        next: (respUsuarioLoad: HttpResponse<IUsuario>) => {
                          const sucursalIds: number[] = [];
                          const sucursales = respUsuarioLoad.body!.sucursals ?? [];

                          this.cacheSucursales = this.doFilter(sucursales, (row: ISucursal) => row.activo === Estado.HABILITADO);
                          this.cacheSucursales.forEach((sucursal: ISucursal) => {
                            sucursalIds.push(sucursal.id!);
                          });
                          if (sucursalIds.length > 0) {
                            this.serviceSucursalSerie
                              .query({ 'activo.equals': Estado.HABILITADO, 'sucursalId.in': sucursalIds })
                              .subscribe({
                                next: (respSeries: HttpResponse<ISucursalSerie[]>) => {
                                  const series: ISucursalSerie[] = respSeries.body ?? [];

                                  if (series.length > 0) {
                                    this.selSucursalId = series[0].sucursal?.id;
                                    this.onSucursalSel();
                                  }
                                },
                              });
                          }
                        },
                      });
                      return true;
                    });
                  },
                });
              }
            });
          },
        });
      }
    });
  }

  buildForm(): void {
    this.formEntity = this.formBuilder.group(
      {
        filtroAlumno: [''],
        personaCodigo: [''],
        alumnoCodigo: [this.selAlumno.codigo],
        alumnoDni: [this.selAlumno.persona?.numeroDocumento],
        alumnoEstado: [''],
        alumnoNombres: [this.selAlumno.persona?.nombres],
        alumnoApellidos: [this.getAlumnoApellidos()],
        alumnoCurso: [this.getAlumnoCurso()],
        alumnoAsignatura: [this.getAlumnoAsignatura()],
        alumnoClasesTotales: [this.getAlumnoClases()],
        alumnoClasesProgramadas: [this.getAlumnoClasesAsignadas()],
        alumnoClasesAsistidas: ['0'],
        alumnoTotal: [this.getAlumnTotal()],
        alumnoDebe: [this.getAlumnoDebe()],
        insDescuentoDesc: [''],
        insDescuentoMont: [''],
        selSucursalId: [''],
        selSucursalSerieId: [''],
        incripcionNumero: [''],
        incripcionPagoDebe: [''],
        incripcionPagoMonto: ['0', [Validators.required, Validators.min(1)]],
      },
      {
        updateOn: 'change',
      }
    );
  }

  doFilterPressKey(): void {
    this.selAlumno = {};
    this.cacheAlumnos = [];
    this.isDisable = true;
    this.filterAlumno = this.formEntity.controls.filtroAlumno.value;

    if (this.filterAlumno.length < 2) {
      return;
    }

    this.filterAlumno = this.filterAlumno.toUpperCase();

    this.serviceCommon.doFindAlumnos(this.filterAlumno).subscribe({
      next: (resp: HttpResponse<INumberStringPair[]>) => {
        this.cacheAlumnos = resp.body ?? [];
        this.cacheAlumnos.forEach((value: INumberStringPair) => {
          value.value = `${this.filterAlumno} - ${value.value!}`;
          value.key = value.key!;
          this.alumnoId = value.key;
        });
      },
    });
  }

  doFilter<T>(values: T[], fnEval: (row: T) => boolean): T[] {
    const result: T[] = [];

    values.forEach((row: T) => {
      if (fnEval(row)) {
        result.push(row);
      }
    });
    return result;
  }

  onSucursalSel(): void {
    this.cacheSucursalSeries = [];
    this.cacheSucursalSeriesMap.clear();
    this.cacheSucursalSeriesTipos = [];
    this.cacheSucursalSeriesSerie = [];
    this.selSucursalSerieId = 0;
    //this.document!.codigo = '';

    this.serviceSucursalSerie.query({ 'sucursalId.equals': this.selSucursalId, 'activo.equals': 'HABILITADO' }).subscribe({
      next: (res: HttpResponse<ISucursalSerie[]>) => {
        const mapTipo = this.cacheSucursalSeriesMap;
        let series: ISucursalSerie[];

        this.cacheSucursalSeries = res.body ?? [];
        this.cacheSucursalSeries.forEach((ss: ISucursalSerie) => {
          if (!mapTipo.has(ss.tipoDocumento!)) {
            series = [];
            mapTipo.set(ss.tipoDocumento!, series);
          } else {
            series = mapTipo.get(ss.tipoDocumento!)!;
          }
          series.push(ss);
        });
        this.cacheSucursalSeriesTipos = Array.from(this.cacheSucursalSeriesMap.keys());
        if (this.cacheSucursalSeriesTipos.length > 0) {
          this.onSucursalTipoSel({ target: { value: this.cacheSucursalSeriesTipos[0] } });
        }
      },
    });
  }

  onSucursalTipoSel(event: any): void {
    this.cacheSucursalSeriesSerie = [];
    this.selSucursalSerieId = 0;
    //this.document!.codigo = '';
    if (event.target.value) {
      if (this.cacheSucursalSeriesMap.has(event.target.value)) {
        this.tipoDoc = String(event.target.value);
        this.cacheSucursalSeriesSerie = this.cacheSucursalSeriesMap.get(event.target.value)!;
        if (this.cacheSucursalSeriesSerie.length > 0) {
          this.selSucursalSerieId = this.cacheSucursalSeriesSerie[0].id;
          this.onSucursalSerieSel();
        }
      }
    }
  }

  onSucursalSerieSel(): void {
    this.cacheSucursalSeriesSerie.some((serie: ISucursalSerie) => {
      if (serie.id === this.selSucursalSerieId) {
        this.serieDoc = String(serie.serie);
        //this.document!.codigo = `${serie.numeroUltimo! + 1}`;
        //this.document!.numeroDocumento = serie.numeroUltimo;
        return true;
      }
      return false;
    });
  }

  doAlumnoSel(): void {
    this.selAlumno = {};
    if (!this.filterAlumno) {
      return;
    }
    const regex = this.filterAlumno.match(/\[(.*?)\]/);
    if (!regex || regex.length < 2) {
      return;
    }
    this.doAlumnoLoad(regex[1]);
  }

  doAlumnoLoad(alumnoCodigo: string): void {
    this.cacheHistorial = [];
    this.pagosAlumno = 0;
    this.serviceCommon.getAlumnoFullLoad(alumnoCodigo).subscribe((resp: HttpResponse<IAlumno>) => {
      const alumno: IAlumno = resp.body!;
      this.selAlumno = alumno;
      alumno.inscripcions!.forEach((inscrip: IInscripcion) => {
        inscrip.inscripcionDetalles = [];
        inscrip.inscripcionPagos = [];
        this.serviceInsDetail
          .query({ 'inscripcionId.equals': inscrip.id })
          .subscribe((respInscrip: HttpResponse<IInscripcionDetalle[]>) => {
            inscrip.inscripcionDetalles = respInscrip.body ?? [];
            inscrip.inscripcionDetalles.forEach((inscripDet: IInscripcionDetalle) => {
              this.serviceAsignatura.find(inscripDet.asignatura!.id!).subscribe((respAsig: HttpResponse<IAsignatura>) => {
                inscripDet.asignatura = respAsig.body!;
                this.buildForm();
              });
            });
          });
        this.serviceInsPago.query({ 'inscripcionId.equals': inscrip.id }).subscribe((respInscrip: HttpResponse<IInscripcionPago[]>) => {
          inscrip.inscripcionPagos = respInscrip.body ?? [];
          this.cachePagoHistorial = inscrip.inscripcionPagos;
          let idh = 1;
          inscrip.inscripcionPagos.forEach((inscripPago: IInscripcionPago) => {
            this.pagosAlumno = this.pagosAlumno + inscripPago.monto!;
            this.isDisable = false;
            const historial2: IHistorial = {} as IHistorial;
            historial2.id = idh;
            historial2.incripcion = inscrip.codigo!;
            historial2.estado = inscripPago.estadoServicio!;
            historial2.fecha = inscripPago.fecha!;
            historial2.monto = inscripPago.monto!;
            //historial2.Local = inscripPago.serie!.sucursal!.nombre!;
            historial2.documento = inscripPago.serie!.tipoDocumento!;
            historial2.numero = String(inscripPago.serie!.serie) + ' - ' + String(inscripPago.numeroDocumento!);
            this.cacheHistorial.push(historial2);
            idh = idh + 1;
          });
        });
      });
    });
  }

  getAlumnoApellidos(): string {
    if (this.selAlumno.persona) {
      return this.selAlumno.persona.apellidoPaterno! + ' ' + this.selAlumno.persona.apellidoMaterno!;
    } else {
      return '';
    }
  }

  getAlumnoCurso(): string {
    let response = '';
    if (this.selAlumno.inscripcions) {
      this.selAlumno.inscripcions.forEach((inscrip: IInscripcion) => {
        inscrip.inscripcionDetalles?.forEach((inscripDet: IInscripcionDetalle) => {
          if (inscripDet.asignatura?.curso) {
            response = inscripDet.asignatura.curso.nombre!;
          }
        });
      });
    }
    return response;
  }

  getAlumnoAsignatura(): string {
    let response = '';
    if (this.selAlumno.inscripcions) {
      this.selAlumno.inscripcions.forEach((inscrip: IInscripcion) => {
        inscrip.inscripcionDetalles?.forEach((inscripDet: IInscripcionDetalle) => {
          if (inscripDet.asignatura) {
            response = inscripDet.asignatura.nombre!;
          }
        });
      });
    }
    return response;
  }

  getAlumnoClases(): number {
    let clases = 0;
    if (this.selAlumno.alumnoClases) {
      clases = this.selAlumno.alumnoClases.clasesTotales!;
    }
    return clases;
  }

  getAlumnoClasesAsignadas(): number {
    let clases = 0;
    if (this.selAlumno.alumnoClases) {
      clases = this.selAlumno.alumnoClases.clasesProgramadas!;
    }
    return clases;
  }

  getAlumnTotal(): number {
    let total = 0;
    if (this.selAlumno.inscripcions) {
      this.selAlumno.inscripcions.forEach((inscrip: IInscripcion) => {
        total = inscrip.costoTotal!;
      });
    }
    return total;
  }

  getAlumnoDebe(): number {
    let debe = 0;
    if (this.selAlumno.id) {
      debe = this.getAlumnTotal() - this.pagosAlumno;
      this.debe = debe;
    } else {
      return debe;
    }
    return debe;
  }
}
