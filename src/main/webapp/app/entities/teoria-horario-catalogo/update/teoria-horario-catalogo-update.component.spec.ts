import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';
import { ITeoriaHorarioCatalogo, TeoriaHorarioCatalogo } from '../teoria-horario-catalogo.model';

import { TeoriaHorarioCatalogoUpdateComponent } from './teoria-horario-catalogo-update.component';

describe('TeoriaHorarioCatalogo Management Update Component', () => {
  let comp: TeoriaHorarioCatalogoUpdateComponent;
  let fixture: ComponentFixture<TeoriaHorarioCatalogoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TeoriaHorarioCatalogoUpdateComponent],
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
      .overrideTemplate(TeoriaHorarioCatalogoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeoriaHorarioCatalogoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    teoriaHorarioCatalogoService = TestBed.inject(TeoriaHorarioCatalogoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const teoriaHorarioCatalogo: ITeoriaHorarioCatalogo = { id: 456 };

      activatedRoute.data = of({ teoriaHorarioCatalogo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(teoriaHorarioCatalogo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TeoriaHorarioCatalogo>>();
      const teoriaHorarioCatalogo = { id: 123 };
      jest.spyOn(teoriaHorarioCatalogoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoriaHorarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teoriaHorarioCatalogo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(teoriaHorarioCatalogoService.update).toHaveBeenCalledWith(teoriaHorarioCatalogo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TeoriaHorarioCatalogo>>();
      const teoriaHorarioCatalogo = new TeoriaHorarioCatalogo();
      jest.spyOn(teoriaHorarioCatalogoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoriaHorarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: teoriaHorarioCatalogo }));
      saveSubject.complete();

      // THEN
      expect(teoriaHorarioCatalogoService.create).toHaveBeenCalledWith(teoriaHorarioCatalogo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<TeoriaHorarioCatalogo>>();
      const teoriaHorarioCatalogo = { id: 123 };
      jest.spyOn(teoriaHorarioCatalogoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ teoriaHorarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(teoriaHorarioCatalogoService.update).toHaveBeenCalledWith(teoriaHorarioCatalogo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
