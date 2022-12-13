import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IAsignaturaRequisito, AsignaturaRequisito } from '../asignatura-requisito.model';
import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';

import { AsignaturaRequisitoRoutingResolveService } from './asignatura-requisito-routing-resolve.service';

describe('AsignaturaRequisito routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: AsignaturaRequisitoRoutingResolveService;
  let service: AsignaturaRequisitoService;
  let resultAsignaturaRequisito: IAsignaturaRequisito | undefined;

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
    routingResolveService = TestBed.inject(AsignaturaRequisitoRoutingResolveService);
    service = TestBed.inject(AsignaturaRequisitoService);
    resultAsignaturaRequisito = undefined;
  });

  describe('resolve', () => {
    it('should return IAsignaturaRequisito returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAsignaturaRequisito).toEqual({ id: 123 });
    });

    it('should return new IAsignaturaRequisito if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultAsignaturaRequisito).toEqual(new AsignaturaRequisito());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as AsignaturaRequisito })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultAsignaturaRequisito).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
