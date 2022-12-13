import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { TipoRequisito } from 'app/entities/enumerations/tipo-requisito.model';
import { IAsignaturaRequisito, AsignaturaRequisito } from '../asignatura-requisito.model';

import { AsignaturaRequisitoService } from './asignatura-requisito.service';

describe('AsignaturaRequisito Service', () => {
  let service: AsignaturaRequisitoService;
  let httpMock: HttpTestingController;
  let elemDefault: IAsignaturaRequisito;
  let expectedResult: IAsignaturaRequisito | IAsignaturaRequisito[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AsignaturaRequisitoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      tipo: TipoRequisito.OBLIGATORIO,
      nombre: 'AAAAAAA',
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

    it('should create a AsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AsignaturaRequisito()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
          nombre: 'BBBBBB',
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

    it('should partial update a AsignaturaRequisito', () => {
      const patchObject = Object.assign(
        {
          tipo: 'BBBBBB',
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        new AsignaturaRequisito()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AsignaturaRequisito', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          tipo: 'BBBBBB',
          nombre: 'BBBBBB',
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

    it('should delete a AsignaturaRequisito', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAsignaturaRequisitoToCollectionIfMissing', () => {
      it('should add a AsignaturaRequisito to an empty array', () => {
        const asignaturaRequisito: IAsignaturaRequisito = { id: 123 };
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing([], asignaturaRequisito);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asignaturaRequisito);
      });

      it('should not add a AsignaturaRequisito to an array that contains it', () => {
        const asignaturaRequisito: IAsignaturaRequisito = { id: 123 };
        const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [
          {
            ...asignaturaRequisito,
          },
          { id: 456 },
        ];
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing(asignaturaRequisitoCollection, asignaturaRequisito);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AsignaturaRequisito to an array that doesn't contain it", () => {
        const asignaturaRequisito: IAsignaturaRequisito = { id: 123 };
        const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [{ id: 456 }];
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing(asignaturaRequisitoCollection, asignaturaRequisito);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asignaturaRequisito);
      });

      it('should add only unique AsignaturaRequisito to an array', () => {
        const asignaturaRequisitoArray: IAsignaturaRequisito[] = [{ id: 123 }, { id: 456 }, { id: 5391 }];
        const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [{ id: 123 }];
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing(asignaturaRequisitoCollection, ...asignaturaRequisitoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const asignaturaRequisito: IAsignaturaRequisito = { id: 123 };
        const asignaturaRequisito2: IAsignaturaRequisito = { id: 456 };
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing([], asignaturaRequisito, asignaturaRequisito2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(asignaturaRequisito);
        expect(expectedResult).toContain(asignaturaRequisito2);
      });

      it('should accept null and undefined values', () => {
        const asignaturaRequisito: IAsignaturaRequisito = { id: 123 };
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing([], null, asignaturaRequisito, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(asignaturaRequisito);
      });

      it('should return initial array if no AsignaturaRequisito is added', () => {
        const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [{ id: 123 }];
        expectedResult = service.addAsignaturaRequisitoToCollectionIfMissing(asignaturaRequisitoCollection, undefined, null);
        expect(expectedResult).toEqual(asignaturaRequisitoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
