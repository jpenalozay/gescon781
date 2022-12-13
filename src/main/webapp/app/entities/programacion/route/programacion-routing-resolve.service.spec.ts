import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProgramacion, Programacion } from '../programacion.model';
import { ProgramacionService } from '../service/programacion.service';

import { ProgramacionRoutingResolveService } from './programacion-routing-resolve.service';

describe('Programacion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProgramacionRoutingResolveService;
  let service: ProgramacionService;
  let resultProgramacion: IProgramacion | undefined;

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
    routingResolveService = TestBed.inject(ProgramacionRoutingResolveService);
    service = TestBed.inject(ProgramacionService);
    resultProgramacion = undefined;
  });

  describe('resolve', () => {
    it('should return IProgramacion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProgramacion).toEqual({ id: 123 });
    });

    it('should return new IProgramacion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProgramacion).toEqual(new Programacion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Programacion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProgramacion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultProgramacion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
