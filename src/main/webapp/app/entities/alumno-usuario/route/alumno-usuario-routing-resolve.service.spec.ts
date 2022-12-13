import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAlumnoUsuario, AlumnoUsuario } from '../alumno-usuario.model';
import { AlumnoUsuarioService } from '../service/alumno-usuario.service';

import { AlumnoUsuarioRoutingResolveService } from './alumno-usuario-routing-resolve.service';

describe('AlumnoUsuario routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AlumnoUsuarioRoutingResolveService;
  let service: AlumnoUsuarioService;
  let resultAlumnoUsuario: IAlumnoUsuario | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(AlumnoUsuarioRoutingResolveService);
    service = TestBed.inject(AlumnoUsuarioService);
    resultAlumnoUsuario = undefined;
  });

  describe('resolve', () => {
    it('should return IAlumnoUsuario returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAlumnoUsuario).toEqual({ id: 123 });
    });

    it('should return new IAlumnoUsuario if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoUsuario = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAlumnoUsuario).toEqual(new AlumnoUsuario());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as AlumnoUsuario })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAlumnoUsuario).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
