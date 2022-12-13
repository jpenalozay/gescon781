import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlumnoService } from '../service/alumno.service';
import { IAlumno, Alumno } from '../alumno.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IAlumnoClases } from 'app/entities/alumno-clases/alumno-clases.model';
import { AlumnoClasesService } from 'app/entities/alumno-clases/service/alumno-clases.service';

import { AlumnoUpdateComponent } from './alumno-update.component';

describe('Alumno Management Update Component', () => {
  let comp: AlumnoUpdateComponent;
  let fixture: ComponentFixture<AlumnoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alumnoService: AlumnoService;
  let personaService: PersonaService;
  let alumnoClasesService: AlumnoClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlumnoUpdateComponent],
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
      .overrideTemplate(AlumnoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alumnoService = TestBed.inject(AlumnoService);
    personaService = TestBed.inject(PersonaService);
    alumnoClasesService = TestBed.inject(AlumnoClasesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call persona query and add missing value', () => {
      const alumno: IAlumno = { id: 456 };
      const persona: IPersona = { id: 25739 };
      alumno.persona = persona;

      const personaCollection: IPersona[] = [{ id: 56871 }];
      jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
      const expectedCollection: IPersona[] = [persona, ...personaCollection];
      jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      expect(personaService.query).toHaveBeenCalled();
      expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(personaCollection, persona);
      expect(comp.personasCollection).toEqual(expectedCollection);
    });

    it('Should call alumnoClases query and add missing value', () => {
      const alumno: IAlumno = { id: 456 };
      const alumnoClases: IAlumnoClases = { id: 90760 };
      alumno.alumnoClases = alumnoClases;

      const alumnoClasesCollection: IAlumnoClases[] = [{ id: 67892 }];
      jest.spyOn(alumnoClasesService, 'query').mockReturnValue(of(new HttpResponse({ body: alumnoClasesCollection })));
      const expectedCollection: IAlumnoClases[] = [alumnoClases, ...alumnoClasesCollection];
      jest.spyOn(alumnoClasesService, 'addAlumnoClasesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      expect(alumnoClasesService.query).toHaveBeenCalled();
      expect(alumnoClasesService.addAlumnoClasesToCollectionIfMissing).toHaveBeenCalledWith(alumnoClasesCollection, alumnoClases);
      expect(comp.alumnoClasesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alumno: IAlumno = { id: 456 };
      const persona: IPersona = { id: 69031 };
      alumno.persona = persona;
      const alumnoClases: IAlumnoClases = { id: 8637 };
      alumno.alumnoClases = alumnoClases;

      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(alumno));
      expect(comp.personasCollection).toContain(persona);
      expect(comp.alumnoClasesCollection).toContain(alumnoClases);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Alumno>>();
      const alumno = { id: 123 };
      jest.spyOn(alumnoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumno }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(alumnoService.update).toHaveBeenCalledWith(alumno);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Alumno>>();
      const alumno = new Alumno();
      jest.spyOn(alumnoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumno }));
      saveSubject.complete();

      // THEN
      expect(alumnoService.create).toHaveBeenCalledWith(alumno);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Alumno>>();
      const alumno = { id: 123 };
      jest.spyOn(alumnoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumno });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alumnoService.update).toHaveBeenCalledWith(alumno);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPersonaById', () => {
      it('Should return tracked Persona primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPersonaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAlumnoClasesById', () => {
      it('Should return tracked AlumnoClases primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAlumnoClasesById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
