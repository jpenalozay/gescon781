import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionService } from '../service/inscripcion.service';
import { IInscripcion, Inscripcion } from '../inscripcion.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';

import { InscripcionUpdateComponent } from './inscripcion-update.component';

describe('Inscripcion Management Update Component', () => {
  let comp: InscripcionUpdateComponent;
  let fixture: ComponentFixture<InscripcionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionService: InscripcionService;
  let alumnoService: AlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionUpdateComponent],
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
      .overrideTemplate(InscripcionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionService = TestBed.inject(InscripcionService);
    alumnoService = TestBed.inject(AlumnoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Alumno query and add missing value', () => {
      const inscripcion: IInscripcion = { id: 456 };
      const alumno: IAlumno = { id: 71688 };
      inscripcion.alumno = alumno;

      const alumnoCollection: IAlumno[] = [{ id: 80147 }];
      jest.spyOn(alumnoService, 'query').mockReturnValue(of(new HttpResponse({ body: alumnoCollection })));
      const additionalAlumnos = [alumno];
      const expectedCollection: IAlumno[] = [...additionalAlumnos, ...alumnoCollection];
      jest.spyOn(alumnoService, 'addAlumnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcion });
      comp.ngOnInit();

      expect(alumnoService.query).toHaveBeenCalled();
      expect(alumnoService.addAlumnoToCollectionIfMissing).toHaveBeenCalledWith(alumnoCollection, ...additionalAlumnos);
      expect(comp.alumnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcion: IInscripcion = { id: 456 };
      const alumno: IAlumno = { id: 68380 };
      inscripcion.alumno = alumno;

      activatedRoute.data = of({ inscripcion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcion));
      expect(comp.alumnosSharedCollection).toContain(alumno);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripcion>>();
      const inscripcion = { id: 123 };
      jest.spyOn(inscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionService.update).toHaveBeenCalledWith(inscripcion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripcion>>();
      const inscripcion = new Inscripcion();
      jest.spyOn(inscripcionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcion }));
      saveSubject.complete();

      // THEN
      expect(inscripcionService.create).toHaveBeenCalledWith(inscripcion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Inscripcion>>();
      const inscripcion = { id: 123 };
      jest.spyOn(inscripcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionService.update).toHaveBeenCalledWith(inscripcion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackAlumnoById', () => {
      it('Should return tracked Alumno primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAlumnoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
