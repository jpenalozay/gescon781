import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInscripcionDescuento, InscripcionDescuento } from '../inscripcion-descuento.model';

import { InscripcionDescuentoService } from './inscripcion-descuento.service';

describe('InscripcionDescuento Service', () => {
  let service: InscripcionDescuentoService;
  let httpMock: HttpTestingController;
  let elemDefault: IInscripcionDescuento;
  let expectedResult: IInscripcionDescuento | IInscripcionDescuento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InscripcionDescuentoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      descripcion: 'AAAAAAA',
      monto: 0,
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

    it('should create a InscripcionDescuento', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new InscripcionDescuento()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InscripcionDescuento', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          monto: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a InscripcionDescuento', () => {
      const patchObject = Object.assign({}, new InscripcionDescuento());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InscripcionDescuento', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          descripcion: 'BBBBBB',
          monto: 1,
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

    it('should delete a InscripcionDescuento', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInscripcionDescuentoToCollectionIfMissing', () => {
      it('should add a InscripcionDescuento to an empty array', () => {
        const inscripcionDescuento: IInscripcionDescuento = { id: 123 };
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing([], inscripcionDescuento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionDescuento);
      });

      it('should not add a InscripcionDescuento to an array that contains it', () => {
        const inscripcionDescuento: IInscripcionDescuento = { id: 123 };
        const inscripcionDescuentoCollection: IInscripcionDescuento[] = [
          {
            ...inscripcionDescuento,
          },
          { id: 456 },
        ];
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing(inscripcionDescuentoCollection, inscripcionDescuento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InscripcionDescuento to an array that doesn't contain it", () => {
        const inscripcionDescuento: IInscripcionDescuento = { id: 123 };
        const inscripcionDescuentoCollection: IInscripcionDescuento[] = [{ id: 456 }];
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing(inscripcionDescuentoCollection, inscripcionDescuento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionDescuento);
      });

      it('should add only unique InscripcionDescuento to an array', () => {
        const inscripcionDescuentoArray: IInscripcionDescuento[] = [{ id: 123 }, { id: 456 }, { id: 76731 }];
        const inscripcionDescuentoCollection: IInscripcionDescuento[] = [{ id: 123 }];
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing(inscripcionDescuentoCollection, ...inscripcionDescuentoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const inscripcionDescuento: IInscripcionDescuento = { id: 123 };
        const inscripcionDescuento2: IInscripcionDescuento = { id: 456 };
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing([], inscripcionDescuento, inscripcionDescuento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(inscripcionDescuento);
        expect(expectedResult).toContain(inscripcionDescuento2);
      });

      it('should accept null and undefined values', () => {
        const inscripcionDescuento: IInscripcionDescuento = { id: 123 };
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing([], null, inscripcionDescuento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(inscripcionDescuento);
      });

      it('should return initial array if no InscripcionDescuento is added', () => {
        const inscripcionDescuentoCollection: IInscripcionDescuento[] = [{ id: 123 }];
        expectedResult = service.addInscripcionDescuentoToCollectionIfMissing(inscripcionDescuentoCollection, undefined, null);
        expect(expectedResult).toEqual(inscripcionDescuentoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
