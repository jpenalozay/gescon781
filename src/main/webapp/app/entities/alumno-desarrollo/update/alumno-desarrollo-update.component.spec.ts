import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';
import { IAlumnoDesarrollo, AlumnoDesarrollo } from '../alumno-desarrollo.model';

import { AlumnoDesarrolloUpdateComponent } from './alumno-desarrollo-update.component';

describe('AlumnoDesarrollo Management Update Component', () => {
  let comp: AlumnoDesarrolloUpdateComponent;
  let fixture: ComponentFixture<AlumnoDesarrolloUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alumnoDesarrolloService: AlumnoDesarrolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlumnoDesarrolloUpdateComponent],
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
      .overrideTemplate(AlumnoDesarrolloUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoDesarrolloUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alumnoDesarrolloService = TestBed.inject(AlumnoDesarrolloService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const alumnoDesarrollo: IAlumnoDesarrollo = { id: 456 };

      activatedRoute.data = of({ alumnoDesarrollo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(alumnoDesarrollo));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoDesarrollo>>();
      const alumnoDesarrollo = { id: 123 };
      jest.spyOn(alumnoDesarrolloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoDesarrollo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoDesarrollo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(alumnoDesarrolloService.update).toHaveBeenCalledWith(alumnoDesarrollo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoDesarrollo>>();
      const alumnoDesarrollo = new AlumnoDesarrollo();
      jest.spyOn(alumnoDesarrolloService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoDesarrollo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoDesarrollo }));
      saveSubject.complete();

      // THEN
      expect(alumnoDesarrolloService.create).toHaveBeenCalledWith(alumnoDesarrollo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoDesarrollo>>();
      const alumnoDesarrollo = { id: 123 };
      jest.spyOn(alumnoDesarrolloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoDesarrollo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alumnoDesarrolloService.update).toHaveBeenCalledWith(alumnoDesarrollo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
