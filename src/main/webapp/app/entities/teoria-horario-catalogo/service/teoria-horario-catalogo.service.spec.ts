import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { ITeoriaHorarioCatalogo, TeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';

import { TeoriaHorarioCatalogoService } from './teoria-horario-catalogo.service';

describe('TeoriaHorarioCatalogo Service', () => {
  let service: TeoriaHorarioCatalogoService;
  let httpMock: HttpTestingController;
  let elemDefault: ITeoriaHorarioCatalogo;
  let expectedResult: ITeoriaHorarioCatalogo | ITeoriaHorarioCatalogo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TeoriaHorarioCatalogoService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      nombre: 'AAAAAAA',
      nombreCorto: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
      periodo: 'AAAAAAA',
      anio: 'AAAAAAA',
      mes: 'AAAAAAA',
      dia: 'AAAAAAA',
      horaInicio: 0,
      horaFin: 0,
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

    it('should create a TeoriaHorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TeoriaHorarioCatalogo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TeoriaHorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          periodo: 'BBBBBB',
          anio: 'BBBBBB',
          mes: 'BBBBBB',
          dia: 'BBBBBB',
          horaInicio: 1,
          horaFin: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TeoriaHorarioCatalogo', () => {
      const patchObject = Object.assign(
        {
          activo: 'BBBBBB',
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          dia: 'BBBBBB',
          horaInicio: 1,
          horaFin: 1,
        },
        new TeoriaHorarioCatalogo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TeoriaHorarioCatalogo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          nombre: 'BBBBBB',
          nombreCorto: 'BBBBBB',
          descripcion: 'BBBBBB',
          imagen: 'BBBBBB',
          periodo: 'BBBBBB',
          anio: 'BBBBBB',
          mes: 'BBBBBB',
          dia: 'BBBBBB',
          horaInicio: 1,
          horaFin: 1,
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

    it('should delete a TeoriaHorarioCatalogo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTeoriaHorarioCatalogoToCollectionIfMissing', () => {
      it('should add a TeoriaHorarioCatalogo to an empty array', () => {
        const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 123 };
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing([], teoriaHorarioCatalogo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(teoriaHorarioCatalogo);
      });

      it('should not add a TeoriaHorarioCatalogo to an array that contains it', () => {
        const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 123 };
        const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [
          {
            ...teoriaHorarioCatalogo,
          },
          { id: 456 },
        ];
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing(teoriaHorarioCatalogoCollection, teoriaHorarioCatalogo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TeoriaHorarioCatalogo to an array that doesn't contain it", () => {
        const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 123 };
        const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 456 }];
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing(teoriaHorarioCatalogoCollection, teoriaHorarioCatalogo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(teoriaHorarioCatalogo);
      });

      it('should add only unique TeoriaHorarioCatalogo to an array', () => {
        const teoriaHorarioCatalogoArray: ITeoriaHorarioCatalogo[] = [{ id: 123 }, { id: 456 }, { id: 89553 }];
        const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 123 }];
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing(
          teoriaHorarioCatalogoCollection,
          ...teoriaHorarioCatalogoArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 123 };
        const teoriaHorarioCatalogo2: ITeoriaHorarioCatalogo = { id: 456 };
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing([], teoriaHorarioCatalogo, teoriaHorarioCatalogo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(teoriaHorarioCatalogo);
        expect(expectedResult).toContain(teoriaHorarioCatalogo2);
      });

      it('should accept null and undefined values', () => {
        const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 123 };
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing([], null, teoriaHorarioCatalogo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(teoriaHorarioCatalogo);
      });

      it('should return initial array if no TeoriaHorarioCatalogo is added', () => {
        const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 123 }];
        expectedResult = service.addTeoriaHorarioCatalogoToCollectionIfMissing(teoriaHorarioCatalogoCollection, undefined, null);
        expect(expectedResult).toEqual(teoriaHorarioCatalogoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
