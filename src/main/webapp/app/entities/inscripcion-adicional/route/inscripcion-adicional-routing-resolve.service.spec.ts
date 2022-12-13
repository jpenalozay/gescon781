import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInscripcionAdicional, InscripcionAdicional } from '../inscripcion-adicional.model';
import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';

import { InscripcionAdicionalRoutingResolveService } from './inscripcion-adicional-routing-resolve.service';

describe('InscripcionAdicional routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InscripcionAdicionalRoutingResolveService;
  let service: InscripcionAdicionalService;
  let resultInscripcionAdicional: IInscripcionAdicional | undefined;

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
    routingResolveService = TestBed.inject(InscripcionAdicionalRoutingResolveService);
    service = TestBed.inject(InscripcionAdicionalService);
    resultInscripcionAdicional = undefined;
  });

  describe('resolve', () => {
    it('should return IInscripcionAdicional returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAdicional = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionAdicional).toEqual({ id: 123 });
    });

    it('should return new IInscripcionAdicional if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAdicional = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInscripcionAdicional).toEqual(new InscripcionAdicional());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InscripcionAdicional })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAdicional = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionAdicional).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
