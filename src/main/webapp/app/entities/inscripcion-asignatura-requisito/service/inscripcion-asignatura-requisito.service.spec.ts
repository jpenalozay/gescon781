import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInscripcionAsignaturaRequisito, InscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';

import { InscripcionAsignaturaRequisitoService } from './inscripcion-asignatura-requisito.service';

describe('InscripcionAsignaturaRequisito Service', () => {
  let service: InscripcionAsignaturaRequisitoService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcionAsignaturaRequisito;
  let expectedResult: IInscripcionAsignaturaRequisito | IInscripcionAsignaturaRequisito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionAsignaturaRequisitoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      descripcion: 'AAAAAAA',
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
      documento: 'AAAAAAA',
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

    it('should create a InscripcionAsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new InscripcionAsignaturaRequisito()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InscripcionAsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          documento: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InscripcionAsignaturaRequisito', () => {
      const patchObject = Object.assign(
        {
          documento: 'BBBBBB',
        },
        new InscripcionAsignaturaRequisito()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InscripcionAsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          documento: 'BBBBBB',
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

    it('should delete a InscripcionAsignaturaRequisito', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionAsignaturaRequisitoToCollectionIfMissing', () => {
      it('should add a InscripcionAsignaturaRequisito to an empty array', () => {
        const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 123 };
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing([], inscripcionAsignaturaRequisito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionAsignaturaRequisito);
      });

      it('should not add a InscripcionAsignaturaRequisito to an array that contains it', () => {
        const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 123 };
        const inscripcionAsignaturaRequisitoCollection: IInscripcionAsignaturaRequisito[] = [
          {
            ...inscripcionAsignaturaRequisito,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          inscripcionAsignaturaRequisitoCollection,
          inscripcionAsignaturaRequisito
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InscripcionAsignaturaRequisito to an array that doesn't contain it", () => {
        const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 123 };
        const inscripcionAsignaturaRequisitoCollection: IInscripcionAsignaturaRequisito[] = [{ id: 456 }];
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          inscripcionAsignaturaRequisitoCollection,
          inscripcionAsignaturaRequisito
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionAsignaturaRequisito);
      });

      it('should add only unique InscripcionAsignaturaRequisito to an array', () => {
        const inscripcionAsignaturaRequisitoArray: IInscripcionAsignaturaRequisito[] = [{ id: 123 }, { id: 456 }, { id: 98446 }];
        const inscripcionAsignaturaRequisitoCollection: IInscripcionAsignaturaRequisito[] = [{ id: 123 }];
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          inscripcionAsignaturaRequisitoCollection,
          ...inscripcionAsignaturaRequisitoArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 123 };
        const inscripcionAsignaturaRequisito2: IInscripcionAsignaturaRequisito = { id: 456 };
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          [],
          inscripcionAsignaturaRequisito,
          inscripcionAsignaturaRequisito2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionAsignaturaRequisito);
        expect(expectedResult).toContain(inscripcionAsignaturaRequisito2);
      });

      it('should accept null and undefined values', () => {
        const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 123 };
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          [],
          null,
          inscripcionAsignaturaRequisito,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionAsignaturaRequisito);
      });

      it('should return initial array if no InscripcionAsignaturaRequisito is added', () => {
        const inscripcionAsignaturaRequisitoCollection: IInscripcionAsignaturaRequisito[] = [{ id: 123 }];
        expectedResult = service.addInscripcionAsignaturaRequisitoToCollectionIfMissing(
          inscripcionAsignaturaRequisitoCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(inscripcionAsignaturaRequisitoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
