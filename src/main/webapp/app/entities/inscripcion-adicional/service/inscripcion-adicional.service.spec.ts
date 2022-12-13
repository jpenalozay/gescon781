import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInscripcionAdicional, InscripcionAdicional } from '../inscripcion-adicional.model';

import { InscripcionAdicionalService } from './inscripcion-adicional.service';

describe('InscripcionAdicional Service', () => {
  let service: InscripcionAdicionalService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcionAdicional;
  let expectedResult: IInscripcionAdicional | IInscripcionAdicional[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionAdicionalService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      descripcion: 'AAAAAAA',
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
      documento: 'AAAAAAA',
      cantidad: 'AAAAAAA',
      costo: 0,
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

    it('should create a InscripcionAdicional', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new InscripcionAdicional()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InscripcionAdicional', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          documento: 'BBBBBB',
          cantidad: 'BBBBBB',
          costo: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InscripcionAdicional', () => {
      const patchObject = Object.assign({}, new InscripcionAdicional());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InscripcionAdicional', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          documento: 'BBBBBB',
          cantidad: 'BBBBBB',
          costo: 1,
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

    it('should delete a InscripcionAdicional', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionAdicionalToCollectionIfMissing', () => {
      it('should add a InscripcionAdicional to an empty array', () => {
        const inscripcionAdicional: IInscripcionAdicional = { id: 123 };
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing([], inscripcionAdicional);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionAdicional);
      });

      it('should not add a InscripcionAdicional to an array that contains it', () => {
        const inscripcionAdicional: IInscripcionAdicional = { id: 123 };
        const inscripcionAdicionalCollection: IInscripcionAdicional[] = [
          {
            ...inscripcionAdicional,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing(inscripcionAdicionalCollection, inscripcionAdicional);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InscripcionAdicional to an array that doesn't contain it", () => {
        const inscripcionAdicional: IInscripcionAdicional = { id: 123 };
        const inscripcionAdicionalCollection: IInscripcionAdicional[] = [{ id: 456 }];
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing(inscripcionAdicionalCollection, inscripcionAdicional);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionAdicional);
      });

      it('should add only unique InscripcionAdicional to an array', () => {
        const inscripcionAdicionalArray: IInscripcionAdicional[] = [{ id: 123 }, { id: 456 }, { id: 62502 }];
        const inscripcionAdicionalCollection: IInscripcionAdicional[] = [{ id: 123 }];
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing(inscripcionAdicionalCollection, ...inscripcionAdicionalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcionAdicional: IInscripcionAdicional = { id: 123 };
        const inscripcionAdicional2: IInscripcionAdicional = { id: 456 };
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing([], inscripcionAdicional, inscripcionAdicional2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionAdicional);
        expect(expectedResult).toContain(inscripcionAdicional2);
      });

      it('should accept null and undefined values', () => {
        const inscripcionAdicional: IInscripcionAdicional = { id: 123 };
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing([], null, inscripcionAdicional, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionAdicional);
      });

      it('should return initial array if no InscripcionAdicional is added', () => {
        const inscripcionAdicionalCollection: IInscripcionAdicional[] = [{ id: 123 }];
        expectedResult = service.addInscripcionAdicionalToCollectionIfMissing(inscripcionAdicionalCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionAdicionalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
