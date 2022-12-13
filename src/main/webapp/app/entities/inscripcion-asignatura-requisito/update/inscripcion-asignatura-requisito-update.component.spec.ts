import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InscripcionAsignaturaRequisitoService } from '../service/inscripcion-asignatura-requisito.service';
import { IInscripcionAsignaturaRequisito, InscripcionAsignaturaRequisito } from '../inscripcion-asignatura-requisito.model';
import { IInscripcionDetalle } from 'app/entities/inscripcion-detalle/inscripcion-detalle.model';
import { InscripcionDetalleService } from 'app/entities/inscripcion-detalle/service/inscripcion-detalle.service';
import { IAsignaturaRequisito } from 'app/entities/asignatura-requisito/asignatura-requisito.model';
import { AsignaturaRequisitoService } from 'app/entities/asignatura-requisito/service/asignatura-requisito.service';

import { InscripcionAsignaturaRequisitoUpdateComponent } from './inscripcion-asignatura-requisito-update.component';

describe('InscripcionAsignaturaRequisito Management Update Component', () => {
  let comp: InscripcionAsignaturaRequisitoUpdateComponent;
  let fixture: ComponentFixture<InscripcionAsignaturaRequisitoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let inscripcionAsignaturaRequisitoService: InscripcionAsignaturaRequisitoService;
  let inscripcionDetalleService: InscripcionDetalleService;
  let asignaturaRequisitoService: AsignaturaRequisitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InscripcionAsignaturaRequisitoUpdateComponent],
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
      .overrideTemplate(InscripcionAsignaturaRequisitoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionAsignaturaRequisitoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    inscripcionAsignaturaRequisitoService = TestBed.inject(InscripcionAsignaturaRequisitoService);
    inscripcionDetalleService = TestBed.inject(InscripcionDetalleService);
    asignaturaRequisitoService = TestBed.inject(AsignaturaRequisitoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call InscripcionDetalle query and add missing value', () => {
      const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 456 };
      const inscripcionDetalle: IInscripcionDetalle = { id: 19994 };
      inscripcionAsignaturaRequisito.inscripcionDetalle = inscripcionDetalle;

      const inscripcionDetalleCollection: IInscripcionDetalle[] = [{ id: 26308 }];
      jest.spyOn(inscripcionDetalleService, 'query').mockReturnValue(of(new HttpResponse({ body: inscripcionDetalleCollection })));
      const additionalInscripcionDetalles = [inscripcionDetalle];
      const expectedCollection: IInscripcionDetalle[] = [...additionalInscripcionDetalles, ...inscripcionDetalleCollection];
      jest.spyOn(inscripcionDetalleService, 'addInscripcionDetalleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      expect(inscripcionDetalleService.query).toHaveBeenCalled();
      expect(inscripcionDetalleService.addInscripcionDetalleToCollectionIfMissing).toHaveBeenCalledWith(
        inscripcionDetalleCollection,
        ...additionalInscripcionDetalles
      );
      expect(comp.inscripcionDetallesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call AsignaturaRequisito query and add missing value', () => {
      const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 456 };
      const asignaturaRequisito: IAsignaturaRequisito = { id: 83126 };
      inscripcionAsignaturaRequisito.asignaturaRequisito = asignaturaRequisito;

      const asignaturaRequisitoCollection: IAsignaturaRequisito[] = [{ id: 11601 }];
      jest.spyOn(asignaturaRequisitoService, 'query').mockReturnValue(of(new HttpResponse({ body: asignaturaRequisitoCollection })));
      const additionalAsignaturaRequisitos = [asignaturaRequisito];
      const expectedCollection: IAsignaturaRequisito[] = [...additionalAsignaturaRequisitos, ...asignaturaRequisitoCollection];
      jest.spyOn(asignaturaRequisitoService, 'addAsignaturaRequisitoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      expect(asignaturaRequisitoService.query).toHaveBeenCalled();
      expect(asignaturaRequisitoService.addAsignaturaRequisitoToCollectionIfMissing).toHaveBeenCalledWith(
        asignaturaRequisitoCollection,
        ...additionalAsignaturaRequisitos
      );
      expect(comp.asignaturaRequisitosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const inscripcionAsignaturaRequisito: IInscripcionAsignaturaRequisito = { id: 456 };
      const inscripcionDetalle: IInscripcionDetalle = { id: 71635 };
      inscripcionAsignaturaRequisito.inscripcionDetalle = inscripcionDetalle;
      const asignaturaRequisito: IAsignaturaRequisito = { id: 18230 };
      inscripcionAsignaturaRequisito.asignaturaRequisito = asignaturaRequisito;

      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(inscripcionAsignaturaRequisito));
      expect(comp.inscripcionDetallesSharedCollection).toContain(inscripcionDetalle);
      expect(comp.asignaturaRequisitosSharedCollection).toContain(asignaturaRequisito);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAsignaturaRequisito>>();
      const inscripcionAsignaturaRequisito = { id: 123 };
      jest.spyOn(inscripcionAsignaturaRequisitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionAsignaturaRequisito }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(inscripcionAsignaturaRequisitoService.update).toHaveBeenCalledWith(inscripcionAsignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAsignaturaRequisito>>();
      const inscripcionAsignaturaRequisito = new InscripcionAsignaturaRequisito();
      jest.spyOn(inscripcionAsignaturaRequisitoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: inscripcionAsignaturaRequisito }));
      saveSubject.complete();

      // THEN
      expect(inscripcionAsignaturaRequisitoService.create).toHaveBeenCalledWith(inscripcionAsignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InscripcionAsignaturaRequisito>>();
      const inscripcionAsignaturaRequisito = { id: 123 };
      jest.spyOn(inscripcionAsignaturaRequisitoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ inscripcionAsignaturaRequisito });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(inscripcionAsignaturaRequisitoService.update).toHaveBeenCalledWith(inscripcionAsignaturaRequisito);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackInscripcionDetalleById', () => {
      it('Should return tracked InscripcionDetalle primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInscripcionDetalleById(0, entity);
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
  });
});
