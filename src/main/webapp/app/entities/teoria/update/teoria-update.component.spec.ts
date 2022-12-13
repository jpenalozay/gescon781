import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TeoriaService } from '../service/teoria.service';
import { ITeoria, Teoria } from '../teoria.model';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';

import { TeoriaUpdateComponent } from './teoria-update.component';

describe('Teoria Management Update Component', () => {
  let comp: TeoriaUpdateComponent;
  let fixture: ComponentFixture<TeoriaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teoriaService: TeoriaService;
  let teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TeoriaUpdateComponent],
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
      .overrideTemplate(TeoriaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeoriaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teoriaService = TestBed.inject(TeoriaService);
    teoriaHorarioCatalogoService = TestBed.inject(TeoriaHorarioCatalogoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TeoriaHorarioCatalogo query and add missing value', () => {
      const teoria: ITeoria = { id: 456 };
      const horarios: ITeoriaHorarioCatalogo[] = [{ id: 88636 }];
      teoria.horarios = horarios;

      const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 47704 }];
      jest.spyOn(teoriaHorarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: teoriaHorarioCatalogoCollection })));
      const additionalTeoriaHorarioCatalogos = [...horarios];
      const expectedCollection: ITeoriaHorarioCatalogo[] = [...additionalTeoriaHorarioCatalogos, ...teoriaHorarioCatalogoCollection];
      jest.spyOn(teoriaHorarioCatalogoService, 'addTeoriaHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ teoria });
      comp.ngOnInit();

      expect(teoriaHorarioCatalogoService.query).toHaveBeenCalled();
      expect(teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        teoriaHorarioCatalogoCollection,
        ...additionalTeoriaHorarioCatalogos
      );
      expect(comp.teoriaHorarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const teoria: ITeoria = { id: 456 };
      const horarios: ITeoriaHorarioCatalogo = { id: 17966 };
      teoria.horarios = [horarios];

      activatedRoute.data = of({ teoria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(teoria));
      expect(comp.teoriaHorarioCatalogosSharedCollection).toContain(horarios);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Teoria>>();
      const teoria = { id: 123 };
      jest.spyOn(teoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teoria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(teoriaService.update).toHaveBeenCalledWith(teoria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Teoria>>();
      const teoria = new Teoria();
      jest.spyOn(teoriaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teoria }));
      saveSubject.complete();

      // THEN
      expect(teoriaService.create).toHaveBeenCalledWith(teoria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Teoria>>();
      const teoria = { id: 123 };
      jest.spyOn(teoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teoriaService.update).toHaveBeenCalledWith(teoria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTeoriaHorarioCatalogoById', () => {
      it('Should return tracked TeoriaHorarioCatalogo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTeoriaHorarioCatalogoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedTeoriaHorarioCatalogo', () => {
      it('Should return option if no TeoriaHorarioCatalogo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected TeoriaHorarioCatalogo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this TeoriaHorarioCatalogo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
