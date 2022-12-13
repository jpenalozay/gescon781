import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILugarSalida, LugarSalida } from '../lugar-salida.model';
import { LugarSalidaService } from '../service/lugar-salida.service';

import { LugarSalidaRoutingResolveService } from './lugar-salida-routing-resolve.service';

describe('LugarSalida routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LugarSalidaRoutingResolveService;
  let service: LugarSalidaService;
  let resultLugarSalida: ILugarSalida | undefined;

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
    routingResolveService = TestBed.inject(LugarSalidaRoutingResolveService);
    service = TestBed.inject(LugarSalidaService);
    resultLugarSalida = undefined;
  });

  describe('resolve', () => {
    it('should return ILugarSalida returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLugarSalida = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLugarSalida).toEqual({ id: 123 });
    });

    it('should return new ILugarSalida if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLugarSalida = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLugarSalida).toEqual(new LugarSalida());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LugarSalida })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLugarSalida = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLugarSalida).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
