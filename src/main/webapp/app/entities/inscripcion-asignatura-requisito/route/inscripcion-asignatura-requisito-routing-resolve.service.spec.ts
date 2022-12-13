import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInscripcionAsignaturaRequisito, InscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';

import { InscripcionAsignaturaRequisitoRoutingResolveService } from './inscripcion-asignatura-requisito-routing-resolve.service';

describe('InscripcionAsignaturaRequisito routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InscripcionAsignaturaRequisitoRoutingResolveService;
  let service: InscripcionAsignaturaRequisitoService;
  let resultInscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito | undefined;

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
    routingResolveService = TestBed.inject(InscripcionAsignaturaRequisitoRoutingResolveService);
    service = TestBed.inject(InscripcionAsignaturaRequisitoService);
    resultInscripcionAsignaturaRequisito = undefined;
  });

  describe('resolve', () => {
    it('should return IInscripcionAsignaturaRequisito returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionAsignaturaRequisito).toEqual({ id: 123 });
    });

    it('should return new IInscripcionAsignaturaRequisito if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInscripcionAsignaturaRequisito).toEqual(new InscripcionAsignaturaRequisito());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InscripcionAsignaturaRequisito })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInscripcionAsignaturaRequisito = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultInscripcionAsignaturaRequisito).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
