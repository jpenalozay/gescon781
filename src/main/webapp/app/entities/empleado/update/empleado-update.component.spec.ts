import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmpleadoService } from '../service/empleado.service';
import { IEmpleado, Empleado } from '../empleado.model';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { ICargo } from 'app/entities/cargo/cargo.model';
import { CargoService } from 'app/entities/cargo/service/cargo.service';

import { EmpleadoUpdateComponent } from './empleado-update.component';

describe('Empleado Management Update Component', () => {
  let comp: EmpleadoUpdateComponent;
  let fixture: ComponentFixture<EmpleadoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let empleadoService: EmpleadoService;
  let personaService: PersonaService;
  let cargoService: CargoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmpleadoUpdateComponent],
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
      .overrideTemplate(EmpleadoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmpleadoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    empleadoService = TestBed.inject(EmpleadoService);
    personaService = TestBed.inject(PersonaService);
    cargoService = TestBed.inject(CargoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call persona query and add missing value', () => {
      const empleado: IEmpleado = { id: 456 };
      const persona: IPersona = { id: 30079 };
      empleado.persona = persona;

      const personaCollection: IPersona[] = [{ id: 4338 }];
      jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
      const expectedCollection: IPersona[] = [persona, ...personaCollection];
      jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      expect(personaService.query).toHaveBeenCalled();
      expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(personaCollection, persona);
      expect(comp.personasCollection).toEqual(expectedCollection);
    });

    it('Should call Cargo query and add missing value', () => {
      const empleado: IEmpleado = { id: 456 };
      const cargo: ICargo = { id: 75203 };
      empleado.cargo = cargo;

      const cargoCollection: ICargo[] = [{ id: 28145 }];
      jest.spyOn(cargoService, 'query').mockReturnValue(of(new HttpResponse({ body: cargoCollection })));
      const additionalCargos = [cargo];
      const expectedCollection: ICargo[] = [...additionalCargos, ...cargoCollection];
      jest.spyOn(cargoService, 'addCargoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      expect(cargoService.query).toHaveBeenCalled();
      expect(cargoService.addCargoToCollectionIfMissing).toHaveBeenCalledWith(cargoCollection, ...additionalCargos);
      expect(comp.cargosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const empleado: IEmpleado = { id: 456 };
      const persona: IPersona = { id: 75237 };
      empleado.persona = persona;
      const cargo: ICargo = { id: 44863 };
      empleado.cargo = cargo;

      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(empleado));
      expect(comp.personasCollection).toContain(persona);
      expect(comp.cargosSharedCollection).toContain(cargo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Empleado>>();
      const empleado = { id: 123 };
      jest.spyOn(empleadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: empleado }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(empleadoService.update).toHaveBeenCalledWith(empleado);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Empleado>>();
      const empleado = new Empleado();
      jest.spyOn(empleadoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: empleado }));
      saveSubject.complete();

      // THEN
      expect(empleadoService.create).toHaveBeenCalledWith(empleado);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Empleado>>();
      const empleado = { id: 123 };
      jest.spyOn(empleadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ empleado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(empleadoService.update).toHaveBeenCalledWith(empleado);
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

    describe('trackCargoById', () => {
      it('Should return tracked Cargo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCargoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
