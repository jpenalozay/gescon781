import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioCatalogoService } from '../service/horario-catalogo.service';
import { IHorarioCatalogo, HorarioCatalogo } from '../horario-catalogo.model';

import { HorarioCatalogoUpdateComponent } from './horario-catalogo-update.component';

describe('HorarioCatalogo Management Update Component', () => {
  let comp: HorarioCatalogoUpdateComponent;
  let fixture: ComponentFixture<HorarioCatalogoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioCatalogoService: HorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HorarioCatalogoUpdateComponent],
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
      .overrideTemplate(HorarioCatalogoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioCatalogoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioCatalogoService = TestBed.inject(HorarioCatalogoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const horarioCatalogo: IHorarioCatalogo = { id: 456 };

      activatedRoute.data = of({ horarioCatalogo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(horarioCatalogo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioCatalogo>>();
      const horarioCatalogo = { id: 123 };
      jest.spyOn(horarioCatalogoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioCatalogo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioCatalogoService.update).toHaveBeenCalledWith(horarioCatalogo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioCatalogo>>();
      const horarioCatalogo = new HorarioCatalogo();
      jest.spyOn(horarioCatalogoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioCatalogo }));
      saveSubject.complete();

      // THEN
      expect(horarioCatalogoService.create).toHaveBeenCalledWith(horarioCatalogo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioCatalogo>>();
      const horarioCatalogo = { id: 123 };
      jest.spyOn(horarioCatalogoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioCatalogo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioCatalogoService.update).toHaveBeenCalledWith(horarioCatalogo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
