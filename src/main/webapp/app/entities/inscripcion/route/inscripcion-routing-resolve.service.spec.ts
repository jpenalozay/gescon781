import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInscripcion, Inscripcion } from '../inscripcion.model';
import { InscripcionService } from '../service/inscripcion.service';

import { InscripcionRoutingResolveService } from './inscripcion-routing-resolve.service';

describe('Inscripcion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InscripcionRoutingResolveService;
  let service: InscripcionService;
  let resultInscripcion: IInscripcion | undefined;

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
    routingResolveService = TestBed.inject(InscripcionRoutingResolveService);
    service = TestBed.inject(InscripcionService);
    resultInscripcion = undefined;
  });

  describe('resolve', () => {
    it('should return IInscripcion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcion).toEqual({ id: 123 });
    });

    it('should return new IInscripcion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInscripcion).toEqual(new Inscripcion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Inscripcion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
