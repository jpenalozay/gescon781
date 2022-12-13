import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDia, Dia } from '../dia.model';

import { DiaService } from './dia.service';

describe('Dia Service', () => {
  let service: DiaService;
  let httpMock: HttpTestingController;
  let elemDefault: IDia;
  let expectedResult: IDia | IDia[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DiaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      nombreCorto: 'AAAAAAA',
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

    it('should create a Dia', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Dia()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Dia', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Dia', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
        },
        new Dia()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Dia', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
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

    it('should delete a Dia', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDiaToCollectionIfMissing', () => {
      it('should add a Dia to an empty array', () => {
        const dia: IDia = { id: 123 };
        expectedResult = service.addDiaToCollectionIfMissing([], dia);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dia);
      });

      it('should not add a Dia to an array that contains it', () => {
        const dia: IDia = { id: 123 };
        const diaCollection: IDia[] = [
          {
            ...dia,
          },
          { id: 456 },
        ];
        expectedResult = service.addDiaToCollectionIfMissing(diaCollection, dia);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Dia to an array that doesn't contain it", () => {
        const dia: IDia = { id: 123 };
        const diaCollection: IDia[] = [{ id: 456 }];
        expectedResult = service.addDiaToCollectionIfMissing(diaCollection, dia);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dia);
      });

      it('should add only unique Dia to an array', () => {
        const diaArray: IDia[] = [{ id: 123 }, { id: 456 }, { id: 2315 }];
        const diaCollection: IDia[] = [{ id: 123 }];
        expectedResult = service.addDiaToCollectionIfMissing(diaCollection, ...diaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dia: IDia = { id: 123 };
        const dia2: IDia = { id: 456 };
        expectedResult = service.addDiaToCollectionIfMissing([], dia, dia2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dia);
        expect(expectedResult).toContain(dia2);
      });

      it('should accept null and undefined values', () => {
        const dia: IDia = { id: 123 };
        expectedResult = service.addDiaToCollectionIfMissing([], null, dia, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dia);
      });

      it('should return initial array if no Dia is added', () => {
        const diaCollection: IDia[] = [{ id: 123 }];
        expectedResult = service.addDiaToCollectionIfMissing(diaCollection, undefined, null);
        expect(expectedResult).toEqual(diaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
