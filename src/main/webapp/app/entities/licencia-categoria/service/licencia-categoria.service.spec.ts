import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILicenciaCategoria, LicenciaCategoria } from '../licencia-categoria.model';

import { LicenciaCategoriaService } from './licencia-categoria.service';

describe('LicenciaCategoria Service', () => {
  let service: LicenciaCategoriaService;
  let httpMock: HttpTestingController;
  let elemDefault: ILicenciaCategoria;
  let expectedResult: ILicenciaCategoria | ILicenciaCategoria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LicenciaCategoriaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      categoria: 'AAAAAAA',
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

    it('should create a LicenciaCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LicenciaCategoria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LicenciaCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoria: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LicenciaCategoria', () => {
      const patchObject = Object.assign({}, new LicenciaCategoria());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LicenciaCategoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoria: 'BBBBBB',
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

    it('should delete a LicenciaCategoria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLicenciaCategoriaToCollectionIfMissing', () => {
      it('should add a LicenciaCategoria to an empty array', () => {
        const licenciaCategoria: ILicenciaCategoria = { id: 123 };
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing([], licenciaCategoria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(licenciaCategoria);
      });

      it('should not add a LicenciaCategoria to an array that contains it', () => {
        const licenciaCategoria: ILicenciaCategoria = { id: 123 };
        const licenciaCategoriaCollection: ILicenciaCategoria[] = [
          {
            ...licenciaCategoria,
          },
          { id: 456 },
        ];
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing(licenciaCategoriaCollection, licenciaCategoria);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LicenciaCategoria to an array that doesn't contain it", () => {
        const licenciaCategoria: ILicenciaCategoria = { id: 123 };
        const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 456 }];
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing(licenciaCategoriaCollection, licenciaCategoria);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(licenciaCategoria);
      });

      it('should add only unique LicenciaCategoria to an array', () => {
        const licenciaCategoriaArray: ILicenciaCategoria[] = [{ id: 123 }, { id: 456 }, { id: 78427 }];
        const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 123 }];
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing(licenciaCategoriaCollection, ...licenciaCategoriaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const licenciaCategoria: ILicenciaCategoria = { id: 123 };
        const licenciaCategoria2: ILicenciaCategoria = { id: 456 };
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing([], licenciaCategoria, licenciaCategoria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(licenciaCategoria);
        expect(expectedResult).toContain(licenciaCategoria2);
      });

      it('should accept null and undefined values', () => {
        const licenciaCategoria: ILicenciaCategoria = { id: 123 };
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing([], null, licenciaCategoria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(licenciaCategoria);
      });

      it('should return initial array if no LicenciaCategoria is added', () => {
        const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 123 }];
        expectedResult = service.addLicenciaCategoriaToCollectionIfMissing(licenciaCategoriaCollection, undefined, null);
        expect(expectedResult).toEqual(licenciaCategoriaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
