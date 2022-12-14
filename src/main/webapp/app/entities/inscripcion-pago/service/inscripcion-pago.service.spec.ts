import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { InscripcionFormaPago } from 'app/entities/enumerations/inscripcion-forma-pago.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';
import { IInscripcionPago, InscripcionPago } from '../inscripcion-pago.model';

import { InscripcionPagoService } from './inscripcion-pago.service';

describe('InscripcionPago Service', () => {
  let service: InscripcionPagoService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcionPago;
  let expectedResult: IInscripcionPago | IInscripcionPago[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionPagoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      formaPago: InscripcionFormaPago.EFECTIVO,
      documentoPago: TipoDocumentoVenta.FACTURA,
      monto: 0,
      fecha: currentDate,
      codigoOP: 'AAAAAAA',
      numeroDocumento: 0,
      plazoPago: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a InscripcionPago', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new InscripcionPago()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InscripcionPago', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          formaPago: 'BBBBBB',
          documentoPago: 'BBBBBB',
          monto: 1,
          fecha: currentDate.format(DATE_FORMAT),
          codigoOP: 'BBBBBB',
          numeroDocumento: 1,
          plazoPago: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InscripcionPago', () => {
      const patchObject = Object.assign(
        {
          formaPago: 'BBBBBB',
          documentoPago: 'BBBBBB',
          monto: 1,
          numeroDocumento: 1,
          plazoPago: 1,
        },
        new InscripcionPago()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InscripcionPago', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          formaPago: 'BBBBBB',
          documentoPago: 'BBBBBB',
          monto: 1,
          fecha: currentDate.format(DATE_FORMAT),
          codigoOP: 'BBBBBB',
          numeroDocumento: 1,
          plazoPago: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a InscripcionPago', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionPagoToCollectionIfMissing', () => {
      it('should add a InscripcionPago to an empty array', () => {
        const inscripcionPago: IInscripcionPago = { id: 123 };
        expectedResult = service.addInscripcionPagoToCollectionIfMissing([], inscripcionPago);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionPago);
      });

      it('should not add a InscripcionPago to an array that contains it', () => {
        const inscripcionPago: IInscripcionPago = { id: 123 };
        const inscripcionPagoCollection: IInscripcionPago[] = [
          {
            ...inscripcionPago,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionPagoToCollectionIfMissing(inscripcionPagoCollection, inscripcionPago);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InscripcionPago to an array that doesn't contain it", () => {
        const inscripcionPago: IInscripcionPago = { id: 123 };
        const inscripcionPagoCollection: IInscripcionPago[] = [{ id: 456 }];
        expectedResult = service.addInscripcionPagoToCollectionIfMissing(inscripcionPagoCollection, inscripcionPago);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionPago);
      });

      it('should add only unique InscripcionPago to an array', () => {
        const inscripcionPagoArray: IInscripcionPago[] = [{ id: 123 }, { id: 456 }, { id: 15874 }];
        const inscripcionPagoCollection: IInscripcionPago[] = [{ id: 123 }];
        expectedResult = service.addInscripcionPagoToCollectionIfMissing(inscripcionPagoCollection, ...inscripcionPagoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcionPago: IInscripcionPago = { id: 123 };
        const inscripcionPago2: IInscripcionPago = { id: 456 };
        expectedResult = service.addInscripcionPagoToCollectionIfMissing([], inscripcionPago, inscripcionPago2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionPago);
        expect(expectedResult).toContain(inscripcionPago2);
      });

      it('should accept null and undefined values', () => {
        const inscripcionPago: IInscripcionPago = { id: 123 };
        expectedResult = service.addInscripcionPagoToCollectionIfMissing([], null, inscripcionPago, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionPago);
      });

      it('should return initial array if no InscripcionPago is added', () => {
        const inscripcionPagoCollection: IInscripcionPago[] = [{ id: 123 }];
        expectedResult = service.addInscripcionPagoToCollectionIfMissing(inscripcionPagoCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionPagoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
