import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProgramacionService } from '../service/programacion.service';
import { IProgramacion, Programacion } from '../programacion.model';
import { IDia } from 'app/entities/dia/dia.model';
import { DiaService } from 'app/entities/dia/service/dia.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { ProfesorService } from 'app/entities/profesor/service/profesor.service';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { AutomovilService } from 'app/entities/automovil/service/automovil.service';

import { ProgramacionUpdateComponent } from './programacion-update.component';

describe('Programacion Management Update Component', () => {
  let comp: ProgramacionUpdateComponent;
  let fixture: ComponentFixture<ProgramacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let programacionService: ProgramacionService;
  let diaService: DiaService;
  let horarioCatalogoService: HorarioCatalogoService;
  let profesorService: ProfesorService;
  let automovilService: AutomovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProgramacionUpdateComponent],
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
      .overrideTemplate(ProgramacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgramacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    programacionService = TestBed.inject(ProgramacionService);
    diaService = TestBed.inject(DiaService);
    horarioCatalogoService = TestBed.inject(HorarioCatalogoService);
    profesorService = TestBed.inject(ProfesorService);
    automovilService = TestBed.inject(AutomovilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dia query and add missing value', () => {
      const programacion: IProgramacion = { id: 456 };
      const dias: IDia[] = [{ id: 60791 }];
      programacion.dias = dias;

      const diaCollection: IDia[] = [{ id: 92307 }];
      jest.spyOn(diaService, 'query').mockReturnValue(of(new HttpResponse({ body: diaCollection })));
      const additionalDias = [...dias];
      const expectedCollection: IDia[] = [...additionalDias, ...diaCollection];
      jest.spyOn(diaService, 'addDiaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      expect(diaService.query).toHaveBeenCalled();
      expect(diaService.addDiaToCollectionIfMissing).toHaveBeenCalledWith(diaCollection, ...additionalDias);
      expect(comp.diasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioCatalogo query and add missing value', () => {
      const programacion: IProgramacion = { id: 456 };
      const horarioCatalogos: IHorarioCatalogo[] = [{ id: 84210 }];
      programacion.horarioCatalogos = horarioCatalogos;

      const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 49788 }];
      jest.spyOn(horarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioCatalogoCollection })));
      const additionalHorarioCatalogos = [...horarioCatalogos];
      const expectedCollection: IHorarioCatalogo[] = [...additionalHorarioCatalogos, ...horarioCatalogoCollection];
      jest.spyOn(horarioCatalogoService, 'addHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      expect(horarioCatalogoService.query).toHaveBeenCalled();
      expect(horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioCatalogoCollection,
        ...additionalHorarioCatalogos
      );
      expect(comp.horarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Profesor query and add missing value', () => {
      const programacion: IProgramacion = { id: 456 };
      const profesor: IProfesor = { id: 25073 };
      programacion.profesor = profesor;

      const profesorCollection: IProfesor[] = [{ id: 51360 }];
      jest.spyOn(profesorService, 'query').mockReturnValue(of(new HttpResponse({ body: profesorCollection })));
      const additionalProfesors = [profesor];
      const expectedCollection: IProfesor[] = [...additionalProfesors, ...profesorCollection];
      jest.spyOn(profesorService, 'addProfesorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      expect(profesorService.query).toHaveBeenCalled();
      expect(profesorService.addProfesorToCollectionIfMissing).toHaveBeenCalledWith(profesorCollection, ...additionalProfesors);
      expect(comp.profesorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Automovil query and add missing value', () => {
      const programacion: IProgramacion = { id: 456 };
      const automovil: IAutomovil = { id: 9653 };
      programacion.automovil = automovil;

      const automovilCollection: IAutomovil[] = [{ id: 43880 }];
      jest.spyOn(automovilService, 'query').mockReturnValue(of(new HttpResponse({ body: automovilCollection })));
      const additionalAutomovils = [automovil];
      const expectedCollection: IAutomovil[] = [...additionalAutomovils, ...automovilCollection];
      jest.spyOn(automovilService, 'addAutomovilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      expect(automovilService.query).toHaveBeenCalled();
      expect(automovilService.addAutomovilToCollectionIfMissing).toHaveBeenCalledWith(automovilCollection, ...additionalAutomovils);
      expect(comp.automovilsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const programacion: IProgramacion = { id: 456 };
      const dias: IDia = { id: 84927 };
      programacion.dias = [dias];
      const horarioCatalogos: IHorarioCatalogo = { id: 85210 };
      programacion.horarioCatalogos = [horarioCatalogos];
      const profesor: IProfesor = { id: 25993 };
      programacion.profesor = profesor;
      const automovil: IAutomovil = { id: 74820 };
      programacion.automovil = automovil;

      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(programacion));
      expect(comp.diasSharedCollection).toContain(dias);
      expect(comp.horarioCatalogosSharedCollection).toContain(horarioCatalogos);
      expect(comp.profesorsSharedCollection).toContain(profesor);
      expect(comp.automovilsSharedCollection).toContain(automovil);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Programacion>>();
      const programacion = { id: 123 };
      jest.spyOn(programacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: programacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(programacionService.update).toHaveBeenCalledWith(programacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Programacion>>();
      const programacion = new Programacion();
      jest.spyOn(programacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: programacion }));
      saveSubject.complete();

      // THEN
      expect(programacionService.create).toHaveBeenCalledWith(programacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Programacion>>();
      const programacion = { id: 123 };
      jest.spyOn(programacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(programacionService.update).toHaveBeenCalledWith(programacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackDiaById', () => {
      it('Should return tracked Dia primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDiaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackHorarioCatalogoById', () => {
      it('Should return tracked HorarioCatalogo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackHorarioCatalogoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackProfesorById', () => {
      it('Should return tracked Profesor primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProfesorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAutomovilById', () => {
      it('Should return tracked Automovil primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAutomovilById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedDia', () => {
      it('Should return option if no Dia is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedDia(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Dia for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedDia(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Dia is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedDia(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedHorarioCatalogo', () => {
      it('Should return option if no HorarioCatalogo is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedHorarioCatalogo(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected HorarioCatalogo for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedHorarioCatalogo(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this HorarioCatalogo is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedHorarioCatalogo(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
