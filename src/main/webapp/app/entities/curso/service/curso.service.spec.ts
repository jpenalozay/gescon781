import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { CursoTipo } from 'app/entities/enumerations/curso-tipo.model';
import { ICurso, Curso } from '../curso.model';

import { CursoService } from './curso.service';

describe('Curso Service', () => {
  let service: CursoService;
  let httpMock: HttpTestingController;
  let elemDefault: ICurso;
  let expectedResult: ICurso | ICurso[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CursoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      tipo: CursoTipo.REGULAR,
      nombre: 'AAAAAAA',
      nombreCorto: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
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

    it('should create a Curso', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Curso()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Curso', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Curso', () => {
      const patchObject = Object.assign(
        {
          activo: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        new Curso()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Curso', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
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

    it('should delete a Curso', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCursoToCollectionIfMissing', () => {
      it('should add a Curso to an empty array', () => {
        const curso: ICurso = { id: 123 };
        expectedResult = service.addCursoToCollectionIfMissing([], curso);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(curso);
      });

      it('should not add a Curso to an array that contains it', () => {
        const curso: ICurso = { id: 123 };
        const cursoCollection: ICurso[] = [
          {
            ...curso,
          },
          { id: 456 },
        ];
        expectedResult = service.addCursoToCollectionIfMissing(cursoCollection, curso);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Curso to an array that doesn't contain it", () => {
        const curso: ICurso = { id: 123 };
        const cursoCollection: ICurso[] = [{ id: 456 }];
        expectedResult = service.addCursoToCollectionIfMissing(cursoCollection, curso);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(curso);
      });

      it('should add only unique Curso to an array', () => {
        const cursoArray: ICurso[] = [{ id: 123 }, { id: 456 }, { id: 62099 }];
        const cursoCollection: ICurso[] = [{ id: 123 }];
        expectedResult = service.addCursoToCollectionIfMissing(cursoCollection, ...cursoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const curso: ICurso = { id: 123 };
        const curso2: ICurso = { id: 456 };
        expectedResult = service.addCursoToCollectionIfMissing([], curso, curso2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(curso);
        expect(expectedResult).toContain(curso2);
      });

      it('should accept null and undefined values', () => {
        const curso: ICurso = { id: 123 };
        expectedResult = service.addCursoToCollectionIfMissing([], null, curso, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(curso);
      });

      it('should return initial array if no Curso is added', () => {
        const cursoCollection: ICurso[] = [{ id: 123 }];
        expectedResult = service.addCursoToCollectionIfMissing(cursoCollection, undefined, null);
        expect(expectedResult).toEqual(cursoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
