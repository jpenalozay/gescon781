import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlumnoClasesService } from '../service/alumno-clases.service';
import { IAlumnoClases, AlumnoClases } from '../alumno-clases.model';

import { AlumnoClasesUpdateComponent } from './alumno-clases-update.component';

describe('AlumnoClases Management Update Component', () => {
  let comp: AlumnoClasesUpdateComponent;
  let fixture: ComponentFixture<AlumnoClasesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alumnoClasesService: AlumnoClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlumnoClasesUpdateComponent],
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
      .overrideTemplate(AlumnoClasesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoClasesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alumnoClasesService = TestBed.inject(AlumnoClasesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const alumnoClases: IAlumnoClases = { id: 456 };

      activatedRoute.data = of({ alumnoClases });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(alumnoClases));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoClases>>();
      const alumnoClases = { id: 123 };
      jest.spyOn(alumnoClasesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoClases });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoClases }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(alumnoClasesService.update).toHaveBeenCalledWith(alumnoClases);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoClases>>();
      const alumnoClases = new AlumnoClases();
      jest.spyOn(alumnoClasesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoClases });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoClases }));
      saveSubject.complete();

      // THEN
      expect(alumnoClasesService.create).toHaveBeenCalledWith(alumnoClases);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoClases>>();
      const alumnoClases = { id: 123 };
      jest.spyOn(alumnoClasesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoClases });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alumnoClasesService.update).toHaveBeenCalledWith(alumnoClases);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
