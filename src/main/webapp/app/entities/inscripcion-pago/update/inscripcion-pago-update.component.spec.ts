import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionPagoService } from '../service/inscripcion-pago.service';
import { IInscripcionPago, InscripcionPago } from '../inscripcion-pago.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { ISucursalSerie } from 'app/entities/sucursal-serie/sucursal-serie.model';
import { SucursalSerieService } from 'app/entities/sucursal-serie/service/sucursal-serie.service';

import { InscripcionPagoUpdateComponent } from './inscripcion-pago-update.component';

describe('InscripcionPago Management Update Component', () => {
  let comp: InscripcionPagoUpdateComponent;
  let fixture: ComponentFixture<InscripcionPagoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionPagoService: InscripcionPagoService;
  let inscripcionService: InscripcionService;
  let sucursalSerieService: SucursalSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionPagoUpdateComponent],
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
      .overrideTemplate(InscripcionPagoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionPagoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionPagoService = TestBed.inject(InscripcionPagoService);
    inscripcionService = TestBed.inject(InscripcionService);
    sucursalSerieService = TestBed.inject(SucursalSerieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Inscripcion query and add missing value', () => {
      const inscripcionPago: IInscripcionPago = { id: 456 };
      const inscripcion: IInscripcion = { id: 72018 };
      inscripcionPago.inscripcion = inscripcion;

      const inscripcionCollection: IInscripcion[] = [{ id: 80569 }];
      jest.spyOn(inscripcionService, 'query').mockReturnValue(of(new HttpResponse({ body: inscripcionCollection })));
      const additionalInscripcions = [inscripcion];
      const expectedCollection: IInscripcion[] = [...additionalInscripcions, ...inscripcionCollection];
      jest.spyOn(inscripcionService, 'addInscripcionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      expect(inscripcionService.query).toHaveBeenCalled();
      expect(inscripcionService.addInscripcionToCollectionIfMissing).toHaveBeenCalledWith(inscripcionCollection, ...additionalInscripcions);
      expect(comp.inscripcionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SucursalSerie query and add missing value', () => {
      const inscripcionPago: IInscripcionPago = { id: 456 };
      const serie: ISucursalSerie = { id: 13239 };
      inscripcionPago.serie = serie;

      const sucursalSerieCollection: ISucursalSerie[] = [{ id: 47016 }];
      jest.spyOn(sucursalSerieService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalSerieCollection })));
      const additionalSucursalSeries = [serie];
      const expectedCollection: ISucursalSerie[] = [...additionalSucursalSeries, ...sucursalSerieCollection];
      jest.spyOn(sucursalSerieService, 'addSucursalSerieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      expect(sucursalSerieService.query).toHaveBeenCalled();
      expect(sucursalSerieService.addSucursalSerieToCollectionIfMissing).toHaveBeenCalledWith(
        sucursalSerieCollection,
        ...additionalSucursalSeries
      );
      expect(comp.sucursalSeriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcionPago: IInscripcionPago = { id: 456 };
      const inscripcion: IInscripcion = { id: 13745 };
      inscripcionPago.inscripcion = inscripcion;
      const serie: ISucursalSerie = { id: 93530 };
      inscripcionPago.serie = serie;

      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcionPago));
      expect(comp.inscripcionsSharedCollection).toContain(inscripcion);
      expect(comp.sucursalSeriesSharedCollection).toContain(serie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionPago>>();
      const inscripcionPago = { id: 123 };
      jest.spyOn(inscripcionPagoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionPago }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionPagoService.update).toHaveBeenCalledWith(inscripcionPago);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionPago>>();
      const inscripcionPago = new InscripcionPago();
      jest.spyOn(inscripcionPagoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionPago }));
      saveSubject.complete();

      // THEN
      expect(inscripcionPagoService.create).toHaveBeenCalledWith(inscripcionPago);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionPago>>();
      const inscripcionPago = { id: 123 };
      jest.spyOn(inscripcionPagoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionPago });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionPagoService.update).toHaveBeenCalledWith(inscripcionPago);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackInscripcionById', () => {
      it('Should return tracked Inscripcion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInscripcionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSucursalSerieById', () => {
      it('Should return tracked SucursalSerie primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSucursalSerieById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
