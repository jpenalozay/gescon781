import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { InscripcionEstado } from 'app/entities/enumerations/inscripcion-estado.model';
import { IInscripcion, Inscripcion } from '../inscripcion.model';

import { InscripcionService } from './inscripcion.service';

describe('Inscripcion Service', () => {
  let service: InscripcionService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcion;
  let expectedResult: IInscripcion | IInscripcion[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      codigo: 'AAAAAAA',
      estado: InscripcionEstado.CANCELADO,
      numeroDocumento: 0,
      fecha: currentDate,
      costoTotal: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Inscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new Inscripcion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Inscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          estado: 'BBBBBB',
          numeroDocumento: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          costoTotal: 1,
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

    it('should partial update a Inscripcion', () => {
      const patchObject = Object.assign(
        {
          estado: 'BBBBBB',
          numeroDocumento: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        new Inscripcion()
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

    it('should return a list of Inscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          estado: 'BBBBBB',
          numeroDocumento: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          costoTotal: 1,
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

    it('should delete a Inscripcion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionToCollectionIfMissing', () => {
      it('should add a Inscripcion to an empty array', () => {
        const inscripcion: IInscripcion = { id: 123 };
        expectedResult = service.addInscripcionToCollectionIfMissing([], inscripcion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcion);
      });

      it('should not add a Inscripcion to an array that contains it', () => {
        const inscripcion: IInscripcion = { id: 123 };
        const inscripcionCollection: IInscripcion[] = [
          {
            ...inscripcion,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionToCollectionIfMissing(inscripcionCollection, inscripcion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Inscripcion to an array that doesn't contain it", () => {
        const inscripcion: IInscripcion = { id: 123 };
        const inscripcionCollection: IInscripcion[] = [{ id: 456 }];
        expectedResult = service.addInscripcionToCollectionIfMissing(inscripcionCollection, inscripcion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcion);
      });

      it('should add only unique Inscripcion to an array', () => {
        const inscripcionArray: IInscripcion[] = [{ id: 123 }, { id: 456 }, { id: 75342 }];
        const inscripcionCollection: IInscripcion[] = [{ id: 123 }];
        expectedResult = service.addInscripcionToCollectionIfMissing(inscripcionCollection, ...inscripcionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcion: IInscripcion = { id: 123 };
        const inscripcion2: IInscripcion = { id: 456 };
        expectedResult = service.addInscripcionToCollectionIfMissing([], inscripcion, inscripcion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcion);
        expect(expectedResult).toContain(inscripcion2);
      });

      it('should accept null and undefined values', () => {
        const inscripcion: IInscripcion = { id: 123 };
        expectedResult = service.addInscripcionToCollectionIfMissing([], null, inscripcion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcion);
      });

      it('should return initial array if no Inscripcion is added', () => {
        const inscripcionCollection: IInscripcion[] = [{ id: 123 }];
        expectedResult = service.addInscripcionToCollectionIfMissing(inscripcionCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
