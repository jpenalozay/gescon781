import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ISucursalSerie, SucursalSerie } from '../sucursal-serie.model';
import { SucursalSerieService } from '../service/sucursal-serie.service';

import { SucursalSerieRoutingResolveService } from './sucursal-serie-routing-resolve.service';

describe('SucursalSerie routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SucursalSerieRoutingResolveService;
  let service: SucursalSerieService;
  let resultSucursalSerie: ISucursalSerie | undefined;

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
    routingResolveService = TestBed.inject(SucursalSerieRoutingResolveService);
    service = TestBed.inject(SucursalSerieService);
    resultSucursalSerie = undefined;
  });

  describe('resolve', () => {
    it('should return ISucursalSerie returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSucursalSerie = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSucursalSerie).toEqual({ id: 123 });
    });

    it('should return new ISucursalSerie if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSucursalSerie = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSucursalSerie).toEqual(new SucursalSerie());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as SucursalSerie })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSucursalSerie = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSucursalSerie).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
