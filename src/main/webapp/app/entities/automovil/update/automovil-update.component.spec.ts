import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AutomovilService } from '../service/automovil.service';
import { IAutomovil, Automovil } from '../automovil.model';

import { AutomovilUpdateComponent } from './automovil-update.component';

describe('Automovil Management Update Component', () => {
  let comp: AutomovilUpdateComponent;
  let fixture: ComponentFixture<AutomovilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let automovilService: AutomovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AutomovilUpdateComponent],
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
      .overrideTemplate(AutomovilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutomovilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    automovilService = TestBed.inject(AutomovilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const automovil: IAutomovil = { id: 456 };

      activatedRoute.data = of({ automovil });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(automovil));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Automovil>>();
      const automovil = { id: 123 };
      jest.spyOn(automovilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ automovil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: automovil }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(automovilService.update).toHaveBeenCalledWith(automovil);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Automovil>>();
      const automovil = new Automovil();
      jest.spyOn(automovilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ automovil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: automovil }));
      saveSubject.complete();

      // THEN
      expect(automovilService.create).toHaveBeenCalledWith(automovil);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Automovil>>();
      const automovil = { id: 123 };
      jest.spyOn(automovilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ automovil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(automovilService.update).toHaveBeenCalledWith(automovil);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
