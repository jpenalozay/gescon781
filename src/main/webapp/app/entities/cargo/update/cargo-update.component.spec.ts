import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CargoService } from '../service/cargo.service';
import { ICargo, Cargo } from '../cargo.model';
import { IArea } from 'app/entities/area/area.model';
import { AreaService } from 'app/entities/area/service/area.service';

import { CargoUpdateComponent } from './cargo-update.component';

describe('Cargo Management Update Component', () => {
  let comp: CargoUpdateComponent;
  let fixture: ComponentFixture<CargoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cargoService: CargoService;
  let areaService: AreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CargoUpdateComponent],
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
      .overrideTemplate(CargoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CargoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cargoService = TestBed.inject(CargoService);
    areaService = TestBed.inject(AreaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cargo query and add missing value', () => {
      const cargo: ICargo = { id: 456 };
      const cargoSuperior: ICargo = { id: 65758 };
      cargo.cargoSuperior = cargoSuperior;

      const cargoCollection: ICargo[] = [{ id: 45205 }];
      jest.spyOn(cargoService, 'query').mockReturnValue(of(new HttpResponse({ body: cargoCollection })));
      const additionalCargos = [cargoSuperior];
      const expectedCollection: ICargo[] = [...additionalCargos, ...cargoCollection];
      jest.spyOn(cargoService, 'addCargoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      expect(cargoService.query).toHaveBeenCalled();
      expect(cargoService.addCargoToCollectionIfMissing).toHaveBeenCalledWith(cargoCollection, ...additionalCargos);
      expect(comp.cargosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Area query and add missing value', () => {
      const cargo: ICargo = { id: 456 };
      const areaPerteneciente: IArea = { id: 59758 };
      cargo.areaPerteneciente = areaPerteneciente;

      const areaCollection: IArea[] = [{ id: 72402 }];
      jest.spyOn(areaService, 'query').mockReturnValue(of(new HttpResponse({ body: areaCollection })));
      const additionalAreas = [areaPerteneciente];
      const expectedCollection: IArea[] = [...additionalAreas, ...areaCollection];
      jest.spyOn(areaService, 'addAreaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      expect(areaService.query).toHaveBeenCalled();
      expect(areaService.addAreaToCollectionIfMissing).toHaveBeenCalledWith(areaCollection, ...additionalAreas);
      expect(comp.areasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cargo: ICargo = { id: 456 };
      const cargoSuperior: ICargo = { id: 66632 };
      cargo.cargoSuperior = cargoSuperior;
      const areaPerteneciente: IArea = { id: 19777 };
      cargo.areaPerteneciente = areaPerteneciente;

      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(cargo));
      expect(comp.cargosSharedCollection).toContain(cargoSuperior);
      expect(comp.areasSharedCollection).toContain(areaPerteneciente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cargo>>();
      const cargo = { id: 123 };
      jest.spyOn(cargoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cargo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cargoService.update).toHaveBeenCalledWith(cargo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cargo>>();
      const cargo = new Cargo();
      jest.spyOn(cargoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cargo }));
      saveSubject.complete();

      // THEN
      expect(cargoService.create).toHaveBeenCalledWith(cargo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Cargo>>();
      const cargo = { id: 123 };
      jest.spyOn(cargoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cargo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cargoService.update).toHaveBeenCalledWith(cargo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackCargoById', () => {
      it('Should return tracked Cargo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCargoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackAreaById', () => {
      it('Should return tracked Area primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackAreaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
