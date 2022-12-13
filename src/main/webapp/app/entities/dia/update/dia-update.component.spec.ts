import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DiaService } from '../service/dia.service';
import { IDia, Dia } from '../dia.model';

import { DiaUpdateComponent } from './dia-update.component';

describe('Dia Management Update Component', () => {
  let comp: DiaUpdateComponent;
  let fixture: ComponentFixture<DiaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let diaService: DiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DiaUpdateComponent],
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
      .overrideTemplate(DiaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    diaService = TestBed.inject(DiaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dia: IDia = { id: 456 };

      activatedRoute.data = of({ dia });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(dia));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dia>>();
      const dia = { id: 123 };
      jest.spyOn(diaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dia }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(diaService.update).toHaveBeenCalledWith(dia);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dia>>();
      const dia = new Dia();
      jest.spyOn(diaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dia }));
      saveSubject.complete();

      // THEN
      expect(diaService.create).toHaveBeenCalledWith(dia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dia>>();
      const dia = { id: 123 };
      jest.spyOn(diaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(diaService.update).toHaveBeenCalledWith(dia);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
