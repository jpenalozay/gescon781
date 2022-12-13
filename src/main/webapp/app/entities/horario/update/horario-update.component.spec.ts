import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioService } from '../service/horario.service';
import { IHorario, Horario } from '../horario.model';
import { IAlumno } from 'app/entities/alumno/alumno.model';
import { AlumnoService } from 'app/entities/alumno/service/alumno.service';
import { IProfesor } from 'app/entities/profesor/profesor.model';
import { ProfesorService } from 'app/entities/profesor/service/profesor.service';
import { IProgramacion } from 'app/entities/programacion/programacion.model';
import { ProgramacionService } from 'app/entities/programacion/service/programacion.service';
import { IFecha } from 'app/entities/fecha/fecha.model';
import { FechaService } from 'app/entities/fecha/service/fecha.service';
import { IHorarioCatalogo } from 'app/entities/horario-catalogo/horario-catalogo.model';
import { HorarioCatalogoService } from 'app/entities/horario-catalogo/service/horario-catalogo.service';
import { IAutomovil } from 'app/entities/automovil/automovil.model';
import { AutomovilService } from 'app/entities/automovil/service/automovil.service';
import { ILugarSalida } from 'app/entities/lugar-salida/lugar-salida.model';
import { LugarSalidaService } from 'app/entities/lugar-salida/service/lugar-salida.service';

import { HorarioUpdateComponent } from './horario-update.component';

