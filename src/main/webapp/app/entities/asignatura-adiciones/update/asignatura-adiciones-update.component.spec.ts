import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';
import { IAsignaturaAdiciones, AsignaturaAdiciones } from '../asignatura-adiciones.model';

import { AsignaturaAdicionesUpdateComponent } from './asignatura-adiciones-update.component';

describe('AsignaturaAdiciones Management Update Component', () => {
  let comp: AsignaturaAdicionesUpdateComponent;
  let fixture: ComponentFixture<AsignaturaAdicionesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let asignaturaAdicionesService: AsignaturaAdicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AsignaturaAdicionesUpdateComponent],
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
      .overrideTemplate(AsignaturaAdicionesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsignaturaAdicionesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    asignaturaAdicionesService = TestBed.inject(AsignaturaAdicionesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const asignaturaAdiciones: IAsignaturaAdiciones = { id: 456 };

      activatedRoute.data = of({ asignaturaAdiciones });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(asignaturaAdiciones));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaAdiciones>>();
      const asignaturaAdiciones = { id: 123 };
      jest.spyOn(asignaturaAdicionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaAdiciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignaturaAdiciones }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(asignaturaAdicionesService.update).toHaveBeenCalledWith(asignaturaAdiciones);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaAdiciones>>();
      const asignaturaAdiciones = new AsignaturaAdiciones();
      jest.spyOn(asignaturaAdicionesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaAdiciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignaturaAdiciones }));
      saveSubject.complete();

      // THEN
      expect(asignaturaAdicionesService.create).toHaveBeenCalledWith(asignaturaAdiciones);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaAdiciones>>();
      const asignaturaAdiciones = { id: 123 };
      jest.spyOn(asignaturaAdicionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaAdiciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(asignaturaAdicionesService.update).toHaveBeenCalledWith(asignaturaAdiciones);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
