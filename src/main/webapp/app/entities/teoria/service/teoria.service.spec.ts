import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { ITeoria, Teoria } from '../teoria.model';

import { TeoriaService } from './teoria.service';

describe('Teoria Service', () => {
  let service: TeoriaService;
  let httpMock: HttpTestingController;
  let elemDefault: ITeoria;
  let expectedResult: ITeoria | ITeoria[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TeoriaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
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

    it('should create a Teoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Teoria()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Teoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
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

    it('should partial update a Teoria', () => {
      const patchObject = Object.assign(
        {
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        new Teoria()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Teoria', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
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

    it('should delete a Teoria', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTeoriaToCollectionIfMissing', () => {
      it('should add a Teoria to an empty array', () => {
        const teoria: ITeoria = { id: 123 };
        expectedResult = service.addTeoriaToCollectionIfMissing([], teoria);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(teoria);
      });

      it('should not add a Teoria to an array that contains it', () => {
        const teoria: ITeoria = { id: 123 };
        const teoriaCollection: ITeoria[] = [
          {
            ...teoria,
          },
          { id: 456 },
        ];
        expectedResult = service.addTeoriaToCollectionIfMissing(teoriaCollection, teoria);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Teoria to an array that doesn't contain it", () => {
        const teoria: ITeoria = { id: 123 };
        const teoriaCollection: ITeoria[] = [{ id: 456 }];
        expectedResult = service.addTeoriaToCollectionIfMissing(teoriaCollection, teoria);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(teoria);
      });

      it('should add only unique Teoria to an array', () => {
        const teoriaArray: ITeoria[] = [{ id: 123 }, { id: 456 }, { id: 4996 }];
        const teoriaCollection: ITeoria[] = [{ id: 123 }];
        expectedResult = service.addTeoriaToCollectionIfMissing(teoriaCollection, ...teoriaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const teoria: ITeoria = { id: 123 };
        const teoria2: ITeoria = { id: 456 };
        expectedResult = service.addTeoriaToCollectionIfMissing([], teoria, teoria2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(teoria);
        expect(expectedResult).toContain(teoria2);
      });

      it('should accept null and undefined values', () => {
        const teoria: ITeoria = { id: 123 };
        expectedResult = service.addTeoriaToCollectionIfMissing([], null, teoria, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(teoria);
      });

      it('should return initial array if no Teoria is added', () => {
        const teoriaCollection: ITeoria[] = [{ id: 123 }];
        expectedResult = service.addTeoriaToCollectionIfMissing(teoriaCollection, undefined, null);
        expect(expectedResult).toEqual(teoriaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
