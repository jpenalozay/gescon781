import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHorarioDeshabilitacion, HorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';

import { HorarioDeshabilitacionRoutingResolveService } from './horario-deshabilitacion-routing-resolve.service';

describe('HorarioDeshabilitacion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HorarioDeshabilitacionRoutingResolveService;
  let service: HorarioDeshabilitacionService;
  let resultHorarioDeshabilitacion: IHorarioDeshabilitacion | undefined;

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
    routingResolveService = TestBed.inject(HorarioDeshabilitacionRoutingResolveService);
    service = TestBed.inject(HorarioDeshabilitacionService);
    resultHorarioDeshabilitacion = undefined;
  });

  describe('resolve', () => {
    it('should return IHorarioDeshabilitacion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioDeshabilitacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioDeshabilitacion).toEqual({ id: 123 });
    });

    it('should return new IHorarioDeshabilitacion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioDeshabilitacion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHorarioDeshabilitacion).toEqual(new HorarioDeshabilitacion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as HorarioDeshabilitacion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioDeshabilitacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioDeshabilitacion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
