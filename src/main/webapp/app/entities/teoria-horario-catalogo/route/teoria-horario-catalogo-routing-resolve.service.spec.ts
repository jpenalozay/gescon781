import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITeoriaHorarioCatalogo, TeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';

import { TeoriaHorarioCatalogoRoutingResolveService } from './teoria-horario-catalogo-routing-resolve.service';

describe('TeoriaHorarioCatalogo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TeoriaHorarioCatalogoRoutingResolveService;
  let service: TeoriaHorarioCatalogoService;
  let resultTeoriaHorarioCatalogo: ITeoriaHorarioCatalogo | undefined;

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
    routingResolveService = TestBed.inject(TeoriaHorarioCatalogoRoutingResolveService);
    service = TestBed.inject(TeoriaHorarioCatalogoService);
    resultTeoriaHorarioCatalogo = undefined;
  });

  describe('resolve', () => {
    it('should return ITeoriaHorarioCatalogo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTeoriaHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTeoriaHorarioCatalogo).toEqual({ id: 123 });
    });

    it('should return new ITeoriaHorarioCatalogo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTeoriaHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTeoriaHorarioCatalogo).toEqual(new TeoriaHorarioCatalogo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TeoriaHorarioCatalogo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTeoriaHorarioCatalogo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTeoriaHorarioCatalogo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
