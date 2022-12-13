import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AsignaturaService } from '../service/asignatura.service';
import { IAsignatura, Asignatura } from '../asignatura.model';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';
import { IAsignaturaAdiciones } from 'app/entities/asignatura-adiciones/asignatura-adiciones.model';
import { AsignaturaAdicionesService } from 'app/entities/asignatura-adiciones/service/asignatura-adiciones.service';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';
import { AsignaturaRequisitoService } from 'app/entities/asignatura-requisito/service/asignatura-requisito.service';
import { ICurso } from 'app/entities/curso/curso.model';
import { CursoService } from 'app/entities/curso/service/curso.service';

import { AsignaturaUpdateComponent } from './asignatura-update.component';

describe('Asignatura Management Update Component', () => {
  let comp: AsignaturaUpdateComponent;
  let fixture: ComponentFixture<AsignaturaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let asignaturaService: AsignaturaService;
  let licenciaCategoriaService: LicenciaCategoriaService;
  let asignaturaAdicionesService: AsignaturaAdicionesService;
  let teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService;
  let asignaturaRequisitoService: AsignaturaRequisitoService;
  let cursoService: CursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AsignaturaUpdateComponent],
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
      .overrideTemplate(AsignaturaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsignaturaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    asignaturaService = TestBed.inject(AsignaturaService);
    licenciaCategoriaService = TestBed.inject(LicenciaCategoriaService);
    asignaturaAdicionesService = TestBed.inject(AsignaturaAdicionesService);
    teoriaHorarioCatalogoService = TestBed.inject(TeoriaHorarioCatalogoService);
    asignaturaRequisitoService = TestBed.inject(AsignaturaRequisitoService);
    cursoService = TestBed.inject(CursoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call LicenciaCategoria query and add missing value', () => {
      const asignatura: IAsignatura = { id: 456 };
      const categorias: ILicenciaCategoria[] = [{ id: 3136 }];
      asignatura.categorias = categorias;

      const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 2778 }];
      jest.spyOn(licenciaCategoriaService, 'query').mockReturnValue(of(new HttpResponse({ body: licenciaCategoriaCollection })));
      const additionalLicenciaCategorias = [...categorias];
      const expectedCollection: ILicenciaCategoria[] = [...additionalLicenciaCategorias, ...licenciaCategoriaCollection];
      jest.spyOn(licenciaCategoriaService, 'addLicenciaCategoriaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(licenciaCategoriaService.query).toHaveBeenCalled();
      expect(licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing).toHaveBeenCalledWith(
        licenciaCategoriaCollection,
        ...additionalLicenciaCategorias
      );
      expect(comp.licenciaCategoriasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AsignaturaAdiciones query and add missing value', () => {
      const asignatura: IAsignatura = { id: 456 };
      const adicionals: IAsignaturaAdiciones[] = [{ id: 75561 }];
      asignatura.adicionals = adicionals;

      const asignaturaAdicionesCollection: IAsignaturaAdiciones[] = [{ id: 94889 }];
      jest.spyOn(asignaturaAdicionesService, 'query').mockReturnValue(of(new HttpResponse({ body: asignaturaAdicionesCollection })));
      const additionalAsignaturaAdiciones = [...adicionals];
      const expectedCollection: IAsignaturaAdiciones[] = [...additionalAsignaturaAdiciones, ...asignaturaAdicionesCollection];
      jest.spyOn(asignaturaAdicionesService, 'addAsignaturaAdicionesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(asignaturaAdicionesService.query).toHaveBeenCalled();
      expect(asignaturaAdicionesService.addAsignaturaAdicionesToCollectionIfMissing).toHaveBeenCalledWith(
        asignaturaAdicionesCollection,
        ...additionalAsignaturaAdiciones
      );
      expect(comp.asignaturaAdicionesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TeoriaHorarioCatalogo query and add missing value', () => {
      const asignatura: IAsignatura = { id: 456 };
      const horarios: ITeoriaHorarioCatalogo[] = [{ id: 35676 }];
      asignatura.horarios = horarios;

      const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 15652 }];
      jest.spyOn(teoriaHorarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: teoriaHorarioCatalogoCollection })));
      const additionalTeoriaHorarioCatalogos = [...horarios];
      const expectedCollection: ITeoriaHorarioCatalogo[] = [...additionalTeoriaHorarioCatalogos, ...teoriaHorarioCatalogoCollection];
      jest.spyOn(teoriaHorarioCatalogoService, 'addTeoriaHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(teoriaHorarioCatalogoService.query).toHaveBeenCalled();
      expect(teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        teoriaHorarioCatalogoCollection,
        ...additionalTeoriaHorarioCatalogos
      );
      expect(comp.teoriaHorarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AsignaturaRequisito query and add missing value', () => {
      const asignatura: IAsignatura = { id: 456 };
      const asignaturaRequisitos: IAsignaturaRequisito[] = [{ id: 89563 }];
      asignatura.asignaturaRequisitos = asignaturaRequisitos;

      const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [{ id: 53819 }];
      jest.spyOn(asignaturaRequisitoService, 'query').mockReturnValue(of(new HttpResponse({ body: asignaturaRequisitoCollection })));
      const additionalAsignaturaRequisitos = [...asignaturaRequisitos];
      const expectedCollection: IAsignaturaRequisito[] = [...additionalAsignaturaRequisitos, ...asignaturaRequisitoCollection];
      jest.spyOn(asignaturaRequisitoService, 'addAsignaturaRequisitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(asignaturaRequisitoService.query).toHaveBeenCalled();
      expect(asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing).toHaveBeenCalledWith(
        asignaturaRequisitoCollection,
        ...additionalAsignaturaRequisitos
      );
      expect(comp.asignaturaRequisitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Curso query and add missing value', () => {
      const asignatura: IAsignatura = { id: 456 };
      const curso: ICurso = { id: 43931 };
      asignatura.curso = curso;

      const cursoCollection: ICurso[] = [{ id: 86406 }];
      jest.spyOn(cursoService, 'query').mockReturnValue(of(new HttpResponse({ body: cursoCollection })));
      const additionalCursos = [curso];
      const expectedCollection: ICurso[] = [...additionalCursos, ...cursoCollection];
      jest.spyOn(cursoService, 'addCursoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(cursoService.query).toHaveBeenCalled();
      expect(cursoService.addCursoToCollectionIfMissing).toHaveBeenCalledWith(cursoCollection, ...additionalCursos);
      expect(comp.cursosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const asignatura: IAsignatura = { id: 456 };
      const categorias: ILicenciaCategoria = { id: 36309 };
      asignatura.categorias = [categorias];
      const adicionals: IAsignaturaAdiciones = { id: 91320 };
      asignatura.adicionals = [adicionals];
      const horarios: ITeoriaHorarioCatalogo = { id: 61221 };
      asignatura.horarios = [horarios];
      const asignaturaRequisitos: IAsignaturaRequisito = { id: 96087 };
      asignatura.asignaturaRequisitos = [asignaturaRequisitos];
      const curso: ICurso = { id: 52855 };
      asignatura.curso = curso;

      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(asignatura));
      expect(comp.licenciaCategoriasSharedCollection).toContain(categorias);
      expect(comp.asignaturaAdicionesSharedCollection).toContain(adicionals);
      expect(comp.teoriaHorarioCatalogosSharedCollection).toContain(horarios);
      expect(comp.asignaturaRequisitosSharedCollection).toContain(asignaturaRequisitos);
      expect(comp.cursosSharedCollection).toContain(curso);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Asignatura>>();
      const asignatura = { id: 123 };
      jest.spyOn(asignaturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignatura }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(asignaturaService.update).toHaveBeenCalledWith(asignatura);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Asignatura>>();
      const asignatura = new Asignatura();
      jest.spyOn(asignaturaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: asignatura }));
      saveSubject.complete();

      // THEN
      expect(asignaturaService.create).toHaveBeenCalledWith(asignatura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Asignatura>>();
      const asignatura = { id: 123 };
      jest.spyOn(asignaturaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ asignatura });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(asignaturaService.update).toHaveBeenCalledWith(asignatura);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackLicenciaCategoriaById', () => {
      it('Should return tracked LicenciaCategoria primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLicenciaCategoriaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAsignaturaAdicionesById', () => {
      it('Should return tracked AsignaturaAdiciones primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAsignaturaAdicionesById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackTeoriaHorarioCatalogoById', () => {
      it('Should return tracked TeoriaHorarioCatalogo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTeoriaHorarioCatalogoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAsignaturaRequisitoById', () => {
      it('Should return tracked AsignaturaRequisito primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAsignaturaRequisitoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackCursoById', () => {
      it('Should return tracked Curso primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCursoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedLicenciaCategoria', () => {
      it('Should return option if no LicenciaCategoria is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedLicenciaCategoria(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected LicenciaCategoria for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedLicenciaCategoria(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this LicenciaCategoria is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedLicenciaCategoria(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedAsignaturaAdiciones', () => {
      it('Should return option if no AsignaturaAdiciones is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedAsignaturaAdiciones(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected AsignaturaAdiciones for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedAsignaturaAdiciones(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this AsignaturaAdiciones is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedAsignaturaAdiciones(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedTeoriaHorarioCatalogo', () => {
      it('Should return option if no TeoriaHorarioCatalogo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected TeoriaHorarioCatalogo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this TeoriaHorarioCatalogo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedTeoriaHorarioCatalogo(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedAsignaturaRequisito', () => {
      it('Should return option if no AsignaturaRequisito is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedAsignaturaRequisito(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected AsignaturaRequisito for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedAsignaturaRequisito(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this AsignaturaRequisito is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedAsignaturaRequisito(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
