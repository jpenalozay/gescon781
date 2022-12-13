import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInscripcionDetalle, InscripcionDetalle } from '../inscripcion-detalle.model';
import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';

import { InscripcionDetalleRoutingResolveService } from './inscripcion-detalle-routing-resolve.service';

describe('InscripcionDetalle routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InscripcionDetalleRoutingResolveService;
  let service: InscripcionDetalleService;
  let resultInscripcionDetalle: IInscripcionDetalle | undefined;

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
    routingResolveService = TestBed.inject(InscripcionDetalleRoutingResolveService);
    service = TestBed.inject(InscripcionDetalleService);
    resultInscripcionDetalle = undefined;
  });

  describe('resolve', () => {
    it('should return IInscripcionDetalle returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDetalle = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionDetalle).toEqual({ id: 123 });
    });

    it('should return new IInscripcionDetalle if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDetalle = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInscripcionDetalle).toEqual(new InscripcionDetalle());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InscripcionDetalle })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionDetalle = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionDetalle).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
