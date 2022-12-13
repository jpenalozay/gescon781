import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { SiNo } from 'app/entities/enumerations/si-no.model';
import { RequitisoTipo } from 'app/entities/enumerations/requitiso-tipo.model';
import { IRequisitosInscripcion, RequisitosInscripcion } from '../requisitos-inscripcion.model';

import { RequisitosInscripcionService } from './requisitos-inscripcion.service';

describe('RequisitosInscripcion Service', () => {
  let service: RequisitosInscripcionService;
  let httpMock: HttpTestingController;
  let elemDefault: IRequisitosInscripcion;
  let expectedResult: IRequisitosInscripcion | IRequisitosInscripcion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RequisitosInscripcionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      obligatorio: SiNo.SI,
      nombre: 'AAAAAAA',
      nombreCorto: 'AAAAAAA',
      costo: 0,
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
      tipoRequisito: RequitisoTipo.SELECTIVO,
      valores: 'AAAAAAA',
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

    it('should create a RequisitosInscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RequisitosInscripcion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RequisitosInscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          obligatorio: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          costo: 1,
          imagen: 'BBBBBB',
          tipoRequisito: 'BBBBBB',
          valores: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RequisitosInscripcion', () => {
      const patchObject = Object.assign(
        {
          obligatorio: 'BBBBBB',
          nombre: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        new RequisitosInscripcion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RequisitosInscripcion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          obligatorio: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          costo: 1,
          imagen: 'BBBBBB',
          tipoRequisito: 'BBBBBB',
          valores: 'BBBBBB',
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

    it('should delete a RequisitosInscripcion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRequisitosInscripcionToCollectionIfMissing', () => {
      it('should add a RequisitosInscripcion to an empty array', () => {
        const requisitosInscripcion: IRequisitosInscripcion = { id: 123 };
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing([], requisitosInscripcion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(requisitosInscripcion);
      });

      it('should not add a RequisitosInscripcion to an array that contains it', () => {
        const requisitosInscripcion: IRequisitosInscripcion = { id: 123 };
        const requisitosInscripcionCollection: IRequisitosInscripcion[] = [
          {
            ...requisitosInscripcion,
          },
          { id: 456 },
        ];
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing(requisitosInscripcionCollection, requisitosInscripcion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RequisitosInscripcion to an array that doesn't contain it", () => {
        const requisitosInscripcion: IRequisitosInscripcion = { id: 123 };
        const requisitosInscripcionCollection: IRequisitosInscripcion[] = [{ id: 456 }];
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing(requisitosInscripcionCollection, requisitosInscripcion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(requisitosInscripcion);
      });

      it('should add only unique RequisitosInscripcion to an array', () => {
        const requisitosInscripcionArray: IRequisitosInscripcion[] = [{ id: 123 }, { id: 456 }, { id: 58538 }];
        const requisitosInscripcionCollection: IRequisitosInscripcion[] = [{ id: 123 }];
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing(
          requisitosInscripcionCollection,
          ...requisitosInscripcionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const requisitosInscripcion: IRequisitosInscripcion = { id: 123 };
        const requisitosInscripcion2: IRequisitosInscripcion = { id: 456 };
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing([], requisitosInscripcion, requisitosInscripcion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(requisitosInscripcion);
        expect(expectedResult).toContain(requisitosInscripcion2);
      });

      it('should accept null and undefined values', () => {
        const requisitosInscripcion: IRequisitosInscripcion = { id: 123 };
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing([], null, requisitosInscripcion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(requisitosInscripcion);
      });

      it('should return initial array if no RequisitosInscripcion is added', () => {
        const requisitosInscripcionCollection: IRequisitosInscripcion[] = [{ id: 123 }];
        expectedResult = service.addRequisitosInscripcionToCollectionIfMissing(requisitosInscripcionCollection, undefined, null);
        expect(expectedResult).toEqual(requisitosInscripcionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
