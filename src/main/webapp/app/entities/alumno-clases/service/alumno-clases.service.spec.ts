import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAlumnoClases, AlumnoClases } from '../alumno-clases.model';

import { AlumnoClasesService } from './alumno-clases.service';

describe('AlumnoClases Service', () => {
  let service: AlumnoClasesService;
  let httpMock: HttpTestingController;
  let elemDefault: IAlumnoClases;
  let expectedResult: IAlumnoClases | IAlumnoClases[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlumnoClasesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      clasesTotales: 0,
      clasesProgramadas: 0,
      clasesRealizadas: 0,
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

    it('should create a AlumnoClases', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AlumnoClases()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlumnoClases', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          clasesTotales: 1,
          clasesProgramadas: 1,
          clasesRealizadas: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AlumnoClases', () => {
      const patchObject = Object.assign(
        {
          clasesRealizadas: 1,
        },
        new AlumnoClases()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlumnoClases', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          clasesTotales: 1,
          clasesProgramadas: 1,
          clasesRealizadas: 1,
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

    it('should delete a AlumnoClases', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAlumnoClasesToCollectionIfMissing', () => {
      it('should add a AlumnoClases to an empty array', () => {
        const alumnoClases: IAlumnoClases = { id: 123 };
        expectedResult = service.addAlumnoClasesToCollectionIfMissing([], alumnoClases);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoClases);
      });

      it('should not add a AlumnoClases to an array that contains it', () => {
        const alumnoClases: IAlumnoClases = { id: 123 };
        const alumnoClasesCollection: IAlumnoClases[] = [
          {
            ...alumnoClases,
          },
          { id: 456 },
        ];
        expectedResult = service.addAlumnoClasesToCollectionIfMissing(alumnoClasesCollection, alumnoClases);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlumnoClases to an array that doesn't contain it", () => {
        const alumnoClases: IAlumnoClases = { id: 123 };
        const alumnoClasesCollection: IAlumnoClases[] = [{ id: 456 }];
        expectedResult = service.addAlumnoClasesToCollectionIfMissing(alumnoClasesCollection, alumnoClases);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoClases);
      });

      it('should add only unique AlumnoClases to an array', () => {
        const alumnoClasesArray: IAlumnoClases[] = [{ id: 123 }, { id: 456 }, { id: 91110 }];
        const alumnoClasesCollection: IAlumnoClases[] = [{ id: 123 }];
        expectedResult = service.addAlumnoClasesToCollectionIfMissing(alumnoClasesCollection, ...alumnoClasesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alumnoClases: IAlumnoClases = { id: 123 };
        const alumnoClases2: IAlumnoClases = { id: 456 };
        expectedResult = service.addAlumnoClasesToCollectionIfMissing([], alumnoClases, alumnoClases2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoClases);
        expect(expectedResult).toContain(alumnoClases2);
      });

      it('should accept null and undefined values', () => {
        const alumnoClases: IAlumnoClases = { id: 123 };
        expectedResult = service.addAlumnoClasesToCollectionIfMissing([], null, alumnoClases, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoClases);
      });

      it('should return initial array if no AlumnoClases is added', () => {
        const alumnoClasesCollection: IAlumnoClases[] = [{ id: 123 }];
        expectedResult = service.addAlumnoClasesToCollectionIfMissing(alumnoClasesCollection, undefined, null);
        expect(expectedResult).toEqual(alumnoClasesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
