import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IInscripcionDetalle, InscripcionDetalle } from '../inscripcion-detalle.model';

import { InscripcionDetalleService } from './inscripcion-detalle.service';

describe('InscripcionDetalle Service', () => {
  let service: InscripcionDetalleService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcionDetalle;
  let expectedResult: IInscripcionDetalle | IInscripcionDetalle[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionDetalleService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      codigo: 'AAAAAAA',
      fechaInicio: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaInicio: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a InscripcionDetalle', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaInicio: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
        },
        returnedFromService
      );

      service.create(new InscripcionDetalle()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InscripcionDetalle', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          fechaInicio: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InscripcionDetalle', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
        },
        new InscripcionDetalle()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InscripcionDetalle', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          codigo: 'BBBBBB',
          fechaInicio: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a InscripcionDetalle', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionDetalleToCollectionIfMissing', () => {
      it('should add a InscripcionDetalle to an empty array', () => {
        const inscripcionDetalle: IInscripcionDetalle = { id: 123 };
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing([], inscripcionDetalle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionDetalle);
      });

      it('should not add a InscripcionDetalle to an array that contains it', () => {
        const inscripcionDetalle: IInscripcionDetalle = { id: 123 };
        const inscripcionDetalleCollection: IInscripcionDetalle[] = [
          {
            ...inscripcionDetalle,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing(inscripcionDetalleCollection, inscripcionDetalle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InscripcionDetalle to an array that doesn't contain it", () => {
        const inscripcionDetalle: IInscripcionDetalle = { id: 123 };
        const inscripcionDetalleCollection: IInscripcionDetalle[] = [{ id: 456 }];
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing(inscripcionDetalleCollection, inscripcionDetalle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionDetalle);
      });

      it('should add only unique InscripcionDetalle to an array', () => {
        const inscripcionDetalleArray: IInscripcionDetalle[] = [{ id: 123 }, { id: 456 }, { id: 29329 }];
        const inscripcionDetalleCollection: IInscripcionDetalle[] = [{ id: 123 }];
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing(inscripcionDetalleCollection, ...inscripcionDetalleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcionDetalle: IInscripcionDetalle = { id: 123 };
        const inscripcionDetalle2: IInscripcionDetalle = { id: 456 };
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing([], inscripcionDetalle, inscripcionDetalle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionDetalle);
        expect(expectedResult).toContain(inscripcionDetalle2);
      });

      it('should accept null and undefined values', () => {
        const inscripcionDetalle: IInscripcionDetalle = { id: 123 };
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing([], null, inscripcionDetalle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionDetalle);
      });

      it('should return initial array if no InscripcionDetalle is added', () => {
        const inscripcionDetalleCollection: IInscripcionDetalle[] = [{ id: 123 }];
        expectedResult = service.addInscripcionDetalleToCollectionIfMissing(inscripcionDetalleCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionDetalleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
