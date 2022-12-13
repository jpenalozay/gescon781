import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDistrit } from '../distrit.model';

import { DistritService } from './distrit.service';

describe('Distrit Service', () => {
  let service: DistritService;
  let httpMock: HttpTestingController;
  let elemDefault: IDistrit;
  let expectedResult: IDistrit | IDistrit[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DistritService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      departamento: 'AAAAAAA',
      provincia: 'AAAAAAA',
      distrito: 'AAAAAAA',
      ubigeo: 'AAAAAAA',
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

    it('should return a list of Distrit', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          departamento: 'BBBBBB',
          provincia: 'BBBBBB',
          distrito: 'BBBBBB',
          ubigeo: 'BBBBBB',
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

    describe('addDistritToCollectionIfMissing', () => {
      it('should add a Distrit to an empty array', () => {
        const distrit: IDistrit = { id: 123 };
        expectedResult = service.addDistritToCollectionIfMissing([], distrit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distrit);
      });

      it('should not add a Distrit to an array that contains it', () => {
        const distrit: IDistrit = { id: 123 };
        const distritCollection: IDistrit[] = [
          {
            ...distrit,
          },
          { id: 456 },
        ];
        expectedResult = service.addDistritToCollectionIfMissing(distritCollection, distrit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Distrit to an array that doesn't contain it", () => {
        const distrit: IDistrit = { id: 123 };
        const distritCollection: IDistrit[] = [{ id: 456 }];
        expectedResult = service.addDistritToCollectionIfMissing(distritCollection, distrit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distrit);
      });

      it('should add only unique Distrit to an array', () => {
        const distritArray: IDistrit[] = [{ id: 123 }, { id: 456 }, { id: 6019 }];
        const distritCollection: IDistrit[] = [{ id: 123 }];
        expectedResult = service.addDistritToCollectionIfMissing(distritCollection, ...distritArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const distrit: IDistrit = { id: 123 };
        const distrit2: IDistrit = { id: 456 };
        expectedResult = service.addDistritToCollectionIfMissing([], distrit, distrit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(distrit);
        expect(expectedResult).toContain(distrit2);
      });

      it('should accept null and undefined values', () => {
        const distrit: IDistrit = { id: 123 };
        expectedResult = service.addDistritToCollectionIfMissing([], null, distrit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(distrit);
      });

      it('should return initial array if no Distrit is added', () => {
        const distritCollection: IDistrit[] = [{ id: 123 }];
        expectedResult = service.addDistritToCollectionIfMissing(distritCollection, undefined, null);
        expect(expectedResult).toEqual(distritCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
