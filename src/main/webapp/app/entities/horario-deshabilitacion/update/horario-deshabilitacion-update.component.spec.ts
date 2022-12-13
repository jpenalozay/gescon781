import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';
import { IHorarioDeshabilitacion, HorarioDeshabilitacion } from '../horario-deshabilitacion.model';
import { IProgramacionDeshabilitacion } from 'app/entities/programacion-deshabilitacion/programacion-deshabilitacion.model';
import { ProgramacionDeshabilitacionService } from 'app/entities/programacion-deshabilitacion/service/programacion-deshabilitacion.service';
import { IHorario } from 'app/entities/horario/horario.model';
import { HorarioService } from 'app/entities/horario/service/horario.service';

import { HorarioDeshabilitacionUpdateComponent } from './horario-deshabilitacion-update.component';

describe('HorarioDeshabilitacion Management Update Component', () => {
  let comp: HorarioDeshabilitacionUpdateComponent;
  let fixture: ComponentFixture<HorarioDeshabilitacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioDeshabilitacionService: HorarioDeshabilitacionService;
  let programacionDeshabilitacionService: ProgramacionDeshabilitacionService;
  let horarioService: HorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HorarioDeshabilitacionUpdateComponent],
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
      .overrideTemplate(HorarioDeshabilitacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioDeshabilitacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioDeshabilitacionService = TestBed.inject(HorarioDeshabilitacionService);
    programacionDeshabilitacionService = TestBed.inject(ProgramacionDeshabilitacionService);
    horarioService = TestBed.inject(HorarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProgramacionDeshabilitacion query and add missing value', () => {
      const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 456 };
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 60726 };
      horarioDeshabilitacion.programacionDeshabilitacion = programacionDeshabilitacion;

      const programacionDeshabilitacionCollection: IProgramacionDeshabilitacion[] = [{ id: 36984 }];
      jest
        .spyOn(programacionDeshabilitacionService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: programacionDeshabilitacionCollection })));
      const additionalProgramacionDeshabilitacions = [programacionDeshabilitacion];
      const expectedCollection: IProgramacionDeshabilitacion[] = [
        ...additionalProgramacionDeshabilitacions,
        ...programacionDeshabilitacionCollection,
      ];
      jest
        .spyOn(programacionDeshabilitacionService, 'addProgramacionDeshabilitacionToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      expect(programacionDeshabilitacionService.query).toHaveBeenCalled();
      expect(programacionDeshabilitacionService.addProgramacionDeshabilitacionToCollectionIfMissing).toHaveBeenCalledWith(
        programacionDeshabilitacionCollection,
        ...additionalProgramacionDeshabilitacions
      );
      expect(comp.programacionDeshabilitacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Horario query and add missing value', () => {
      const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 456 };
      const horario: IHorario = { id: 22017 };
      horarioDeshabilitacion.horario = horario;

      const horarioCollection: IHorario[] = [{ id: 81629 }];
      jest.spyOn(horarioService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioCollection })));
      const additionalHorarios = [horario];
      const expectedCollection: IHorario[] = [...additionalHorarios, ...horarioCollection];
      jest.spyOn(horarioService, 'addHorarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      expect(horarioService.query).toHaveBeenCalled();
      expect(horarioService.addHorarioToCollectionIfMissing).toHaveBeenCalledWith(horarioCollection, ...additionalHorarios);
      expect(comp.horariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const horarioDeshabilitacion: IHorarioDeshabilitacion = { id: 456 };
      const programacionDeshabilitacion: IProgramacionDeshabilitacion = { id: 35333 };
      horarioDeshabilitacion.programacionDeshabilitacion = programacionDeshabilitacion;
      const horario: IHorario = { id: 78865 };
      horarioDeshabilitacion.horario = horario;

      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(horarioDeshabilitacion));
      expect(comp.programacionDeshabilitacionsSharedCollection).toContain(programacionDeshabilitacion);
      expect(comp.horariosSharedCollection).toContain(horario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioDeshabilitacion>>();
      const horarioDeshabilitacion = { id: 123 };
      jest.spyOn(horarioDeshabilitacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioDeshabilitacion }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioDeshabilitacionService.update).toHaveBeenCalledWith(horarioDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioDeshabilitacion>>();
      const horarioDeshabilitacion = new HorarioDeshabilitacion();
      jest.spyOn(horarioDeshabilitacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioDeshabilitacion }));
      saveSubject.complete();

      // THEN
      expect(horarioDeshabilitacionService.create).toHaveBeenCalledWith(horarioDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HorarioDeshabilitacion>>();
      const horarioDeshabilitacion = { id: 123 };
      jest.spyOn(horarioDeshabilitacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioDeshabilitacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioDeshabilitacionService.update).toHaveBeenCalledWith(horarioDeshabilitacion);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProgramacionDeshabilitacionById', () => {
      it('Should return tracked ProgramacionDeshabilitacion primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProgramacionDeshabilitacionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackHorarioById', () => {
      it('Should return tracked Horario primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackHorarioById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
