import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';
import { IInscripcionAdicional, InscripcionAdicional } from '../inscripcion-adicional.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { IRequisitosInscripcion } from 'app/entities/requisitos-inscripcion/requisitos-inscripcion.model';
import { RequisitosInscripcionService } from 'app/entities/requisitos-inscripcion/service/requisitos-inscripcion.service';

import { InscripcionAdicionalUpdateComponent } from './inscripcion-adicional-update.component';

describe('InscripcionAdicional Management Update Component', () => {
  let comp: InscripcionAdicionalUpdateComponent;
  let fixture: ComponentFixture<InscripcionAdicionalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionAdicionalService: InscripcionAdicionalService;
  let inscripcionService: InscripcionService;
  let requisitosInscripcionService: RequisitosInscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionAdicionalUpdateComponent],
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
      .overrideTemplate(InscripcionAdicionalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionAdicionalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionAdicionalService = TestBed.inject(InscripcionAdicionalService);
    inscripcionService = TestBed.inject(InscripcionService);
    requisitosInscripcionService = TestBed.inject(RequisitosInscripcionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Inscripcion query and add missing value', () => {
      const inscripcionAdicional: IInscripcionAdicional = { id: 456 };
      const inscripcion: IInscripcion = { id: 93888 };
      inscripcionAdicional.inscripcion = inscripcion;

      const inscripcionCollection: IInscripcion[] = [{ id: 28943 }];
      jest.spyOn(inscripcionService, 'query').mockReturnValue(of(new HttpResponse({ body: inscripcionCollection })));
      const additionalInscripcions = [inscripcion];
      const expectedCollection: IInscripcion[] = [...additionalInscripcions, ...inscripcionCollection];
      jest.spyOn(inscripcionService, 'addInscripcionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      expect(inscripcionService.query).toHaveBeenCalled();
      expect(inscripcionService.addInscripcionToCollectionIfMissing).toHaveBeenCalledWith(inscripcionCollection, ...additionalInscripcions);
      expect(comp.inscripcionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call RequisitosInscripcion query and add missing value', () => {
      const inscripcionAdicional: IInscripcionAdicional = { id: 456 };
      const inscripcionRequisito: IRequisitosInscripcion = { id: 809 };
      inscripcionAdicional.inscripcionRequisito = inscripcionRequisito;

      const requisitosInscripcionCollection: IRequisitosInscripcion[] = [{ id: 6385 }];
      jest.spyOn(requisitosInscripcionService, 'query').mockReturnValue(of(new HttpResponse({ body: requisitosInscripcionCollection })));
      const additionalRequisitosInscripcions = [inscripcionRequisito];
      const expectedCollection: IRequisitosInscripcion[] = [...additionalRequisitosInscripcions, ...requisitosInscripcionCollection];
      jest.spyOn(requisitosInscripcionService, 'addRequisitosInscripcionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      expect(requisitosInscripcionService.query).toHaveBeenCalled();
      expect(requisitosInscripcionService.addRequisitosInscripcionToCollectionIfMissing).toHaveBeenCalledWith(
        requisitosInscripcionCollection,
        ...additionalRequisitosInscripcions
      );
      expect(comp.requisitosInscripcionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcionAdicional: IInscripcionAdicional = { id: 456 };
      const inscripcion: IInscripcion = { id: 69723 };
      inscripcionAdicional.inscripcion = inscripcion;
      const inscripcionRequisito: IRequisitosInscripcion = { id: 98450 };
      inscripcionAdicional.inscripcionRequisito = inscripcionRequisito;

      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcionAdicional));
      expect(comp.inscripcionsSharedCollection).toContain(inscripcion);
      expect(comp.requisitosInscripcionsSharedCollection).toContain(inscripcionRequisito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAdicional>>();
      const inscripcionAdicional = { id: 123 };
      jest.spyOn(inscripcionAdicionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionAdicional }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionAdicionalService.update).toHaveBeenCalledWith(inscripcionAdicional);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAdicional>>();
      const inscripcionAdicional = new InscripcionAdicional();
      jest.spyOn(inscripcionAdicionalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionAdicional }));
      saveSubject.complete();

      // THEN
      expect(inscripcionAdicionalService.create).toHaveBeenCalledWith(inscripcionAdicional);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAdicional>>();
      const inscripcionAdicional = { id: 123 };
      jest.spyOn(inscripcionAdicionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAdicional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionAdicionalService.update).toHaveBeenCalledWith(inscripcionAdicional);
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

    describe('trackRequisitosInscripcionById', () => {
      it('Should return tracked RequisitosInscripcion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRequisitosInscripcionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
