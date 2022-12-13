import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRequisitosInscripcion, RequisitosInscripcion } from '../requisitos-inscripcion.model';
import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';

import { RequisitosInscripcionRoutingResolveService } from './requisitos-inscripcion-routing-resolve.service';

describe('RequisitosInscripcion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RequisitosInscripcionRoutingResolveService;
  let service: RequisitosInscripcionService;
  let resultRequisitosInscripcion: IRequisitosInscripcion | undefined;

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
    routingResolveService = TestBed.inject(RequisitosInscripcionRoutingResolveService);
    service = TestBed.inject(RequisitosInscripcionService);
    resultRequisitosInscripcion = undefined;
  });

  describe('resolve', () => {
    it('should return IRequisitosInscripcion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRequisitosInscripcion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRequisitosInscripcion).toEqual({ id: 123 });
    });

    it('should return new IRequisitosInscripcion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRequisitosInscripcion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRequisitosInscripcion).toEqual(new RequisitosInscripcion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RequisitosInscripcion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRequisitosInscripcion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultRequisitosInscripcion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
