import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';
import { IInscripcionDetalle, InscripcionDetalle } from '../inscripcion-detalle.model';
import { IInscripcion } from 'app/entities/inscripcion/inscripcion.model';
import { InscripcionService } from 'app/entities/inscripcion/service/inscripcion.service';
import { IAsignatura } from 'app/entities/asignatura/asignatura.model';
import { AsignaturaService } from 'app/entities/asignatura/service/asignatura.service';
import { ITeoriaHorarioCatalogo } from 'app/entities/teoria-horario-catalogo/teoria-horario-catalogo.model';
import { TeoriaHorarioCatalogoService } from 'app/entities/teoria-horario-catalogo/service/teoria-horario-catalogo.service';

import { InscripcionDetalleUpdateComponent } from './inscripcion-detalle-update.component';

describe('InscripcionDetalle Management Update Component', () => {
  let comp: InscripcionDetalleUpdateComponent;
  let fixture: ComponentFixture<InscripcionDetalleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionDetalleService: InscripcionDetalleService;
  let inscripcionService: InscripcionService;
  let asignaturaService: AsignaturaService;
  let teoriaHorarioCatalogoService: TeoriaHorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionDetalleUpdateComponent],
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
      .overrideTemplate(InscripcionDetalleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionDetalleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionDetalleService = TestBed.inject(InscripcionDetalleService);
    inscripcionService = TestBed.inject(InscripcionService);
    asignaturaService = TestBed.inject(AsignaturaService);
    teoriaHorarioCatalogoService = TestBed.inject(TeoriaHorarioCatalogoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Inscripcion query and add missing value', () => {
      const inscripcionDetalle: IInscripcionDetalle = { id: 456 };
      const inscripcion: IInscripcion = { id: 80988 };
      inscripcionDetalle.inscripcion = inscripcion;

      const inscripcionCollection: IInscripcion[] = [{ id: 56362 }];
      jest.spyOn(inscripcionService, 'query').mockReturnValue(of(new HttpResponse({ body: inscripcionCollection })));
      const additionalInscripcions = [inscripcion];
      const expectedCollection: IInscripcion[] = [...additionalInscripcions, ...inscripcionCollection];
      jest.spyOn(inscripcionService, 'addInscripcionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      expect(inscripcionService.query).toHaveBeenCalled();
      expect(inscripcionService.addInscripcionToCollectionIfMissing).toHaveBeenCalledWith(inscripcionCollection, ...additionalInscripcions);
      expect(comp.inscripcionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Asignatura query and add missing value', () => {
      const inscripcionDetalle: IInscripcionDetalle = { id: 456 };
      const asignatura: IAsignatura = { id: 76906 };
      inscripcionDetalle.asignatura = asignatura;

      const asignaturaCollection: IAsignatura[] = [{ id: 73277 }];
      jest.spyOn(asignaturaService, 'query').mockReturnValue(of(new HttpResponse({ body: asignaturaCollection })));
      const additionalAsignaturas = [asignatura];
      const expectedCollection: IAsignatura[] = [...additionalAsignaturas, ...asignaturaCollection];
      jest.spyOn(asignaturaService, 'addAsignaturaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      expect(asignaturaService.query).toHaveBeenCalled();
      expect(asignaturaService.addAsignaturaToCollectionIfMissing).toHaveBeenCalledWith(asignaturaCollection, ...additionalAsignaturas);
      expect(comp.asignaturasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TeoriaHorarioCatalogo query and add missing value', () => {
      const inscripcionDetalle: IInscripcionDetalle = { id: 456 };
      const horario: ITeoriaHorarioCatalogo = { id: 1607 };
      inscripcionDetalle.horario = horario;

      const teoriaHorarioCatalogoCollection: ITeoriaHorarioCatalogo[] = [{ id: 3440 }];
      jest.spyOn(teoriaHorarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: teoriaHorarioCatalogoCollection })));
      const additionalTeoriaHorarioCatalogos = [horario];
      const expectedCollection: ITeoriaHorarioCatalogo[] = [...additionalTeoriaHorarioCatalogos, ...teoriaHorarioCatalogoCollection];
      jest.spyOn(teoriaHorarioCatalogoService, 'addTeoriaHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      expect(teoriaHorarioCatalogoService.query).toHaveBeenCalled();
      expect(teoriaHorarioCatalogoService.addTeoriaHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        teoriaHorarioCatalogoCollection,
        ...additionalTeoriaHorarioCatalogos
      );
      expect(comp.teoriaHorarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcionDetalle: IInscripcionDetalle = { id: 456 };
      const inscripcion: IInscripcion = { id: 27978 };
      inscripcionDetalle.inscripcion = inscripcion;
      const asignatura: IAsignatura = { id: 38669 };
      inscripcionDetalle.asignatura = asignatura;
      const horario: ITeoriaHorarioCatalogo = { id: 91964 };
      inscripcionDetalle.horario = horario;

      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcionDetalle));
      expect(comp.inscripcionsSharedCollection).toContain(inscripcion);
      expect(comp.asignaturasSharedCollection).toContain(asignatura);
      expect(comp.teoriaHorarioCatalogosSharedCollection).toContain(horario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDetalle>>();
      const inscripcionDetalle = { id: 123 };
      jest.spyOn(inscripcionDetalleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionDetalle }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionDetalleService.update).toHaveBeenCalledWith(inscripcionDetalle);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDetalle>>();
      const inscripcionDetalle = new InscripcionDetalle();
      jest.spyOn(inscripcionDetalleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionDetalle }));
      saveSubject.complete();

      // THEN
      expect(inscripcionDetalleService.create).toHaveBeenCalledWith(inscripcionDetalle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionDetalle>>();
      const inscripcionDetalle = { id: 123 };
      jest.spyOn(inscripcionDetalleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionDetalle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionDetalleService.update).toHaveBeenCalledWith(inscripcionDetalle);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackInscripcionById', () => {
      it('Should return tracked Inscripcion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInscripcionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAsignaturaById', () => {
      it('Should return tracked Asignatura primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAsignaturaById(0, entity);
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
  });
});
