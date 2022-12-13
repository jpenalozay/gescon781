import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInscripcionDescuento, InscripcionDescuento } from '../inscripcion-descuento.model';
import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';

import { InscripcionDescuentoRoutingResolveService } from './inscripcion-descuento-routing-resolve.service';

describe('InscripcionDescuento routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InscripcionDescuentoRoutingResolveService;
  let service: InscripcionDescuentoService;
  let resultInscripcionDescuento: IInscripcionDescuento | undefined;

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
    routingResolveService = TestBed.inject(InscripcionDescuentoRoutingResolveService);
    service = TestBed.inject(InscripcionDescuentoService);
    resultInscripcionDescuento = undefined;
  });

  describe('resolve', () => {
    it('should return IInscripcionDescuento returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDescuento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionDescuento).toEqual({ id: 123 });
    });

    it('should return new IInscripcionDescuento if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDescuento = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInscripcionDescuento).toEqual(new InscripcionDescuento());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InscripcionDescuento })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDescuento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionDescuento).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
