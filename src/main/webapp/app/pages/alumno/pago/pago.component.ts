import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogoConfirmarComponent } from 'app/comps/dialogos/dialogo-confirmar.component';
import { DialogoInfoComponent } from 'app/comps/dialogos/dialogo-info.component';
import { DialogoValidarUsuarioComponent } from 'app/comps/dialogos/dialogo-validar-usuario.component';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { CommonValidateService, INumberStringPair } from 'app/core/service/common-validate.service';
import { Alumno, IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { AlumnoEstado } from 'app/entities/enumerations/alumno-estado.model';
import { Estado } from 'app/entities/enumerations/estado.model';
import { InscripcionEstado } from 'app/entities/enumerations/inscripcion-estado.model';
import { InscripcionFormaPago } from 'app/entities/enumerations/inscripcion-forma-pago.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';
import { IInscripcionDescuento, InscripcionDescuento } from 'app/entities/inscripcion-descuento/inscripcion-descuento.model';
import { IInscripcionDetalle, InscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { IInscripcionPago, InscripcionPago } from 'app/entities/inscripcion-pago/inscripcion-pago.model';
import { IInscripcion, Inscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { IPersona, Persona } from 'app/entities/persona/persona.model';
import { IRequisitosInscripcion } from 'app/entities/requisitos-inscripcion/requisitos-inscripcion.model';
import { SucursalSerieService } from 'app/entities/sucursal-serie/service/sucursal-serie.service';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import dayjs, { Dayjs } from 'dayjs/esm';
import { IAsignaturaAdiciones } from 'app/entities/asignatura-adiciones/asignatura-adiciones.model';
import { InscripcionDetalleService } from 'app/entities/inscripcion-detalle/service/inscripcion-detalle.service';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { AsignaturaService } from 'app/entities/asignatura/service/asignatura.service';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { InscripcionPagoService } from 'app/entities/inscripcion-pago/service/inscripcion-pago.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
})
export class PagoComponent implements OnInit {
  title = 'Registro Pago Alumno';
  account?: Account;
  cacheSucursales: ISucursal[] = [];
  cacheSucursalSeries: ISucursalSerie[] = [];
  cacheSucursalSeriesMap: Map<TipoDocumentoVenta, ISucursalSerie[]> = new Map<TipoDocumentoVenta, ISucursalSerie[]>();
  cacheSucursalSeriesTipos: string[] = [];
  cacheSucursalSeriesSerie: ISucursalSerie[] = [];
  cacheInscripcionPago: IInscripcionPago[] = [];
  cachePagoHistorial: IInscripcionPago[] = [];
  historial1: IHistorial = {} as IHistorial;
  cacheHistorial: IHistorial[] = [];
  document?: IInscripcion;
  insc?: Inscripcion[];
  documentAsig?: IInscripcionDetalle;
  documentDescuento: IInscripcionDescuento = new InscripcionDescuento();
  documentPago = new InscripcionPago();
  selReqInscripciones: IRequisitosInscripcion[] = [];
  selPersona: IPersona = new Persona();
  selAlumno: IAlumno = new Alumno();
  pagosAlumno = 0;
  selSucursalId?: number;
  selSucursalSerieId?: number;
  selAdminJwt = '';
  selAsignatura = 'navAsignaturas0';
  fechaActual = new Date();
  fechaActual1 = dayjs();
  codigoAlumno = '';
  inscripcionId = 0;
  inscriEstado = '';
  tipoDoc = '';
  serieDoc = '';
  numeroDoc = 0;
  montoPago = 0;
  subTotalAdicional = '';
  formEntity: FormGroup = {} as FormGroup;
  sysAccount?: Account;
  SiNo = SiNo;
  cacheAsignaturaAdds: IAsignaturaAdiciones[] = [];
  alumnoId = 0;
  filterAlumno = '';
  cacheAlumnos: INumberStringPair[] = [];
  isDisable = true;
  isCollapsed = true;
  debe = 0;
  
  constructor(
    private serviceAlumno: AlumnoService,
    private serviceSucursalSerie: SucursalSerieService,
    private serviceCommon: CommonValidateService,
    private serviceUsuario: UsuarioService,
    private serviceAccount: AccountService,
    private serviceUser: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private serviceInscripcion: InscripcionService,
    private serviceInsDetail: InscripcionDetalleService,
    private serviceInsPago: InscripcionPagoService,
    private serviceAsignatura: AsignaturaService
  ) {}

  ngOnInit(): void {
    this.doInit();
    this.documentAsig = new InscripcionDetalle();
    this.documentPago = new InscripcionPago();
    this.document = new Inscripcion();
    this.document.inscripcionDetalles = [this.documentAsig];
    this.document.inscripcionPagos = [this.documentPago];
    this.documentDescuento = new InscripcionDescuento();
    this.documentDescuento.monto = 0;
    this.documentPago.monto = 0;

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
    this.formEntity = this.formBuilder.group({
      filterAlumno: [''],
      personaCodigo: [''],
      alumnoCodigo: [''],
      alumnoEstado: [''],
      fechaInicio: [''],
      horario: [''],
      insDescuentoDesc: [''],
      insDescuentoMont: [''],
      selSucursalId: [''],
      selSucursalSerieId: [''],
      incripcionNumero: [''],
      incripcionPagoDebe: [''],
      incripcionPagoMonto: ['0', [Validators.required, Validators.min(1)]],
    });
  }

  isAdminRole(values: string[]): boolean {
    const evalRol: boolean = values.some((value: string) => {
      if (value === 'ROL_ADMINISTRADOR' || value === 'ROLE_ADMIN') {
        return true;
      }
      return false;
    });

    return evalRol;
  }

  getMonto(): boolean {
    if (this.documentPago.monto === 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalPrev(): number {
    let total = 0;
    let asignaturaCosto = 0;

    if (this.documentAsig?.asignatura?.costo) {
      asignaturaCosto = this.documentAsig.asignatura.costo;
    }

    total = asignaturaCosto + this.documentDescuento.monto!;
    return total;
  }

  getTotalPrevTotal(): number {
    let total = 0;
    let asignaturaCosto = 0;

    if (this.documentAsig?.asignatura?.costo) {
      asignaturaCosto = this.documentAsig.asignatura.costo;
    }

    total = asignaturaCosto;
    return total;
  }

  getTotalDoc(): number {
    let total = 0;

    total = this.getAlumnTotal() - (this.documentPago.monto ?? 0);
    return total;
  }

  getTotalTotal(): number {
    let totalTotal = 0;

    totalTotal = this.getTotalPrev();
    return totalTotal;
  }

  getSaldo(): number {
    let totalTotal = 0;

    totalTotal = this.getAlumnoDebe() - (this.documentPago.monto ?? 0);
    return totalTotal;
  }

  onSucursalSel(): void {
    this.cacheSucursalSeries = [];
    this.cacheSucursalSeriesMap.clear();
    this.cacheSucursalSeriesTipos = [];
    this.cacheSucursalSeriesSerie = [];
    this.selSucursalSerieId = 0;
    this.document!.codigo = '';

    this.serviceSucursalSerie.query({ 'sucursalId.equals': this.selSucursalId, 'activo.equals': 'HABILITADO' }).subscribe({
      next: (res: HttpResponse<IAsignaturaAdiciones[]>) => {
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
    this.document!.codigo = '';

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
        this.document!.codigo = `${serie.numeroUltimo! + 1}`;
        this.numeroDoc = serie.numeroUltimo!;
        return true;
      }

      return false;
    });
  }

  doPersonaFind(): void {
    const personaCodigo = this.formEntity.controls.personaCodigo.value;

    this.selPersona = new Persona();
    this.selAlumno = new Alumno(0);

    if (!personaCodigo) {
      return;
    }
    this.serviceCommon.doFindPersona(personaCodigo).subscribe({
      next: (resp: HttpResponse<IPersona>) => {
        this.doPersonaSel(resp.body!);
      },
      error: (err: any) => {
        const msg: string = err.error?.detail;
        const modalRef = DialogoInfoComponent.doShow(this.modalService, 'danger text-white', this.title, msg);
        modalRef.componentInstance.innerHtml = `Para el registro visitar <a href="/persona">Aqui</a>`;
      },
    });
  }

  doPersonaSel(persona: IPersona): void {
    const query = {
      'personaId.equals': persona.id,
      eagerload: false,
    };

    this.selAlumno = new Alumno(0);

    this.selPersona = persona;
    this.serviceAlumno.query(query).subscribe({
      next: (res: HttpResponse<IAlumno[]>) => {
        if (res.body && res.body.length > 0) {
          this.selAlumno = res.body[0];
          this.isDisable = false;
        }
      },
    });
  }

  doAdminValidate(): void {
    if (this.selAdminJwt) {
      this.selAdminJwt = '';
      this.documentDescuento.descripcion = '';
      this.documentDescuento.monto = 0;

      return;
    }
    const isValid = this.isAdminRole(this.sysAccount!.authorities);
    if (isValid) {
      this.selAdminJwt = '1';
      return;
    }
    const modalRef = DialogoValidarUsuarioComponent.doShow(this.modalService);
    modalRef.closed.subscribe({
      next: (value: string) => {
        this.selAdminJwt = value;
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

  doInit(): void {
    this.filterAlumno = '';
    this.doClean();
  }

  doClean(): void {
    this.cacheAlumnos = [];
    this.selAlumno = {};
    this.isDisable = true;
  }

  doFilterPressKey(): void {
    this.selAlumno = {};
    this.cacheAlumnos = [];
    this.isDisable = true;

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

  doAlumnoSel(): void {
    this.selAlumno = {};
    if (!this.filterAlumno) {
      return;
    }

    const regex = this.filterAlumno.match(/\[(.*?)\]/);
    if (!regex || regex.length < 2) {
      return;
    }
    this.serviceCommon.getInscripcionIdOfAlumnoId(this.alumnoId).subscribe({
      next: (resp: number) => {
        this.inscripcionId = resp;
      },
      error: (err: any) => {
        const msg: string = err.error?.detail;
        const modalRef = DialogoInfoComponent.doShow(this.modalService, 'danger text-white', 'Error Mensaje', msg);
        modalRef.componentInstance.innerHtml = `Comuníquese con el Administrador`;
      },
    });

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

  doSave(): void {
    const modalRef: NgbModalRef = DialogoConfirmarComponent.doShow(this.modalService, 'Registro Pago', '¿Desea procesar la transacción?');
    modalRef.closed.subscribe({
      next: (result: boolean) => {
        if (!result) {
          return;
        } else {
          this.selAlumno.estado = AlumnoEstado.INSCRITO;
          this.doSaveProceedAlumnoRemote();
        }
      },
      error: (err: any) => {
        const msg1: string = err.error?.detail;
        const modalRef1 = DialogoInfoComponent.doShow(this.modalService, 'danger text-white', 'Error Mensaje', msg1);
        modalRef1.componentInstance.innerHtml = `Error`;
      },
    });
  }

  doSaveProceedAlumnoRemote(): void {
    const incripcionPagoMonto = this.formEntity.controls.incripcionPagoMonto.value;
    let numeroDoc = 0;
    numeroDoc = parseInt(this.document!.codigo!, 10);
    const serialNum = `${numeroDoc}`.padStart(5, '0');
    const sucursalId = Number(`${this.selSucursalId! % 100}`.padStart(2, '0'));
    let serieNro = '';
    this.cacheSucursalSeriesSerie.some((serie: ISucursalSerie) => {
      if (serie.id === this.selSucursalSerieId) {
        serieNro = `${serie.id! % 100}`.padStart(2, '0');
        return true;
      }
      return false;
    });

    const inscripcionPago: IInscripcionPago = new InscripcionPago();
    inscripcionPago.formaPago = InscripcionFormaPago.EFECTIVO;
    switch (this.tipoDoc) {
      case 'FACTURA':
        inscripcionPago.documentoPago = TipoDocumentoVenta.FACTURA;
        break;
      case 'BOLETA':
        inscripcionPago.documentoPago = TipoDocumentoVenta.BOLETA;
        break;
      case 'TICKET':
        inscripcionPago.documentoPago = TipoDocumentoVenta.TICKET;
        break;
      case 'NOTA_DE_VENTA':
        inscripcionPago.documentoPago = TipoDocumentoVenta.NOTA_DE_VENTA;
        break;
    }
    inscripcionPago.monto = incripcionPagoMonto;
    inscripcionPago.fecha = this.fechaActual1;
    inscripcionPago.numeroDocumento = Number(serialNum);
    //inscripcionPago.serie?.id = serieNro;

    this.cacheSucursalSeries.some((serie: ISucursalSerie) => {
      if (serie.id === this.selSucursalSerieId) {
        inscripcionPago.serie = serie;
        inscripcionPago.serie.sucursal?.id;
        this.serieDoc = String(serie.serie);
        return true;
      }
      return false;
    });

    const Saldo = this.getSaldo();
    const inscripcion: IInscripcion = {
      id: this.inscripcionId,
      estado: Saldo === 0 ? InscripcionEstado.CANCELADO : InscripcionEstado.EN_PAGOS,
    };
    this.serviceInscripcion.partialUpdate(inscripcion).subscribe(() => {
      const modalRef = DialogoInfoComponent.doShow(
        this.modalService,
        'success text-white',
        this.title,
        `Proceso registrado satisfactoriamente. La persona fue registrada con el CODIGO de ALUMNO: ${this.selAlumno.codigo!}.`
      );

      modalRef.hidden.subscribe(() => {
        window.location.reload();
      });
    });
    inscripcionPago.inscripcion = inscripcion;
    inscripcionPago.estadoServicio = Saldo === 0 ? InscripcionEstado.CANCELADO : InscripcionEstado.EN_PAGOS;

    this.serviceInsPago.create(inscripcionPago).subscribe({
      next: (resp: HttpResponse<IInscripcion>) => {
        const sucSerie: ISucursalSerie = {};
        sucSerie.id = this.selSucursalSerieId;
        sucSerie.numeroUltimo = this.numeroDoc;
        this.serviceSucursalSerie.partialUpdate(sucSerie).subscribe(() => {
          const modalRef = DialogoInfoComponent.doShow(
            this.modalService,
            'success text-white',
            this.title,
            `Proceso registrado satisfactoriamente. El pago fue registrada para el CÓDIGO de ALUMNO: ${this.selAlumno.codigo!}.`
          );

          modalRef.hidden.subscribe(() => {
            window.location.reload();
          });
        });
      },

      error: (err: any) => {
        let msg: string = err.error?.detail;

        if (!msg) {
          msg = err.message;
        }

        DialogoInfoComponent.doShow(this.modalService, 'danger text-white', this.title, msg);
      },
    });
  }

  getAlumnoCodigo(): string {
    return this.selAlumno.codigo!;
  }

  getAlumnoEstado(): string {
    return this.selAlumno.estado!;
  }

  getAlumnoDni(): string {
    if (this.selAlumno.persona) {
      return this.selAlumno.persona.numeroDocumento!;
    } else {
      return '';
    }
  }

  getAlumnoNombres(): string {
    if (this.selAlumno.persona) {
      return this.selAlumno.persona.nombres!;
    } else {
      return '';
    }
  }

  getAlumnoApPaterno(): string {
    if (this.selAlumno.persona) {
      return this.selAlumno.persona.apellidoPaterno!;
    } else {
      return '';
    }
  }

  getAlumnoApMaterno(): string {
    if (this.selAlumno.persona) {
      return this.selAlumno.persona.apellidoMaterno!;
    } else {
      return '';
    }
  }

  getAlumnoApellidos(): string {
    if (this.selAlumno.persona) {
      return this.getAlumnoApPaterno() + ' ' + this.getAlumnoApMaterno();
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

  getAlumnoPago(): number {
    let pagos = 0;
    if (this.selAlumno.inscripcions) {
      this.selAlumno.inscripcions.forEach((inscrip: IInscripcion) => {
        inscrip.inscripcionPagos?.forEach((inscripPago: IInscripcionPago) => {
          pagos = pagos + inscripPago.monto!;
        });
      });
    }
    return pagos;
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

  actualizarMontoDebe():number {
    let resultado = 0;
    const numeroFijo = this.getAlumnoDebe();
    resultado = numeroFijo - this.formEntity.controls.incripcionPagoMonto.value;
    return resultado;
  }
}
