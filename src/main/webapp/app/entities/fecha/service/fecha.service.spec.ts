import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { IFecha } from '../fecha.model';

import { FechaService } from './fecha.service';

describe('Fecha Service', () => {
  let service: FechaService;
  let httpMock: HttpTestingController;
  let elemDefault: IFecha;
  let expectedResult: IFecha | IFecha[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FechaService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      fecha: currentDate,
      dia: 0,
      mes: 0,
      anio: 0,
      diaNombre: 'AAAAAAA',
      diaNombreCorto: 'AAAAAAA',
      feriado: SiNo.SI,
      laboral: SiNo.SI,
      finSemana: SiNo.SI,
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

    it('should return a list of Fecha', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_FORMAT),
          dia: 1,
          mes: 1,
          anio: 1,
          diaNombre: 'BBBBBB',
          diaNombreCorto: 'BBBBBB',
          feriado: 'BBBBBB',
          laboral: 'BBBBBB',
          finSemana: 'BBBBBB',
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

    describe('addFechaToCollectionIfMissing', () => {
      it('should add a Fecha to an empty array', () => {
        const fecha: IFecha = { id: 123 };
        expectedResult = service.addFechaToCollectionIfMissing([], fecha);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fecha);
      });

      it('should not add a Fecha to an array that contains it', () => {
        const fecha: IFecha = { id: 123 };
        const fechaCollection: IFecha[] = [
          {
            ...fecha,
          },
          { id: 456 },
        ];
        expectedResult = service.addFechaToCollectionIfMissing(fechaCollection, fecha);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Fecha to an array that doesn't contain it", () => {
        const fecha: IFecha = { id: 123 };
        const fechaCollection: IFecha[] = [{ id: 456 }];
        expectedResult = service.addFechaToCollectionIfMissing(fechaCollection, fecha);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fecha);
      });

      it('should add only unique Fecha to an array', () => {
        const fechaArray: IFecha[] = [{ id: 123 }, { id: 456 }, { id: 65942 }];
        const fechaCollection: IFecha[] = [{ id: 123 }];
        expectedResult = service.addFechaToCollectionIfMissing(fechaCollection, ...fechaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fecha: IFecha = { id: 123 };
        const fecha2: IFecha = { id: 456 };
        expectedResult = service.addFechaToCollectionIfMissing([], fecha, fecha2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fecha);
        expect(expectedResult).toContain(fecha2);
      });

      it('should accept null and undefined values', () => {
        const fecha: IFecha = { id: 123 };
        expectedResult = service.addFechaToCollectionIfMissing([], null, fecha, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fecha);
      });

      it('should return initial array if no Fecha is added', () => {
        const fechaCollection: IFecha[] = [{ id: 123 }];
        expectedResult = service.addFechaToCollectionIfMissing(fechaCollection, undefined, null);
        expect(expectedResult).toEqual(fechaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