describe('Horario Management Update Component', () => {
  let comp: HorarioUpdateComponent;
  let fixture: ComponentFixture<HorarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioService: HorarioService;
  let alumnoService: AlumnoService;
  let profesorService: ProfesorService;
  let programacionService: ProgramacionService;
  let fechaService: FechaService;
  let horarioCatalogoService: HorarioCatalogoService;
  let automovilService: AutomovilService;
  let lugarSalidaService: LugarSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HorarioUpdateComponent],
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
      .overrideTemplate(HorarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioService = TestBed.inject(HorarioService);
    alumnoService = TestBed.inject(AlumnoService);
    profesorService = TestBed.inject(ProfesorService);
    programacionService = TestBed.inject(ProgramacionService);
    fechaService = TestBed.inject(FechaService);
    horarioCatalogoService = TestBed.inject(HorarioCatalogoService);
    automovilService = TestBed.inject(AutomovilService);
    lugarSalidaService = TestBed.inject(LugarSalidaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Alumno query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const alumno: IAlumno = { id: 92825 };
      horario.alumno = alumno;

      const alumnoCollection: IAlumno[] = [{ id: 89734 }];
      jest.spyOn(alumnoService, 'query').mockReturnValue(of(new HttpResponse({ body: alumnoCollection })));
      const additionalAlumnos = [alumno];
      const expectedCollection: IAlumno[] = [...additionalAlumnos, ...alumnoCollection];
      jest.spyOn(alumnoService, 'addAlumnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(alumnoService.query).toHaveBeenCalled();
      expect(alumnoService.addAlumnoToCollectionIfMissing).toHaveBeenCalledWith(alumnoCollection, ...additionalAlumnos);
      expect(comp.alumnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Profesor query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const instructor: IProfesor = { id: 78050 };
      horario.instructor = instructor;

      const profesorCollection: IProfesor[] = [{ id: 12816 }];
      jest.spyOn(profesorService, 'query').mockReturnValue(of(new HttpResponse({ body: profesorCollection })));
      const additionalProfesors = [instructor];
      const expectedCollection: IProfesor[] = [...additionalProfesors, ...profesorCollection];
      jest.spyOn(profesorService, 'addProfesorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(profesorService.query).toHaveBeenCalled();
      expect(profesorService.addProfesorToCollectionIfMissing).toHaveBeenCalledWith(profesorCollection, ...additionalProfesors);
      expect(comp.profesorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Programacion query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const programacion: IProgramacion = { id: 44917 };
      horario.programacion = programacion;

      const programacionCollection: IProgramacion[] = [{ id: 93126 }];
      jest.spyOn(programacionService, 'query').mockReturnValue(of(new HttpResponse({ body: programacionCollection })));
      const additionalProgramacions = [programacion];
      const expectedCollection: IProgramacion[] = [...additionalProgramacions, ...programacionCollection];
      jest.spyOn(programacionService, 'addProgramacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(programacionService.query).toHaveBeenCalled();
      expect(programacionService.addProgramacionToCollectionIfMissing).toHaveBeenCalledWith(
        programacionCollection,
        ...additionalProgramacions
      );
      expect(comp.programacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Fecha query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const fecha: IFecha = { id: 97946 };
      horario.fecha = fecha;

      const fechaCollection: IFecha[] = [{ id: 62554 }];
      jest.spyOn(fechaService, 'query').mockReturnValue(of(new HttpResponse({ body: fechaCollection })));
      const additionalFechas = [fecha];
      const expectedCollection: IFecha[] = [...additionalFechas, ...fechaCollection];
      jest.spyOn(fechaService, 'addFechaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(fechaService.query).toHaveBeenCalled();
      expect(fechaService.addFechaToCollectionIfMissing).toHaveBeenCalledWith(fechaCollection, ...additionalFechas);
      expect(comp.fechasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioCatalogo query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const horarioCatalogo: IHorarioCatalogo = { id: 18764 };
      horario.horarioCatalogo = horarioCatalogo;

      const horarioCatalogoCollection: IHorarioCatalogo[] = [{ id: 57178 }];
      jest.spyOn(horarioCatalogoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioCatalogoCollection })));
      const additionalHorarioCatalogos = [horarioCatalogo];
      const expectedCollection: IHorarioCatalogo[] = [...additionalHorarioCatalogos, ...horarioCatalogoCollection];
      jest.spyOn(horarioCatalogoService, 'addHorarioCatalogoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(horarioCatalogoService.query).toHaveBeenCalled();
      expect(horarioCatalogoService.addHorarioCatalogoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioCatalogoCollection,
        ...additionalHorarioCatalogos
      );
      expect(comp.horarioCatalogosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Automovil query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const automovil: IAutomovil = { id: 94451 };
      horario.automovil = automovil;

      const automovilCollection: IAutomovil[] = [{ id: 39761 }];
      jest.spyOn(automovilService, 'query').mockReturnValue(of(new HttpResponse({ body: automovilCollection })));
      const additionalAutomovils = [automovil];
      const expectedCollection: IAutomovil[] = [...additionalAutomovils, ...automovilCollection];
      jest.spyOn(automovilService, 'addAutomovilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(automovilService.query).toHaveBeenCalled();
      expect(automovilService.addAutomovilToCollectionIfMissing).toHaveBeenCalledWith(automovilCollection, ...additionalAutomovils);
      expect(comp.automovilsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call LugarSalida query and add missing value', () => {
      const horario: IHorario = { id: 456 };
      const lugarSalida: ILugarSalida = { id: 39452 };
      horario.lugarSalida = lugarSalida;

      const lugarSalidaCollection: ILugarSalida[] = [{ id: 89845 }];
      jest.spyOn(lugarSalidaService, 'query').mockReturnValue(of(new HttpResponse({ body: lugarSalidaCollection })));
      const additionalLugarSalidas = [lugarSalida];
      const expectedCollection: ILugarSalida[] = [...additionalLugarSalidas, ...lugarSalidaCollection];
      jest.spyOn(lugarSalidaService, 'addLugarSalidaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(lugarSalidaService.query).toHaveBeenCalled();
      expect(lugarSalidaService.addLugarSalidaToCollectionIfMissing).toHaveBeenCalledWith(lugarSalidaCollection, ...additionalLugarSalidas);
      expect(comp.lugarSalidasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const horario: IHorario = { id: 456 };
      const alumno: IAlumno = { id: 27788 };
      horario.alumno = alumno;
      const instructor: IProfesor = { id: 36226 };
      horario.instructor = instructor;
      const programacion: IProgramacion = { id: 52241 };
      horario.programacion = programacion;
      const fecha: IFecha = { id: 28698 };
      horario.fecha = fecha;
      const horarioCatalogo: IHorarioCatalogo = { id: 59151 };
      horario.horarioCatalogo = horarioCatalogo;
      const automovil: IAutomovil = { id: 25095 };
      horario.automovil = automovil;
      const lugarSalida: ILugarSalida = { id: 3299 };
      horario.lugarSalida = lugarSalida;

      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(horario));
      expect(comp.alumnosSharedCollection).toContain(alumno);
      expect(comp.profesorsSharedCollection).toContain(instructor);
      expect(comp.programacionsSharedCollection).toContain(programacion);
      expect(comp.fechasSharedCollection).toContain(fecha);
      expect(comp.horarioCatalogosSharedCollection).toContain(horarioCatalogo);
      expect(comp.automovilsSharedCollection).toContain(automovil);
      expect(comp.lugarSalidasSharedCollection).toContain(lugarSalida);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Horario>>();
      const horario = { id: 123 };
      jest.spyOn(horarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horario }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioService.update).toHaveBeenCalledWith(horario);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Horario>>();
      const horario = new Horario();
      jest.spyOn(horarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horario }));
      saveSubject.complete();

      // THEN
      expect(horarioService.create).toHaveBeenCalledWith(horario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Horario>>();
      const horario = { id: 123 };
      jest.spyOn(horarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioService.update).toHaveBeenCalledWith(horario);
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

    describe('trackProfesorById', () => {
      it('Should return tracked Profesor primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProfesorById(0, entity);
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

    describe('trackAutomovilById', () => {
      it('Should return tracked Automovil primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAutomovilById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackLugarSalidaById', () => {
      it('Should return tracked LugarSalida primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLugarSalidaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
