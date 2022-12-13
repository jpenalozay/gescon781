import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProgramacionDeshabilitacion, ProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';

import { ProgramacionDeshabilitacionRoutingResolveService } from './programacion-deshabilitacion-routing-resolve.service';

describe('ProgramacionDeshabilitacion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProgramacionDeshabilitacionRoutingResolveService;
  let service: ProgramacionDeshabilitacionService;
  let resultProgramacionDeshabilitacion: IProgramacionDeshabilitacion | undefined;

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
    routingResolveService = TestBed.inject(ProgramacionDeshabilitacionRoutingResolveService);
    service = TestBed.inject(ProgramacionDeshabilitacionService);
    resultProgramacionDeshabilitacion = undefined;
  });

  describe('resolve', () => {
    it('should return IProgramacionDeshabilitacion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacionDeshabilitacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProgramacionDeshabilitacion).toEqual({ id: 123 });
    });

    it('should return new IProgramacionDeshabilitacion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacionDeshabilitacion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProgramacionDeshabilitacion).toEqual(new ProgramacionDeshabilitacion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ProgramacionDeshabilitacion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacionDeshabilitacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProgramacionDeshabilitacion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
