import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SucursalService } from '../service/sucursal.service';
import { ISucursal, Sucursal } from '../sucursal.model';
import { IDistrit } from 'app/entities/distrit/distrit.model';
import { DistritService } from 'app/entities/distrit/service/distrit.service';

import { SucursalUpdateComponent } from './sucursal-update.component';

describe('Sucursal Management Update Component', () => {
  let comp: SucursalUpdateComponent;
  let fixture: ComponentFixture<SucursalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sucursalService: SucursalService;
  let distritService: DistritService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SucursalUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SucursalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SucursalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sucursalService = TestBed.inject(SucursalService);
    distritService = TestBed.inject(DistritService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Distrit query and add missing value', () => {
      const sucursal: ISucursal = { id: 456 };
      const distrito: IDistrit = { id: 29510 };
      sucursal.distrito = distrito;

      const distritCollection: IDistrit[] = [{ id: 22056 }];
      jest.spyOn(distritService, 'query').mockReturnValue(of(new HttpResponse({ body: distritCollection })));
      const additionalDistrits = [distrito];
      const expectedCollection: IDistrit[] = [...additionalDistrits, ...distritCollection];
      jest.spyOn(distritService, 'addDistritToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sucursal });
      comp.ngOnInit();

      expect(distritService.query).toHaveBeenCalled();
      expect(distritService.addDistritToCollectionIfMissing).toHaveBeenCalledWith(distritCollection, ...additionalDistrits);
      expect(comp.distritsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sucursal: ISucursal = { id: 456 };
      const distrito: IDistrit = { id: 86983 };
      sucursal.distrito = distrito;

      activatedRoute.data = of({ sucursal });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(sucursal));
      expect(comp.distritsSharedCollection).toContain(distrito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sucursal>>();
      const sucursal = { id: 123 };
      jest.spyOn(sucursalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sucursal }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(sucursalService.update).toHaveBeenCalledWith(sucursal);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sucursal>>();
      const sucursal = new Sucursal();
      jest.spyOn(sucursalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sucursal }));
      saveSubject.complete();

      // THEN
      expect(sucursalService.create).toHaveBeenCalledWith(sucursal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Sucursal>>();
      const sucursal = { id: 123 };
      jest.spyOn(sucursalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursal });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sucursalService.update).toHaveBeenCalledWith(sucursal);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDistritById', () => {
      it('Should return tracked Distrit primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDistritById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
