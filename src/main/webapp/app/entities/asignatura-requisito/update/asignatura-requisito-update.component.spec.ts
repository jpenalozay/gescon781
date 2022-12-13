import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';
import { IAsignaturaRequisito, AsignaturaRequisito } from '../asignatura-requisito.model';

import { AsignaturaRequisitoUpdateComponent } from './asignatura-requisito-update.component';

describe('AsignaturaRequisito Management Update Component', () => {
  let comp: AsignaturaRequisitoUpdateComponent;
  let fixture: ComponentFixture<AsignaturaRequisitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let asignaturaRequisitoService: AsignaturaRequisitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AsignaturaRequisitoUpdateComponent],
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
      .overrideTemplate(AsignaturaRequisitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsignaturaRequisitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    asignaturaRequisitoService = TestBed.inject(AsignaturaRequisitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const asignaturaRequisito: IAsignaturaRequisito = { id: 456 };

      activatedRoute.data = of({ asignaturaRequisito });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(asignaturaRequisito));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaRequisito>>();
      const asignaturaRequisito = { id: 123 };
      jest.spyOn(asignaturaRequisitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignaturaRequisito }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(asignaturaRequisitoService.update).toHaveBeenCalledWith(asignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaRequisito>>();
      const asignaturaRequisito = new AsignaturaRequisito();
      jest.spyOn(asignaturaRequisitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignaturaRequisito }));
      saveSubject.complete();

      // THEN
      expect(asignaturaRequisitoService.create).toHaveBeenCalledWith(asignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AsignaturaRequisito>>();
      const asignaturaRequisito = { id: 123 };
      jest.spyOn(asignaturaRequisitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(asignaturaRequisitoService.update).toHaveBeenCalledWith(asignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
