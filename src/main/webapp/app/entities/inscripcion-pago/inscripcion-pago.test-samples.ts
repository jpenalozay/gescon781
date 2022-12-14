import dayjs from 'dayjs/esm';

import { InscripcionFormaPago } from 'app/entities/enumerations/inscripcion-forma-pago.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';

import { IInscripcionPago, NewInscripcionPago } from './inscripcion-pago.model';

export const sampleWithRequiredData: IInscripcionPago = {
  id: 9469,
  formaPago: InscripcionFormaPago['EFECTIVO'],
  monto: 6590,
  fecha: dayjs('2022-11-24'),
  tipoDocumento: TipoDocumentoVenta['GUIA_REMISION'],
  numeroDocumento: 26809,
};

export const sampleWithPartialData: IInscripcionPago = {
  id: 85892,
  formaPago: InscripcionFormaPago['TARJETA'],
  monto: 5345,
  fecha: dayjs('2022-11-24'),
  codigoOP: 'gestión Videojue',
  tipoDocumento: TipoDocumentoVenta['GUIA_REMISION'],
  numeroDocumento: 90691,
};

export const sampleWithFullData: IInscripcionPago = {
  id: 49257,
  formaPago: InscripcionFormaPago['TARJETA'],
  monto: 4500,
  fecha: dayjs('2022-11-23'),
  codigoOP: 'AGP Masía Centra',
  tipoDocumento: TipoDocumentoVenta['PROFORMA'],
  numeroDocumento: 49871,
  plazoPago: 123,
};

export const sampleWithNewData: NewInscripcionPago = {
  formaPago: InscripcionFormaPago['TARJETA'],
  monto: 1858,
  fecha: dayjs('2022-11-23'),
  tipoDocumento: TipoDocumentoVenta['FACTURA'],
  numeroDocumento: 43536,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
