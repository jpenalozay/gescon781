import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAlumnoCategoria, AlumnoCategoria } from '../alumno-categoria.model';

import { AlumnoCategoriaService } from './alumno-categoria.service';

describe('AlumnoCategoria Service', () => {
  let service: AlumnoCategoriaService;
  let httpMock: HttpTestingController;
  let elemDefault: IAlumnoCategoria;
  let expectedResult: IAlumnoCategoria | IAlumnoCategoria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlumnoCategoriaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      licenciaNumeroAlumno: 'AAAAAAA',
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

    it('should create a AlumnoCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AlumnoCategoria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlumnoCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          licenciaNumeroAlumno: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AlumnoCategoria', () => {
      const patchObject = Object.assign({}, new AlumnoCategoria());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlumnoCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          licenciaNumeroAlumno: 'BBBBBB',
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

    it('should delete a AlumnoCategoria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAlumnoCategoriaToCollectionIfMissing', () => {
      it('should add a AlumnoCategoria to an empty array', () => {
        const alumnoCategoria: IAlumnoCategoria = { id: 123 };
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing([], alumnoCategoria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoCategoria);
      });

      it('should not add a AlumnoCategoria to an array that contains it', () => {
        const alumnoCategoria: IAlumnoCategoria = { id: 123 };
        const alumnoCategoriaCollection: IAlumnoCategoria[] = [
          {
            ...alumnoCategoria,
          },
          { id: 456 },
        ];
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing(alumnoCategoriaCollection, alumnoCategoria);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlumnoCategoria to an array that doesn't contain it", () => {
        const alumnoCategoria: IAlumnoCategoria = { id: 123 };
        const alumnoCategoriaCollection: IAlumnoCategoria[] = [{ id: 456 }];
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing(alumnoCategoriaCollection, alumnoCategoria);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoCategoria);
      });

      it('should add only unique AlumnoCategoria to an array', () => {
        const alumnoCategoriaArray: IAlumnoCategoria[] = [{ id: 123 }, { id: 456 }, { id: 78806 }];
        const alumnoCategoriaCollection: IAlumnoCategoria[] = [{ id: 123 }];
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing(alumnoCategoriaCollection, ...alumnoCategoriaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alumnoCategoria: IAlumnoCategoria = { id: 123 };
        const alumnoCategoria2: IAlumnoCategoria = { id: 456 };
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing([], alumnoCategoria, alumnoCategoria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoCategoria);
        expect(expectedResult).toContain(alumnoCategoria2);
      });

      it('should accept null and undefined values', () => {
        const alumnoCategoria: IAlumnoCategoria = { id: 123 };
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing([], null, alumnoCategoria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoCategoria);
      });

      it('should return initial array if no AlumnoCategoria is added', () => {
        const alumnoCategoriaCollection: IAlumnoCategoria[] = [{ id: 123 }];
        expectedResult = service.addAlumnoCategoriaToCollectionIfMissing(alumnoCategoriaCollection, undefined, null);
        expect(expectedResult).toEqual(alumnoCategoriaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
