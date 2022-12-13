import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ComputadoraService } from '../service/computadora.service';
import { IComputadora, Computadora } from '../computadora.model';

import { ComputadoraUpdateComponent } from './computadora-update.component';

describe('Computadora Management Update Component', () => {
  let comp: ComputadoraUpdateComponent;
  let fixture: ComponentFixture<ComputadoraUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let computadoraService: ComputadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ComputadoraUpdateComponent],
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
      .overrideTemplate(ComputadoraUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComputadoraUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    computadoraService = TestBed.inject(ComputadoraService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const computadora: IComputadora = { id: 456 };

      activatedRoute.data = of({ computadora });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(computadora));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Computadora>>();
      const computadora = { id: 123 };
      jest.spyOn(computadoraService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ computadora });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: computadora }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(computadoraService.update).toHaveBeenCalledWith(computadora);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Computadora>>();
      const computadora = new Computadora();
      jest.spyOn(computadoraService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ computadora });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: computadora }));
      saveSubject.complete();

      // THEN
      expect(computadoraService.create).toHaveBeenCalledWith(computadora);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Computadora>>();
      const computadora = { id: 123 };
      jest.spyOn(computadoraService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ computadora });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(computadoraService.update).toHaveBeenCalledWith(computadora);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
