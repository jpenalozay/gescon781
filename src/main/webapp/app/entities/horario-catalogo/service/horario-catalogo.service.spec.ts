import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { IHorarioCatalogo, HorarioCatalogo } from '../horario-catalogo.model';

import { HorarioCatalogoService } from './horario-catalogo.service';

describe('HorarioCatalogo Service', () => {
  let service: HorarioCatalogoService;
  let httpMock: HttpTestingController;
  let elemDefault: IHorarioCatalogo;
  let expectedResult: IHorarioCatalogo | IHorarioCatalogo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HorarioCatalogoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      codigo: 0,
      horaInicio: 'AAAAAAA',
      horaFin: 'AAAAAAA',
      descripcion: 'AAAAAAA',
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

    it('should create a HorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new HorarioCatalogo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 1,
          horaInicio: 'BBBBBB',
          horaFin: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HorarioCatalogo', () => {
      const patchObject = Object.assign(
        {
          horaInicio: 'BBBBBB',
          horaFin: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        new HorarioCatalogo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 1,
          horaInicio: 'BBBBBB',
          horaFin: 'BBBBBB',
          descripcion: 'BBBBBB',
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

    it('should delete a HorarioCatalogo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHorarioCatalogoToCollectionIfMissing', () => {
      it('should add a HorarioCatalogo to an empty array', () => {
        const horarioCatalogo: IHorarioCatalogo = { id: 123 };
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing([], horarioCatalogo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioCatalogo);
      });

      it('should not add a HorarioCatalogo to an array that contains it', () => {
        const horarioCatalogo: IHorarioCatalogo = { id: 123 };
        const horarioCatalogoCollection: IHorarioCatalogo[] = [
          {
            ...horarioCatalogo,
          },
          { id: 456 },
        ];
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing(horarioCatalogoCollection, horarioCatalogo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HorarioCatalogo to an array that doesn't contain it", () => {
        const horarioCatalogo: IHorarioCatalogo = { id: 123 };
        const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 456 }];
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing(horarioCatalogoCollection, horarioCatalogo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioCatalogo);
      });

      it('should add only unique HorarioCatalogo to an array', () => {
        const horarioCatalogoArray: IHorarioCatalogo[] = [{ id: 123 }, { id: 456 }, { id: 64385 }];
        const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 123 }];
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing(horarioCatalogoCollection, ...horarioCatalogoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const horarioCatalogo: IHorarioCatalogo = { id: 123 };
        const horarioCatalogo2: IHorarioCatalogo = { id: 456 };
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing([], horarioCatalogo, horarioCatalogo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(horarioCatalogo);
        expect(expectedResult).toContain(horarioCatalogo2);
      });

      it('should accept null and undefined values', () => {
        const horarioCatalogo: IHorarioCatalogo = { id: 123 };
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing([], null, horarioCatalogo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(horarioCatalogo);
      });

      it('should return initial array if no HorarioCatalogo is added', () => {
        const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 123 }];
        expectedResult = service.addHorarioCatalogoToCollectionIfMissing(horarioCatalogoCollection, undefined, null);
        expect(expectedResult).toEqual(horarioCatalogoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
