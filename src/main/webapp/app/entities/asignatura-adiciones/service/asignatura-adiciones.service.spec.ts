import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { IAsignaturaAdiciones, AsignaturaAdiciones } from '../asignatura-adiciones.model';

import { AsignaturaAdicionesService } from './asignatura-adiciones.service';

describe('AsignaturaAdiciones Service', () => {
  let service: AsignaturaAdicionesService;
  let httpMock: HttpTestingController;
  let elemDefault: IAsignaturaAdiciones;
  let expectedResult: IAsignaturaAdiciones | IAsignaturaAdiciones[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AsignaturaAdicionesService);
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

    it('should create a AsignaturaAdiciones', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AsignaturaAdiciones()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AsignaturaAdiciones', () => {
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

    it('should partial update a AsignaturaAdiciones', () => {
      const patchObject = Object.assign(
        {
          imagen: 'BBBBBB',
        },
        new AsignaturaAdiciones()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AsignaturaAdiciones', () => {
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

    it('should delete a AsignaturaAdiciones', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAsignaturaAdicionesToCollectionIfMissing', () => {
      it('should add a AsignaturaAdiciones to an empty array', () => {
        const asignaturaAdiciones: IAsignaturaAdiciones = { id: 123 };
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing([], asignaturaAdiciones);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asignaturaAdiciones);
      });

      it('should not add a AsignaturaAdiciones to an array that contains it', () => {
        const asignaturaAdiciones: IAsignaturaAdiciones = { id: 123 };
        const asignaturaAdicionesCollection: IAsignaturaAdiciones[] = [
          {
            ...asignaturaAdiciones,
          },
          { id: 456 },
        ];
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing(asignaturaAdicionesCollection, asignaturaAdiciones);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AsignaturaAdiciones to an array that doesn't contain it", () => {
        const asignaturaAdiciones: IAsignaturaAdiciones = { id: 123 };
        const asignaturaAdicionesCollection: IAsignaturaAdiciones[] = [{ id: 456 }];
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing(asignaturaAdicionesCollection, asignaturaAdiciones);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asignaturaAdiciones);
      });

      it('should add only unique AsignaturaAdiciones to an array', () => {
        const asignaturaAdicionesArray: IAsignaturaAdiciones[] = [{ id: 123 }, { id: 456 }, { id: 28266 }];
        const asignaturaAdicionesCollection: IAsignaturaAdiciones[] = [{ id: 123 }];
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing(asignaturaAdicionesCollection, ...asignaturaAdicionesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const asignaturaAdiciones: IAsignaturaAdiciones = { id: 123 };
        const asignaturaAdiciones2: IAsignaturaAdiciones = { id: 456 };
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing([], asignaturaAdiciones, asignaturaAdiciones2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asignaturaAdiciones);
        expect(expectedResult).toContain(asignaturaAdiciones2);
      });

      it('should accept null and undefined values', () => {
        const asignaturaAdiciones: IAsignaturaAdiciones = { id: 123 };
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing([], null, asignaturaAdiciones, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asignaturaAdiciones);
      });

      it('should return initial array if no AsignaturaAdiciones is added', () => {
        const asignaturaAdicionesCollection: IAsignaturaAdiciones[] = [{ id: 123 }];
        expectedResult = service.addAsignaturaAdicionesToCollectionIfMissing(asignaturaAdicionesCollection, undefined, null);
        expect(expectedResult).toEqual(asignaturaAdicionesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
