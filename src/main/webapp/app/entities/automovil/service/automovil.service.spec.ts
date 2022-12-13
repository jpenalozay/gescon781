import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Estado } from 'app/entities/enumerations/estado.model';
import { AutomovilTipo } from 'app/entities/enumerations/automovil-tipo.model';
import { AutomovilCaja } from 'app/entities/enumerations/automovil-caja.model';
import { IAutomovil, Automovil } from '../automovil.model';

import { AutomovilService } from './automovil.service';

describe('Automovil Service', () => {
  let service: AutomovilService;
  let httpMock: HttpTestingController;
  let elemDefault: IAutomovil;
  let expectedResult: IAutomovil | IAutomovil[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AutomovilService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      codigo: 'AAAAAAA',
      nombre: 'AAAAAAA',
      tipo: AutomovilTipo.SEDAM,
      placa: 'AAAAAAA',
      marca: 'AAAAAAA',
      modelo: 'AAAAAAA',
      anio: 'AAAAAAA',
      soatVencimiento: currentDate,
      revisionTecnicaVencimiento: currentDate,
      caja: AutomovilCaja.MECANICO,
      imagenContentType: 'image/png',
      imagen: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          soatVencimiento: currentDate.format(DATE_TIME_FORMAT),
          revisionTecnicaVencimiento: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Automovil', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          soatVencimiento: currentDate.format(DATE_TIME_FORMAT),
          revisionTecnicaVencimiento: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          soatVencimiento: currentDate,
          revisionTecnicaVencimiento: currentDate,
        },
        returnedFromService
      );

      service.create(new Automovil()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Automovil', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 'BBBBBB',
          nombre: 'BBBBBB',
          tipo: 'BBBBBB',
          placa: 'BBBBBB',
          marca: 'BBBBBB',
          modelo: 'BBBBBB',
          anio: 'BBBBBB',
          soatVencimiento: currentDate.format(DATE_TIME_FORMAT),
          revisionTecnicaVencimiento: currentDate.format(DATE_TIME_FORMAT),
          caja: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          soatVencimiento: currentDate,
          revisionTecnicaVencimiento: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Automovil', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
          nombre: 'BBBBBB',
          placa: 'BBBBBB',
          modelo: 'BBBBBB',
          soatVencimiento: currentDate.format(DATE_TIME_FORMAT),
          revisionTecnicaVencimiento: currentDate.format(DATE_TIME_FORMAT),
          caja: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        new Automovil()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          soatVencimiento: currentDate,
          revisionTecnicaVencimiento: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Automovil', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          codigo: 'BBBBBB',
          nombre: 'BBBBBB',
          tipo: 'BBBBBB',
          placa: 'BBBBBB',
          marca: 'BBBBBB',
          modelo: 'BBBBBB',
          anio: 'BBBBBB',
          soatVencimiento: currentDate.format(DATE_TIME_FORMAT),
          revisionTecnicaVencimiento: currentDate.format(DATE_TIME_FORMAT),
          caja: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          soatVencimiento: currentDate,
          revisionTecnicaVencimiento: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Automovil', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAutomovilToCollectionIfMissing', () => {
      it('should add a Automovil to an empty array', () => {
        const automovil: IAutomovil = { id: 123 };
        expectedResult = service.addAutomovilToCollectionIfMissing([], automovil);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(automovil);
      });

      it('should not add a Automovil to an array that contains it', () => {
        const automovil: IAutomovil = { id: 123 };
        const automovilCollection: IAutomovil[] = [
          {
            ...automovil,
          },
          { id: 456 },
        ];
        expectedResult = service.addAutomovilToCollectionIfMissing(automovilCollection, automovil);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Automovil to an array that doesn't contain it", () => {
        const automovil: IAutomovil = { id: 123 };
        const automovilCollection: IAutomovil[] = [{ id: 456 }];
        expectedResult = service.addAutomovilToCollectionIfMissing(automovilCollection, automovil);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(automovil);
      });

      it('should add only unique Automovil to an array', () => {
        const automovilArray: IAutomovil[] = [{ id: 123 }, { id: 456 }, { id: 50258 }];
        const automovilCollection: IAutomovil[] = [{ id: 123 }];
        expectedResult = service.addAutomovilToCollectionIfMissing(automovilCollection, ...automovilArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const automovil: IAutomovil = { id: 123 };
        const automovil2: IAutomovil = { id: 456 };
        expectedResult = service.addAutomovilToCollectionIfMissing([], automovil, automovil2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(automovil);
        expect(expectedResult).toContain(automovil2);
      });

      it('should accept null and undefined values', () => {
        const automovil: IAutomovil = { id: 123 };
        expectedResult = service.addAutomovilToCollectionIfMissing([], null, automovil, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(automovil);
      });

      it('should return initial array if no Automovil is added', () => {
        const automovilCollection: IAutomovil[] = [{ id: 123 }];
        expectedResult = service.addAutomovilToCollectionIfMissing(automovilCollection, undefined, null);
        expect(expectedResult).toEqual(automovilCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
