import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAlumnoDesarrollo, AlumnoDesarrollo } from '../alumno-desarrollo.model';
import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';

import { AlumnoDesarrolloRoutingResolveService } from './alumno-desarrollo-routing-resolve.service';

describe('AlumnoDesarrollo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AlumnoDesarrolloRoutingResolveService;
  let service: AlumnoDesarrolloService;
  let resultAlumnoDesarrollo: IAlumnoDesarrollo | undefined;

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
    routingResolveService = TestBed.inject(AlumnoDesarrolloRoutingResolveService);
    service = TestBed.inject(AlumnoDesarrolloService);
    resultAlumnoDesarrollo = undefined;
  });

  describe('resolve', () => {
    it('should return IAlumnoDesarrollo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoDesarrollo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAlumnoDesarrollo).toEqual({ id: 123 });
    });

    it('should return new IAlumnoDesarrollo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoDesarrollo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAlumnoDesarrollo).toEqual(new AlumnoDesarrollo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as AlumnoDesarrollo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAlumnoDesarrollo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAlumnoDesarrollo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
