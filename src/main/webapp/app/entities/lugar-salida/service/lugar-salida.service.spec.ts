import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILugarSalida, LugarSalida } from '../lugar-salida.model';

import { LugarSalidaService } from './lugar-salida.service';

describe('LugarSalida Service', () => {
  let service: LugarSalidaService;
  let httpMock: HttpTestingController;
  let elemDefault: ILugarSalida;
  let expectedResult: ILugarSalida | ILugarSalida[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LugarSalidaService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
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

    it('should create a LugarSalida', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LugarSalida()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LugarSalida', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LugarSalida', () => {
      const patchObject = Object.assign({}, new LugarSalida());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LugarSalida', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
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

    it('should delete a LugarSalida', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLugarSalidaToCollectionIfMissing', () => {
      it('should add a LugarSalida to an empty array', () => {
        const lugarSalida: ILugarSalida = { id: 123 };
        expectedResult = service.addLugarSalidaToCollectionIfMissing([], lugarSalida);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lugarSalida);
      });

      it('should not add a LugarSalida to an array that contains it', () => {
        const lugarSalida: ILugarSalida = { id: 123 };
        const lugarSalidaCollection: ILugarSalida[] = [
          {
            ...lugarSalida,
          },
          { id: 456 },
        ];
        expectedResult = service.addLugarSalidaToCollectionIfMissing(lugarSalidaCollection, lugarSalida);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LugarSalida to an array that doesn't contain it", () => {
        const lugarSalida: ILugarSalida = { id: 123 };
        const lugarSalidaCollection: ILugarSalida[] = [{ id: 456 }];
        expectedResult = service.addLugarSalidaToCollectionIfMissing(lugarSalidaCollection, lugarSalida);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lugarSalida);
      });

      it('should add only unique LugarSalida to an array', () => {
        const lugarSalidaArray: ILugarSalida[] = [{ id: 123 }, { id: 456 }, { id: 98724 }];
        const lugarSalidaCollection: ILugarSalida[] = [{ id: 123 }];
        expectedResult = service.addLugarSalidaToCollectionIfMissing(lugarSalidaCollection, ...lugarSalidaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const lugarSalida: ILugarSalida = { id: 123 };
        const lugarSalida2: ILugarSalida = { id: 456 };
        expectedResult = service.addLugarSalidaToCollectionIfMissing([], lugarSalida, lugarSalida2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lugarSalida);
        expect(expectedResult).toContain(lugarSalida2);
      });

      it('should accept null and undefined values', () => {
        const lugarSalida: ILugarSalida = { id: 123 };
        expectedResult = service.addLugarSalidaToCollectionIfMissing([], null, lugarSalida, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lugarSalida);
      });

      it('should return initial array if no LugarSalida is added', () => {
        const lugarSalidaCollection: ILugarSalida[] = [{ id: 123 }];
        expectedResult = service.addLugarSalidaToCollectionIfMissing(lugarSalidaCollection, undefined, null);
        expect(expectedResult).toEqual(lugarSalidaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
