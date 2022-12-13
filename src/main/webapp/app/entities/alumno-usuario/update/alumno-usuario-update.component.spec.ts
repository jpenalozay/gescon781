import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlumnoUsuarioService } from '../service/alumno-usuario.service';
import { IAlumnoUsuario, AlumnoUsuario } from '../alumno-usuario.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';

import { AlumnoUsuarioUpdateComponent } from './alumno-usuario-update.component';

describe('AlumnoUsuario Management Update Component', () => {
  let comp: AlumnoUsuarioUpdateComponent;
  let fixture: ComponentFixture<AlumnoUsuarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alumnoUsuarioService: AlumnoUsuarioService;
  let alumnoService: AlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlumnoUsuarioUpdateComponent],
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
      .overrideTemplate(AlumnoUsuarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoUsuarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alumnoUsuarioService = TestBed.inject(AlumnoUsuarioService);
    alumnoService = TestBed.inject(AlumnoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Alumno query and add missing value', () => {
      const alumnoUsuario: IAlumnoUsuario = { id: 456 };
      const alumno: IAlumno = { id: 74737 };
      alumnoUsuario.alumno = alumno;

      const alumnoCollection: IAlumno[] = [{ id: 95838 }];
      jest.spyOn(alumnoService, 'query').mockReturnValue(of(new HttpResponse({ body: alumnoCollection })));
      const additionalAlumnos = [alumno];
      const expectedCollection: IAlumno[] = [...additionalAlumnos, ...alumnoCollection];
      jest.spyOn(alumnoService, 'addAlumnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alumnoUsuario });
      comp.ngOnInit();

      expect(alumnoService.query).toHaveBeenCalled();
      expect(alumnoService.addAlumnoToCollectionIfMissing).toHaveBeenCalledWith(alumnoCollection, ...additionalAlumnos);
      expect(comp.alumnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alumnoUsuario: IAlumnoUsuario = { id: 456 };
      const alumno: IAlumno = { id: 42880 };
      alumnoUsuario.alumno = alumno;

      activatedRoute.data = of({ alumnoUsuario });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(alumnoUsuario));
      expect(comp.alumnosSharedCollection).toContain(alumno);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoUsuario>>();
      const alumnoUsuario = { id: 123 };
      jest.spyOn(alumnoUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoUsuario }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(alumnoUsuarioService.update).toHaveBeenCalledWith(alumnoUsuario);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoUsuario>>();
      const alumnoUsuario = new AlumnoUsuario();
      jest.spyOn(alumnoUsuarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoUsuario }));
      saveSubject.complete();

      // THEN
      expect(alumnoUsuarioService.create).toHaveBeenCalledWith(alumnoUsuario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoUsuario>>();
      const alumnoUsuario = { id: 123 };
      jest.spyOn(alumnoUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alumnoUsuarioService.update).toHaveBeenCalledWith(alumnoUsuario);
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
