import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';
import { IRequisitosInscripcion, RequisitosInscripcion } from '../requisitos-inscripcion.model';

import { RequisitosInscripcionUpdateComponent } from './requisitos-inscripcion-update.component';

describe('RequisitosInscripcion Management Update Component', () => {
  let comp: RequisitosInscripcionUpdateComponent;
  let fixture: ComponentFixture<RequisitosInscripcionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let requisitosInscripcionService: RequisitosInscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RequisitosInscripcionUpdateComponent],
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
      .overrideTemplate(RequisitosInscripcionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RequisitosInscripcionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    requisitosInscripcionService = TestBed.inject(RequisitosInscripcionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const requisitosInscripcion: IRequisitosInscripcion = { id: 456 };

      activatedRoute.data = of({ requisitosInscripcion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(requisitosInscripcion));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RequisitosInscripcion>>();
      const requisitosInscripcion = { id: 123 };
      jest.spyOn(requisitosInscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requisitosInscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: requisitosInscripcion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(requisitosInscripcionService.update).toHaveBeenCalledWith(requisitosInscripcion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RequisitosInscripcion>>();
      const requisitosInscripcion = new RequisitosInscripcion();
      jest.spyOn(requisitosInscripcionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requisitosInscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: requisitosInscripcion }));
      saveSubject.complete();

      // THEN
      expect(requisitosInscripcionService.create).toHaveBeenCalledWith(requisitosInscripcion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RequisitosInscripcion>>();
      const requisitosInscripcion = { id: 123 };
      jest.spyOn(requisitosInscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requisitosInscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(requisitosInscripcionService.update).toHaveBeenCalledWith(requisitosInscripcion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
