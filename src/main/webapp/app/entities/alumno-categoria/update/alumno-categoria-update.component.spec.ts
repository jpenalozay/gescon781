import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AlumnoCategoriaService } from '../service/alumno-categoria.service';
import { IAlumnoCategoria, AlumnoCategoria } from '../alumno-categoria.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';

import { AlumnoCategoriaUpdateComponent } from './alumno-categoria-update.component';

describe('AlumnoCategoria Management Update Component', () => {
  let comp: AlumnoCategoriaUpdateComponent;
  let fixture: ComponentFixture<AlumnoCategoriaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let alumnoCategoriaService: AlumnoCategoriaService;
  let alumnoService: AlumnoService;
  let licenciaCategoriaService: LicenciaCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AlumnoCategoriaUpdateComponent],
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
      .overrideTemplate(AlumnoCategoriaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoCategoriaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    alumnoCategoriaService = TestBed.inject(AlumnoCategoriaService);
    alumnoService = TestBed.inject(AlumnoService);
    licenciaCategoriaService = TestBed.inject(LicenciaCategoriaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Alumno query and add missing value', () => {
      const alumnoCategoria: IAlumnoCategoria = { id: 456 };
      const alumno: IAlumno = { id: 32145 };
      alumnoCategoria.alumno = alumno;

      const alumnoCollection: IAlumno[] = [{ id: 50999 }];
      jest.spyOn(alumnoService, 'query').mockReturnValue(of(new HttpResponse({ body: alumnoCollection })));
      const additionalAlumnos = [alumno];
      const expectedCollection: IAlumno[] = [...additionalAlumnos, ...alumnoCollection];
      jest.spyOn(alumnoService, 'addAlumnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      expect(alumnoService.query).toHaveBeenCalled();
      expect(alumnoService.addAlumnoToCollectionIfMissing).toHaveBeenCalledWith(alumnoCollection, ...additionalAlumnos);
      expect(comp.alumnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LicenciaCategoria query and add missing value', () => {
      const alumnoCategoria: IAlumnoCategoria = { id: 456 };
      const categoria: ILicenciaCategoria = { id: 22716 };
      alumnoCategoria.categoria = categoria;

      const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 93680 }];
      jest.spyOn(licenciaCategoriaService, 'query').mockReturnValue(of(new HttpResponse({ body: licenciaCategoriaCollection })));
      const additionalLicenciaCategorias = [categoria];
      const expectedCollection: ILicenciaCategoria[] = [...additionalLicenciaCategorias, ...licenciaCategoriaCollection];
      jest.spyOn(licenciaCategoriaService, 'addLicenciaCategoriaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      expect(licenciaCategoriaService.query).toHaveBeenCalled();
      expect(licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing).toHaveBeenCalledWith(
        licenciaCategoriaCollection,
        ...additionalLicenciaCategorias
      );
      expect(comp.licenciaCategoriasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const alumnoCategoria: IAlumnoCategoria = { id: 456 };
      const alumno: IAlumno = { id: 96714 };
      alumnoCategoria.alumno = alumno;
      const categoria: ILicenciaCategoria = { id: 28049 };
      alumnoCategoria.categoria = categoria;

      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(alumnoCategoria));
      expect(comp.alumnosSharedCollection).toContain(alumno);
      expect(comp.licenciaCategoriasSharedCollection).toContain(categoria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoCategoria>>();
      const alumnoCategoria = { id: 123 };
      jest.spyOn(alumnoCategoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoCategoria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(alumnoCategoriaService.update).toHaveBeenCalledWith(alumnoCategoria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoCategoria>>();
      const alumnoCategoria = new AlumnoCategoria();
      jest.spyOn(alumnoCategoriaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: alumnoCategoria }));
      saveSubject.complete();

      // THEN
      expect(alumnoCategoriaService.create).toHaveBeenCalledWith(alumnoCategoria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AlumnoCategoria>>();
      const alumnoCategoria = { id: 123 };
      jest.spyOn(alumnoCategoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ alumnoCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(alumnoCategoriaService.update).toHaveBeenCalledWith(alumnoCategoria);
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

    describe('trackLicenciaCategoriaById', () => {
      it('Should return tracked LicenciaCategoria primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLicenciaCategoriaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
