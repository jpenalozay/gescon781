import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAsignaturaAdiciones, AsignaturaAdiciones } from '../asignatura-adiciones.model';
import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';

import { AsignaturaAdicionesRoutingResolveService } from './asignatura-adiciones-routing-resolve.service';

describe('AsignaturaAdiciones routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AsignaturaAdicionesRoutingResolveService;
  let service: AsignaturaAdicionesService;
  let resultAsignaturaAdiciones: IAsignaturaAdiciones | undefined;

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
    routingResolveService = TestBed.inject(AsignaturaAdicionesRoutingResolveService);
    service = TestBed.inject(AsignaturaAdicionesService);
    resultAsignaturaAdiciones = undefined;
  });

  describe('resolve', () => {
    it('should return IAsignaturaAdiciones returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaAdiciones = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAsignaturaAdiciones).toEqual({ id: 123 });
    });

    it('should return new IAsignaturaAdiciones if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaAdiciones = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAsignaturaAdiciones).toEqual(new AsignaturaAdiciones());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as AsignaturaAdiciones })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaAdiciones = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAsignaturaAdiciones).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
