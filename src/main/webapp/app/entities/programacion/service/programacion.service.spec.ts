import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ProgramacionEstado } from 'app/entities/enumerations/programacion-estado.model';
import { IProgramacion, Programacion } from '../programacion.model';

import { ProgramacionService } from './programacion.service';

describe('Programacion Service', () => {
  let service: ProgramacionService;
  let httpMock: HttpTestingController;
  let elemDefault: IProgramacion;
  let expectedResult: IProgramacion | IProgramacion[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProgramacionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      estado: ProgramacionEstado.PROGRAMADO,
      codigo: 'AAAAAAA',
      fechaInicio: currentDate,
      fechaFin: currentDate,
      deshabilitaciones: 0,
      fecha: currentDate,
      nombreUsuario: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fechaInicio: currentDate.format(DATE_FORMAT),
          fechaFin: currentDate.format(DATE_FORMAT),
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Programacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fechaInicio: currentDate.format(DATE_FORMAT),
          fechaFin: currentDate.format(DATE_FORMAT),
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
          fechaFin: currentDate,
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new Programacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Programacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          estado: 'BBBBBB',
          codigo: 'BBBBBB',
          fechaInicio: currentDate.format(DATE_FORMAT),
          fechaFin: currentDate.format(DATE_FORMAT),
          deshabilitaciones: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          nombreUsuario: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
          fechaFin: currentDate,
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Programacion', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
          deshabilitaciones: 1,
          nombreUsuario: 'BBBBBB',
        },
        new Programacion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
          fechaFin: currentDate,
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Programacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          estado: 'BBBBBB',
          codigo: 'BBBBBB',
          fechaInicio: currentDate.format(DATE_FORMAT),
          fechaFin: currentDate.format(DATE_FORMAT),
          deshabilitaciones: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          nombreUsuario: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fechaInicio: currentDate,
          fechaFin: currentDate,
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

    it('should delete a Programacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProgramacionToCollectionIfMissing', () => {
      it('should add a Programacion to an empty array', () => {
        const programacion: IProgramacion = { id: 123 };
        expectedResult = service.addProgramacionToCollectionIfMissing([], programacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(programacion);
      });

      it('should not add a Programacion to an array that contains it', () => {
        const programacion: IProgramacion = { id: 123 };
        const programacionCollection: IProgramacion[] = [
          {
            ...programacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addProgramacionToCollectionIfMissing(programacionCollection, programacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Programacion to an array that doesn't contain it", () => {
        const programacion: IProgramacion = { id: 123 };
        const programacionCollection: IProgramacion[] = [{ id: 456 }];
        expectedResult = service.addProgramacionToCollectionIfMissing(programacionCollection, programacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(programacion);
      });

      it('should add only unique Programacion to an array', () => {
        const programacionArray: IProgramacion[] = [{ id: 123 }, { id: 456 }, { id: 34473 }];
        const programacionCollection: IProgramacion[] = [{ id: 123 }];
        expectedResult = service.addProgramacionToCollectionIfMissing(programacionCollection, ...programacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const programacion: IProgramacion = { id: 123 };
        const programacion2: IProgramacion = { id: 456 };
        expectedResult = service.addProgramacionToCollectionIfMissing([], programacion, programacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(programacion);
        expect(expectedResult).toContain(programacion2);
      });

      it('should accept null and undefined values', () => {
        const programacion: IProgramacion = { id: 123 };
        expectedResult = service.addProgramacionToCollectionIfMissing([], null, programacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(programacion);
      });

      it('should return initial array if no Programacion is added', () => {
        const programacionCollection: IProgramacion[] = [{ id: 123 }];
        expectedResult = service.addProgramacionToCollectionIfMissing(programacionCollection, undefined, null);
        expect(expectedResult).toEqual(programacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
