import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';
import { IProgramacionDeshabilitacion, ProgramacionDeshabilitacion } from '../programacion-deshabilitacion.model';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { FechaService } from 'app/entities/fecha/service/fecha.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { ProgramacionService } from 'app/entities/programacion/service/programacion.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { ProgramacionDeshabilitacionUpdateComponent } from './programacion-deshabilitacion-update.component';

describe('ProgramacionDeshabilitacion Management Update Component', () => {
  let comp: ProgramacionDeshabilitacionUpdateComponent;
  let fixture: ComponentFixture<ProgramacionDeshabilitacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let programacionDeshabilitacionService: ProgramacionDeshabilitacionService;
  let fechaService: FechaService;
  let horarioCatalogoService: HorarioCatalogoService;
  let programacionService: ProgramacionService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProgramacionDeshabilitacionUpdateComponent],
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
      .overrideTemplate(ProgramacionDeshabilitacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgramacionDeshabilitacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    programacionDeshabilitacionService = TestBed.inject(ProgramacionDeshabilitacionService);
    fechaService = TestBed.inject(FechaService);
    horarioCatalogoService = TestBed.inject(HorarioCatalogoService);
    programacionService = TestBed.inject(ProgramacionService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Fecha query and add missing value', () => {
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 456 };
      const fechas: IFecha[] = [{ id: 10877 }];
      programacionDeshabilitacion.fechas = fechas;

      const fechaCollection: IFecha[] = [{ id: 44420 }];
      jest.spyOn(fechaService, 'query').mockReturnValue(of(new HttpResponse({ body: fechaCollection })));
      const additionalFechas = [...fechas];
      const expectedCollection: IFecha[] = [...additionalFechas, ...fechaCollection];
      jest.spyOn(fechaService, 'addFechaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      expect(fechaService.query).toHaveBeenCalled();
      expect(fechaService.addFechaToCollectionIfMissing).toHaveBeenCalledWith(fechaCollection, ...additionalFechas);
      expect(comp.fechasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioCatalogo query and add missing value', () => {
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 456 };
      const horarioCatalogos: IHorarioCatalogo[] = [{ id: 31307 }];
      programacionDeshabilitacion.horarioCatalogos = horarioCatalogos;

      const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 44882 }];
      jest.spyOn(horarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioCatalogoCollection })));
      const additionalHorarioCatalogos = [...horarioCatalogos];
      const expectedCollection: IHorarioCatalogo[] = [...additionalHorarioCatalogos, ...horarioCatalogoCollection];
      jest.spyOn(horarioCatalogoService, 'addHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      expect(horarioCatalogoService.query).toHaveBeenCalled();
      expect(horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioCatalogoCollection,
        ...additionalHorarioCatalogos
      );
      expect(comp.horarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Programacion query and add missing value', () => {
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 456 };
      const programacion: IProgramacion = { id: 32859 };
      programacionDeshabilitacion.programacion = programacion;

      const programacionCollection: IProgramacion[] = [{ id: 58992 }];
      jest.spyOn(programacionService, 'query').mockReturnValue(of(new HttpResponse({ body: programacionCollection })));
      const additionalProgramacions = [programacion];
      const expectedCollection: IProgramacion[] = [...additionalProgramacions, ...programacionCollection];
      jest.spyOn(programacionService, 'addProgramacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      expect(programacionService.query).toHaveBeenCalled();
      expect(programacionService.addProgramacionToCollectionIfMissing).toHaveBeenCalledWith(
        programacionCollection,
        ...additionalProgramacions
      );
      expect(comp.programacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 456 };
      const usuario: IUsuario = { id: 8296 };
      programacionDeshabilitacion.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 90119 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(usuarioCollection, ...additionalUsuarios);
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 456 };
      const fechas: IFecha = { id: 95975 };
      programacionDeshabilitacion.fechas = [fechas];
      const horarioCatalogos: IHorarioCatalogo = { id: 42748 };
      programacionDeshabilitacion.horarioCatalogos = [horarioCatalogos];
      const programacion: IProgramacion = { id: 42483 };
      programacionDeshabilitacion.programacion = programacion;
      const usuario: IUsuario = { id: 71383 };
      programacionDeshabilitacion.usuario = usuario;

      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(programacionDeshabilitacion));
      expect(comp.fechasSharedCollection).toContain(fechas);
      expect(comp.horarioCatalogosSharedCollection).toContain(horarioCatalogos);
      expect(comp.programacionsSharedCollection).toContain(programacion);
      expect(comp.usuariosSharedCollection).toContain(usuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProgramacionDeshabilitacion>>();
      const programacionDeshabilitacion = { id: 123 };
      jest.spyOn(programacionDeshabilitacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: programacionDeshabilitacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(programacionDeshabilitacionService.update).toHaveBeenCalledWith(programacionDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProgramacionDeshabilitacion>>();
      const programacionDeshabilitacion = new ProgramacionDeshabilitacion();
      jest.spyOn(programacionDeshabilitacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: programacionDeshabilitacion }));
      saveSubject.complete();

      // THEN
      expect(programacionDeshabilitacionService.create).toHaveBeenCalledWith(programacionDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProgramacionDeshabilitacion>>();
      const programacionDeshabilitacion = { id: 123 };
      jest.spyOn(programacionDeshabilitacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ programacionDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(programacionDeshabilitacionService.update).toHaveBeenCalledWith(programacionDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFechaById', () => {
      it('Should return tracked Fecha primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFechaById(0, entity);
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

    describe('trackProgramacionById', () => {
      it('Should return tracked Programacion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProgramacionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackUsuarioById', () => {
      it('Should return tracked Usuario primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUsuarioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedFecha', () => {
      it('Should return option if no Fecha is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedFecha(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Fecha for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedFecha(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Fecha is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedFecha(option, [selected]);
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
