import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlumnoDesarrolloEstado } from 'app/entities/enumerations/alumno-desarrollo-estado.model';
import { IAlumnoDesarrollo, AlumnoDesarrollo } from '../alumno-desarrollo.model';

import { AlumnoDesarrolloService } from './alumno-desarrollo.service';

describe('AlumnoDesarrollo Service', () => {
  let service: AlumnoDesarrolloService;
  let httpMock: HttpTestingController;
  let elemDefault: IAlumnoDesarrollo;
  let expectedResult: IAlumnoDesarrollo | IAlumnoDesarrollo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlumnoDesarrolloService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      clasesTeoriaProgramadas: 0,
      clasesPracticasProgramas: 0,
      clasesInasistenciaTeoria: 0,
      clasesInasistenciaPractica: 0,
      clasesRealizadasTeoria: 0,
      clasesRealizadasPractica: 0,
      alumnoDesarrolloEstado: AlumnoDesarrolloEstado.NORMAL,
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

    it('should create a AlumnoDesarrollo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AlumnoDesarrollo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlumnoDesarrollo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          clasesTeoriaProgramadas: 1,
          clasesPracticasProgramas: 1,
          clasesInasistenciaTeoria: 1,
          clasesInasistenciaPractica: 1,
          clasesRealizadasTeoria: 1,
          clasesRealizadasPractica: 1,
          alumnoDesarrolloEstado: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AlumnoDesarrollo', () => {
      const patchObject = Object.assign(
        {
          clasesInasistenciaPractica: 1,
        },
        new AlumnoDesarrollo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlumnoDesarrollo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          clasesTeoriaProgramadas: 1,
          clasesPracticasProgramas: 1,
          clasesInasistenciaTeoria: 1,
          clasesInasistenciaPractica: 1,
          clasesRealizadasTeoria: 1,
          clasesRealizadasPractica: 1,
          alumnoDesarrolloEstado: 'BBBBBB',
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

    it('should delete a AlumnoDesarrollo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAlumnoDesarrolloToCollectionIfMissing', () => {
      it('should add a AlumnoDesarrollo to an empty array', () => {
        const alumnoDesarrollo: IAlumnoDesarrollo = { id: 123 };
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing([], alumnoDesarrollo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoDesarrollo);
      });

      it('should not add a AlumnoDesarrollo to an array that contains it', () => {
        const alumnoDesarrollo: IAlumnoDesarrollo = { id: 123 };
        const alumnoDesarrolloCollection: IAlumnoDesarrollo[] = [
          {
            ...alumnoDesarrollo,
          },
          { id: 456 },
        ];
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing(alumnoDesarrolloCollection, alumnoDesarrollo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlumnoDesarrollo to an array that doesn't contain it", () => {
        const alumnoDesarrollo: IAlumnoDesarrollo = { id: 123 };
        const alumnoDesarrolloCollection: IAlumnoDesarrollo[] = [{ id: 456 }];
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing(alumnoDesarrolloCollection, alumnoDesarrollo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoDesarrollo);
      });

      it('should add only unique AlumnoDesarrollo to an array', () => {
        const alumnoDesarrolloArray: IAlumnoDesarrollo[] = [{ id: 123 }, { id: 456 }, { id: 86262 }];
        const alumnoDesarrolloCollection: IAlumnoDesarrollo[] = [{ id: 123 }];
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing(alumnoDesarrolloCollection, ...alumnoDesarrolloArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alumnoDesarrollo: IAlumnoDesarrollo = { id: 123 };
        const alumnoDesarrollo2: IAlumnoDesarrollo = { id: 456 };
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing([], alumnoDesarrollo, alumnoDesarrollo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoDesarrollo);
        expect(expectedResult).toContain(alumnoDesarrollo2);
      });

      it('should accept null and undefined values', () => {
        const alumnoDesarrollo: IAlumnoDesarrollo = { id: 123 };
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing([], null, alumnoDesarrollo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoDesarrollo);
      });

      it('should return initial array if no AlumnoDesarrollo is added', () => {
        const alumnoDesarrolloCollection: IAlumnoDesarrollo[] = [{ id: 123 }];
        expectedResult = service.addAlumnoDesarrolloToCollectionIfMissing(alumnoDesarrolloCollection, undefined, null);
        expect(expectedResult).toEqual(alumnoDesarrolloCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
