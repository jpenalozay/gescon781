import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';
import { IInscripcionDescuento, InscripcionDescuento } from '../inscripcion-descuento.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';

import { InscripcionDescuentoUpdateComponent } from './inscripcion-descuento-update.component';

describe('InscripcionDescuento Management Update Component', () => {
  let comp: InscripcionDescuentoUpdateComponent;
  let fixture: ComponentFixture<InscripcionDescuentoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionDescuentoService: InscripcionDescuentoService;
  let inscripcionService: InscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionDescuentoUpdateComponent],
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
      .overrideTemplate(InscripcionDescuentoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionDescuentoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionDescuentoService = TestBed.inject(InscripcionDescuentoService);
    inscripcionService = TestBed.inject(InscripcionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call inscripcion query and add missing value', () => {
      const inscripcionDescuento: IInscripcionDescuento = { id: 456 };
      const inscripcion: IInscripcion = { id: 64605 };
      inscripcionDescuento.inscripcion = inscripcion;

      const inscripcionCollection: IInscripcion[] = [{ id: 59491 }];
      jest.spyOn(inscripcionService, 'query').mockReturnValue(of(new HttpResponse({ body: inscripcionCollection })));
      const expectedCollection: IInscripcion[] = [inscripcion, ...inscripcionCollection];
      jest.spyOn(inscripcionService, 'addInscripcionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionDescuento });
      comp.ngOnInit();

      expect(inscripcionService.query).toHaveBeenCalled();
      expect(inscripcionService.addInscripcionToCollectionIfMissing).toHaveBeenCalledWith(inscripcionCollection, inscripcion);
      expect(comp.inscripcionsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcionDescuento: IInscripcionDescuento = { id: 456 };
      const inscripcion: IInscripcion = { id: 75697 };
      inscripcionDescuento.inscripcion = inscripcion;

      activatedRoute.data = of({ inscripcionDescuento });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcionDescuento));
      expect(comp.inscripcionsCollection).toContain(inscripcion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDescuento>>();
      const inscripcionDescuento = { id: 123 };
      jest.spyOn(inscripcionDescuentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDescuento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionDescuento }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionDescuentoService.update).toHaveBeenCalledWith(inscripcionDescuento);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDescuento>>();
      const inscripcionDescuento = new InscripcionDescuento();
      jest.spyOn(inscripcionDescuentoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDescuento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionDescuento }));
      saveSubject.complete();

      // THEN
      expect(inscripcionDescuentoService.create).toHaveBeenCalledWith(inscripcionDescuento);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDescuento>>();
      const inscripcionDescuento = { id: 123 };
      jest.spyOn(inscripcionDescuentoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDescuento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionDescuentoService.update).toHaveBeenCalledWith(inscripcionDescuento);
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
  });
});
