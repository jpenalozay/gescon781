import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Estado } from 'app/entities/enumerations/estado.model';
import { IProgramacionDeshabilitacion, ProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';

import { ProgramacionDeshabilitacionService } from './programacion-deshabilitacion.service';

describe('ProgramacionDeshabilitacion Service', () => {
  let service: ProgramacionDeshabilitacionService;
  let httpMock: HttpTestingController;
  let elemDefault: IProgramacionDeshabilitacion;
  let expectedResult: IProgramacionDeshabilitacion | IProgramacionDeshabilitacion[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProgramacionDeshabilitacionService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      codigo: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      fecha: currentDate,
      nombreUsuario: 'AAAAAAA',
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

    it('should create a ProgramacionDeshabilitacion', () => {
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

      service.create(new ProgramacionDeshabilitacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProgramacionDeshabilitacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 'BBBBBB',
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          nombreUsuario: 'BBBBBB',
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

    it('should partial update a ProgramacionDeshabilitacion', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          nombreUsuario: 'BBBBBB',
        },
        new ProgramacionDeshabilitacion()
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

    it('should return a list of ProgramacionDeshabilitacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 'BBBBBB',
          descripcion: 'BBBBBB',
          fecha: currentDate.format(DATE_TIME_FORMAT),
          nombreUsuario: 'BBBBBB',
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

    it('should delete a ProgramacionDeshabilitacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProgramacionDeshabilitacionToCollectionIfMissing', () => {
      it('should add a ProgramacionDeshabilitacion to an empty array', () => {
        const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 123 };
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing([], programacionDeshabilitacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(programacionDeshabilitacion);
      });

      it('should not add a ProgramacionDeshabilitacion to an array that contains it', () => {
        const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 123 };
        const programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[] = [
          {
            ...programacionDeshabilitacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing(
          programacionDeshabilitacionCollection,
          programacionDeshabilitacion
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProgramacionDeshabilitacion to an array that doesn't contain it", () => {
        const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 123 };
        const programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[] = [{ id: 456 }];
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing(
          programacionDeshabilitacionCollection,
          programacionDeshabilitacion
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(programacionDeshabilitacion);
      });

      it('should add only unique ProgramacionDeshabilitacion to an array', () => {
        const programacionDeshabilitacionArray: IProgramacionDeshabilitacion[] = [{ id: 123 }, { id: 456 }, { id: 6068 }];
        const programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[] = [{ id: 123 }];
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing(
          programacionDeshabilitacionCollection,
          ...programacionDeshabilitacionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 123 };
        const programacionDeshabilitacion2: IProgramacionDeshabilitacion = { id: 456 };
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing(
          [],
          programacionDeshabilitacion,
          programacionDeshabilitacion2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(programacionDeshabilitacion);
        expect(expectedResult).toContain(programacionDeshabilitacion2);
      });

      it('should accept null and undefined values', () => {
        const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 123 };
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing([], null, programacionDeshabilitacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(programacionDeshabilitacion);
      });

      it('should return initial array if no ProgramacionDeshabilitacion is added', () => {
        const programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[] = [{ id: 123 }];
        expectedResult = service.addProgramacionDeshabilitacionToCollectionIfMissing(
          programacionDeshabilitacionCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(programacionDeshabilitacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
