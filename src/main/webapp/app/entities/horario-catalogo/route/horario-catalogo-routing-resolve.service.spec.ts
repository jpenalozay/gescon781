import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHorarioCatalogo, HorarioCatalogo } from '../horario-catalogo.model';
import { HorarioCatalogoService } from '../service/horario-catalogo.service';

import { HorarioCatalogoRoutingResolveService } from './horario-catalogo-routing-resolve.service';

describe('HorarioCatalogo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HorarioCatalogoRoutingResolveService;
  let service: HorarioCatalogoService;
  let resultHorarioCatalogo: IHorarioCatalogo | undefined;

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
    routingResolveService = TestBed.inject(HorarioCatalogoRoutingResolveService);
    service = TestBed.inject(HorarioCatalogoService);
    resultHorarioCatalogo = undefined;
  });

  describe('resolve', () => {
    it('should return IHorarioCatalogo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioCatalogo).toEqual({ id: 123 });
    });

    it('should return new IHorarioCatalogo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHorarioCatalogo).toEqual(new HorarioCatalogo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as HorarioCatalogo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioCatalogo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
