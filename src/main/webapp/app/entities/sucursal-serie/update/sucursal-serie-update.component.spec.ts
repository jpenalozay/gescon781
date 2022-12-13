import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SucursalSerieService } from '../service/sucursal-serie.service';
import { ISucursalSerie, SucursalSerie } from '../sucursal-serie.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

import { SucursalSerieUpdateComponent } from './sucursal-serie-update.component';

describe('SucursalSerie Management Update Component', () => {
  let comp: SucursalSerieUpdateComponent;
  let fixture: ComponentFixture<SucursalSerieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sucursalSerieService: SucursalSerieService;
  let sucursalService: SucursalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SucursalSerieUpdateComponent],
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
      .overrideTemplate(SucursalSerieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SucursalSerieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sucursalSerieService = TestBed.inject(SucursalSerieService);
    sucursalService = TestBed.inject(SucursalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Sucursal query and add missing value', () => {
      const sucursalSerie: ISucursalSerie = { id: 456 };
      const sucursal: ISucursal = { id: 72873 };
      sucursalSerie.sucursal = sucursal;

      const sucursalCollection: ISucursal[] = [{ id: 60881 }];
      jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
      const additionalSucursals = [sucursal];
      const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
      jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ sucursalSerie });
      comp.ngOnInit();

      expect(sucursalService.query).toHaveBeenCalled();
      expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
      expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const sucursalSerie: ISucursalSerie = { id: 456 };
      const sucursal: ISucursal = { id: 10287 };
      sucursalSerie.sucursal = sucursal;

      activatedRoute.data = of({ sucursalSerie });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(sucursalSerie));
      expect(comp.sucursalsSharedCollection).toContain(sucursal);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SucursalSerie>>();
      const sucursalSerie = { id: 123 };
      jest.spyOn(sucursalSerieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursalSerie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sucursalSerie }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(sucursalSerieService.update).toHaveBeenCalledWith(sucursalSerie);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SucursalSerie>>();
      const sucursalSerie = new SucursalSerie();
      jest.spyOn(sucursalSerieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursalSerie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sucursalSerie }));
      saveSubject.complete();

      // THEN
      expect(sucursalSerieService.create).toHaveBeenCalledWith(sucursalSerie);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SucursalSerie>>();
      const sucursalSerie = { id: 123 };
      jest.spyOn(sucursalSerieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sucursalSerie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sucursalSerieService.update).toHaveBeenCalledWith(sucursalSerie);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSucursalById', () => {
      it('Should return tracked Sucursal primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSucursalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
