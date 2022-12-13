import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { HorarioTipo } from 'app/entities/enumerations/horario-tipo.model';
import { IHorarioDeshabilitacion, HorarioDeshabilitacion } from '../horario-deshabilitacion.model';

import { HorarioDeshabilitacionService } from './horario-deshabilitacion.service';

describe('HorarioDeshabilitacion Service', () => {
  let service: HorarioDeshabilitacionService;
  let httpMock: HttpTestingController;
  let elemDefault: IHorarioDeshabilitacion;
  let expectedResult: IHorarioDeshabilitacion | IHorarioDeshabilitacion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HorarioDeshabilitacionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      tipo: HorarioTipo.ADMINISTRACION,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a HorarioDeshabilitacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new HorarioDeshabilitacion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HorarioDeshabilitacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HorarioDeshabilitacion', () => {
      const patchObject = Object.assign(
        {
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
        },
        new HorarioDeshabilitacion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HorarioDeshabilitacion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a HorarioDeshabilitacion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHorarioDeshabilitacionToCollectionIfMissing', () => {
      it('should add a HorarioDeshabilitacion to an empty array', () => {
        const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 123 };
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing([], horarioDeshabilitacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioDeshabilitacion);
      });

      it('should not add a HorarioDeshabilitacion to an array that contains it', () => {
        const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 123 };
        const horarioDeshabilitacionCollection: IHorarioDeshabilitacion[] = [
          {
            ...horarioDeshabilitacion,
          },
          { id: 456 },
        ];
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing(horarioDeshabilitacionCollection, horarioDeshabilitacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HorarioDeshabilitacion to an array that doesn't contain it", () => {
        const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 123 };
        const horarioDeshabilitacionCollection: IHorarioDeshabilitacion[] = [{ id: 456 }];
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing(horarioDeshabilitacionCollection, horarioDeshabilitacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioDeshabilitacion);
      });

      it('should add only unique HorarioDeshabilitacion to an array', () => {
        const horarioDeshabilitacionArray: IHorarioDeshabilitacion[] = [{ id: 123 }, { id: 456 }, { id: 74559 }];
        const horarioDeshabilitacionCollection: IHorarioDeshabilitacion[] = [{ id: 123 }];
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing(
          horarioDeshabilitacionCollection,
          ...horarioDeshabilitacionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 123 };
        const horarioDeshabilitacion2: IHorarioDeshabilitacion = { id: 456 };
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing([], horarioDeshabilitacion, horarioDeshabilitacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioDeshabilitacion);
        expect(expectedResult).toContain(horarioDeshabilitacion2);
      });

      it('should accept null and undefined values', () => {
        const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 123 };
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing([], null, horarioDeshabilitacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioDeshabilitacion);
      });

      it('should return initial array if no HorarioDeshabilitacion is added', () => {
        const horarioDeshabilitacionCollection: IHorarioDeshabilitacion[] = [{ id: 123 }];
        expectedResult = service.addHorarioDeshabilitacionToCollectionIfMissing(horarioDeshabilitacionCollection, undefined, null);
        expect(expectedResult).toEqual(horarioDeshabilitacionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
