import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Estado } from 'app/entities/enumerations/estado.model';
import { IAlumnoUsuario, AlumnoUsuario } from '../alumno-usuario.model';

import { AlumnoUsuarioService } from './alumno-usuario.service';

describe('AlumnoUsuario Service', () => {
  let service: AlumnoUsuarioService;
  let httpMock: HttpTestingController;
  let elemDefault: IAlumnoUsuario;
  let expectedResult: IAlumnoUsuario | IAlumnoUsuario[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AlumnoUsuarioService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      activo: Estado.HABILITADO,
      usuario: 'AAAAAAA',
      clave: 'AAAAAAA',
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

    it('should create a AlumnoUsuario', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new AlumnoUsuario()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AlumnoUsuario', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          usuario: 'BBBBBB',
          clave: 'BBBBBB',
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

    it('should partial update a AlumnoUsuario', () => {
      const patchObject = Object.assign(
        {
          usuario: 'BBBBBB',
          clave: 'BBBBBB',
          imagen: 'BBBBBB',
        },
        new AlumnoUsuario()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AlumnoUsuario', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          activo: 'BBBBBB',
          usuario: 'BBBBBB',
          clave: 'BBBBBB',
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

    it('should delete a AlumnoUsuario', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addAlumnoUsuarioToCollectionIfMissing', () => {
      it('should add a AlumnoUsuario to an empty array', () => {
        const alumnoUsuario: IAlumnoUsuario = { id: 123 };
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing([], alumnoUsuario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoUsuario);
      });

      it('should not add a AlumnoUsuario to an array that contains it', () => {
        const alumnoUsuario: IAlumnoUsuario = { id: 123 };
        const alumnoUsuarioCollection: IAlumnoUsuario[] = [
          {
            ...alumnoUsuario,
          },
          { id: 456 },
        ];
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing(alumnoUsuarioCollection, alumnoUsuario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AlumnoUsuario to an array that doesn't contain it", () => {
        const alumnoUsuario: IAlumnoUsuario = { id: 123 };
        const alumnoUsuarioCollection: IAlumnoUsuario[] = [{ id: 456 }];
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing(alumnoUsuarioCollection, alumnoUsuario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoUsuario);
      });

      it('should add only unique AlumnoUsuario to an array', () => {
        const alumnoUsuarioArray: IAlumnoUsuario[] = [{ id: 123 }, { id: 456 }, { id: 61047 }];
        const alumnoUsuarioCollection: IAlumnoUsuario[] = [{ id: 123 }];
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing(alumnoUsuarioCollection, ...alumnoUsuarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const alumnoUsuario: IAlumnoUsuario = { id: 123 };
        const alumnoUsuario2: IAlumnoUsuario = { id: 456 };
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing([], alumnoUsuario, alumnoUsuario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(alumnoUsuario);
        expect(expectedResult).toContain(alumnoUsuario2);
      });

      it('should accept null and undefined values', () => {
        const alumnoUsuario: IAlumnoUsuario = { id: 123 };
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing([], null, alumnoUsuario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(alumnoUsuario);
      });

      it('should return initial array if no AlumnoUsuario is added', () => {
        const alumnoUsuarioCollection: IAlumnoUsuario[] = [{ id: 123 }];
        expectedResult = service.addAlumnoUsuarioToCollectionIfMissing(alumnoUsuarioCollection, undefined, null);
        expect(expectedResult).toEqual(alumnoUsuarioCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
