import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProfesorService } from '../service/profesor.service';
import { IProfesor, Profesor } from '../profesor.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ILicenciaCategoria } from 'app/entities/licencia-categoria/licencia-categoria.model';
import { LicenciaCategoriaService } from 'app/entities/licencia-categoria/service/licencia-categoria.service';

import { ProfesorUpdateComponent } from './profesor-update.component';

describe('Profesor Management Update Component', () => {
  let comp: ProfesorUpdateComponent;
  let fixture: ComponentFixture<ProfesorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let profesorService: ProfesorService;
  let empleadoService: EmpleadoService;
  let licenciaCategoriaService: LicenciaCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProfesorUpdateComponent],
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
      .overrideTemplate(ProfesorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfesorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    profesorService = TestBed.inject(ProfesorService);
    empleadoService = TestBed.inject(EmpleadoService);
    licenciaCategoriaService = TestBed.inject(LicenciaCategoriaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call empleado query and add missing value', () => {
      const profesor: IProfesor = { id: 456 };
      const empleado: IEmpleado = { id: 84947 };
      profesor.empleado = empleado;

      const empleadoCollection: IEmpleado[] = [{ id: 54518 }];
      jest.spyOn(empleadoService, 'query').mockReturnValue(of(new HttpResponse({ body: empleadoCollection })));
      const expectedCollection: IEmpleado[] = [empleado, ...empleadoCollection];
      jest.spyOn(empleadoService, 'addEmpleadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      expect(empleadoService.query).toHaveBeenCalled();
      expect(empleadoService.addEmpleadoToCollectionIfMissing).toHaveBeenCalledWith(empleadoCollection, empleado);
      expect(comp.empleadosCollection).toEqual(expectedCollection);
    });

    it('Should call LicenciaCategoria query and add missing value', () => {
      const profesor: IProfesor = { id: 456 };
      const licenciasPermitidas: ILicenciaCategoria[] = [{ id: 24284 }];
      profesor.licenciasPermitidas = licenciasPermitidas;
      const licenciaCategoria: ILicenciaCategoria = { id: 53669 };
      profesor.licenciaCategoria = licenciaCategoria;

      const licenciaCategoriaCollection: ILicenciaCategoria[] = [{ id: 20595 }];
      jest.spyOn(licenciaCategoriaService, 'query').mockReturnValue(of(new HttpResponse({ body: licenciaCategoriaCollection })));
      const additionalLicenciaCategorias = [...licenciasPermitidas, licenciaCategoria];
      const expectedCollection: ILicenciaCategoria[] = [...additionalLicenciaCategorias, ...licenciaCategoriaCollection];
      jest.spyOn(licenciaCategoriaService, 'addLicenciaCategoriaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      expect(licenciaCategoriaService.query).toHaveBeenCalled();
      expect(licenciaCategoriaService.addLicenciaCategoriaToCollectionIfMissing).toHaveBeenCalledWith(
        licenciaCategoriaCollection,
        ...additionalLicenciaCategorias
      );
      expect(comp.licenciaCategoriasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const profesor: IProfesor = { id: 456 };
      const empleado: IEmpleado = { id: 873 };
      profesor.empleado = empleado;
      const licenciasPermitidas: ILicenciaCategoria = { id: 72309 };
      profesor.licenciasPermitidas = [licenciasPermitidas];
      const licenciaCategoria: ILicenciaCategoria = { id: 42869 };
      profesor.licenciaCategoria = licenciaCategoria;

      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(profesor));
      expect(comp.empleadosCollection).toContain(empleado);
      expect(comp.licenciaCategoriasSharedCollection).toContain(licenciasPermitidas);
      expect(comp.licenciaCategoriasSharedCollection).toContain(licenciaCategoria);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Profesor>>();
      const profesor = { id: 123 };
      jest.spyOn(profesorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profesor }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(profesorService.update).toHaveBeenCalledWith(profesor);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Profesor>>();
      const profesor = new Profesor();
      jest.spyOn(profesorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profesor }));
      saveSubject.complete();

      // THEN
      expect(profesorService.create).toHaveBeenCalledWith(profesor);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Profesor>>();
      const profesor = { id: 123 };
      jest.spyOn(profesorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profesor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(profesorService.update).toHaveBeenCalledWith(profesor);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEmpleadoById', () => {
      it('Should return tracked Empleado primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmpleadoById(0, entity);
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
  });
});
