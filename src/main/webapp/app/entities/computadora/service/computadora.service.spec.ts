import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { ComputadoraTipo } from 'app/entities/enumerations/computadora-tipo.model';
import { IComputadora, Computadora } from '../computadora.model';

import { ComputadoraService } from './computadora.service';

describe('Computadora Service', () => {
  let service: ComputadoraService;
  let httpMock: HttpTestingController;
  let elemDefault: IComputadora;
  let expectedResult: IComputadora | IComputadora[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ComputadoraService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      nombreCorto: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      estadoComputadora: Estado.HABILITADO,
      mac: 'AAAAAAA',
      tipo: ComputadoraTipo.SERVIDOR,
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

    it('should create a Computadora', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Computadora()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Computadora', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          estadoComputadora: 'BBBBBB',
          mac: 'BBBBBB',
          tipo: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Computadora', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          mac: 'BBBBBB',
          tipo: 'BBBBBB',
        },
        new Computadora()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Computadora', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          estadoComputadora: 'BBBBBB',
          mac: 'BBBBBB',
          tipo: 'BBBBBB',
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

    it('should delete a Computadora', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addComputadoraToCollectionIfMissing', () => {
      it('should add a Computadora to an empty array', () => {
        const computadora: IComputadora = { id: 123 };
        expectedResult = service.addComputadoraToCollectionIfMissing([], computadora);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(computadora);
      });

      it('should not add a Computadora to an array that contains it', () => {
        const computadora: IComputadora = { id: 123 };
        const computadoraCollection: IComputadora[] = [
          {
            ...computadora,
          },
          { id: 456 },
        ];
        expectedResult = service.addComputadoraToCollectionIfMissing(computadoraCollection, computadora);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Computadora to an array that doesn't contain it", () => {
        const computadora: IComputadora = { id: 123 };
        const computadoraCollection: IComputadora[] = [{ id: 456 }];
        expectedResult = service.addComputadoraToCollectionIfMissing(computadoraCollection, computadora);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(computadora);
      });

      it('should add only unique Computadora to an array', () => {
        const computadoraArray: IComputadora[] = [{ id: 123 }, { id: 456 }, { id: 38450 }];
        const computadoraCollection: IComputadora[] = [{ id: 123 }];
        expectedResult = service.addComputadoraToCollectionIfMissing(computadoraCollection, ...computadoraArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const computadora: IComputadora = { id: 123 };
        const computadora2: IComputadora = { id: 456 };
        expectedResult = service.addComputadoraToCollectionIfMissing([], computadora, computadora2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(computadora);
        expect(expectedResult).toContain(computadora2);
      });

      it('should accept null and undefined values', () => {
        const computadora: IComputadora = { id: 123 };
        expectedResult = service.addComputadoraToCollectionIfMissing([], null, computadora, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(computadora);
      });

      it('should return initial array if no Computadora is added', () => {
        const computadoraCollection: IComputadora[] = [{ id: 123 }];
        expectedResult = service.addComputadoraToCollectionIfMissing(computadoraCollection, undefined, null);
        expect(expectedResult).toEqual(computadoraCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
