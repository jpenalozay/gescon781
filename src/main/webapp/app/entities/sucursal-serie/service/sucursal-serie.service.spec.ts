import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoDocumentoVenta } from 'app/entities/enumerations/tipo-documento-venta.model';
import { ISucursalSerie, SucursalSerie } from '../sucursal-serie.model';

import { SucursalSerieService } from './sucursal-serie.service';

describe('SucursalSerie Service', () => {
  let service: SucursalSerieService;
  let httpMock: HttpTestingController;
  let elemDefault: ISucursalSerie;
  let expectedResult: ISucursalSerie | ISucursalSerie[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SucursalSerieService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      tipoDocumento: TipoDocumentoVenta.FACTURA,
      serie: 'AAAAAAA',
      fechaEmision: currentDate,
      numeroMaximo: 0,
      numeroUltimo: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaEmision: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a SucursalSerie', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaEmision: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaEmision: currentDate,
        },
        returnedFromService
      );

      service.create(new SucursalSerie()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SucursalSerie', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipoDocumento: 'BBBBBB',
          serie: 'BBBBBB',
          fechaEmision: currentDate.format(DATE_FORMAT),
          numeroMaximo: 1,
          numeroUltimo: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaEmision: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SucursalSerie', () => {
      const patchObject = Object.assign(
        {
          activo: 'BBBBBB',
          tipoDocumento: 'BBBBBB',
          fechaEmision: currentDate.format(DATE_FORMAT),
          numeroUltimo: 1,
        },
        new SucursalSerie()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaEmision: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SucursalSerie', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipoDocumento: 'BBBBBB',
          serie: 'BBBBBB',
          fechaEmision: currentDate.format(DATE_FORMAT),
          numeroMaximo: 1,
          numeroUltimo: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaEmision: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a SucursalSerie', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSucursalSerieToCollectionIfMissing', () => {
      it('should add a SucursalSerie to an empty array', () => {
        const sucursalSerie: ISucursalSerie = { id: 123 };
        expectedResult = service.addSucursalSerieToCollectionIfMissing([], sucursalSerie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sucursalSerie);
      });

      it('should not add a SucursalSerie to an array that contains it', () => {
        const sucursalSerie: ISucursalSerie = { id: 123 };
        const sucursalSerieCollection: ISucursalSerie[] = [
          {
            ...sucursalSerie,
          },
          { id: 456 },
        ];
        expectedResult = service.addSucursalSerieToCollectionIfMissing(sucursalSerieCollection, sucursalSerie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SucursalSerie to an array that doesn't contain it", () => {
        const sucursalSerie: ISucursalSerie = { id: 123 };
        const sucursalSerieCollection: ISucursalSerie[] = [{ id: 456 }];
        expectedResult = service.addSucursalSerieToCollectionIfMissing(sucursalSerieCollection, sucursalSerie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sucursalSerie);
      });

      it('should add only unique SucursalSerie to an array', () => {
        const sucursalSerieArray: ISucursalSerie[] = [{ id: 123 }, { id: 456 }, { id: 56692 }];
        const sucursalSerieCollection: ISucursalSerie[] = [{ id: 123 }];
        expectedResult = service.addSucursalSerieToCollectionIfMissing(sucursalSerieCollection, ...sucursalSerieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sucursalSerie: ISucursalSerie = { id: 123 };
        const sucursalSerie2: ISucursalSerie = { id: 456 };
        expectedResult = service.addSucursalSerieToCollectionIfMissing([], sucursalSerie, sucursalSerie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sucursalSerie);
        expect(expectedResult).toContain(sucursalSerie2);
      });

      it('should accept null and undefined values', () => {
        const sucursalSerie: ISucursalSerie = { id: 123 };
        expectedResult = service.addSucursalSerieToCollectionIfMissing([], null, sucursalSerie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sucursalSerie);
      });

      it('should return initial array if no SucursalSerie is added', () => {
        const sucursalSerieCollection: ISucursalSerie[] = [{ id: 123 }];
        expectedResult = service.addSucursalSerieToCollectionIfMissing(sucursalSerieCollection, undefined, null);
        expect(expectedResult).toEqual(sucursalSerieCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
