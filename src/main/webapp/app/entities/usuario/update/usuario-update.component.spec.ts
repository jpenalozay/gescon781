import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuarioService } from '../service/usuario.service';
import { IUsuario, Usuario } from '../usuario.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';
import { IComputadora } from 'app/entities/computadora/computadora.model';
import { ComputadoraService } from 'app/entities/computadora/service/computadora.service';

import { UsuarioUpdateComponent } from './usuario-update.component';

describe('Usuario Management Update Component', () => {
  let comp: UsuarioUpdateComponent;
  let fixture: ComponentFixture<UsuarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioService: UsuarioService;
  let userService: UserService;
  let empleadoService: EmpleadoService;
  let sucursalService: SucursalService;
  let computadoraService: ComputadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuarioUpdateComponent],
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
      .overrideTemplate(UsuarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioService = TestBed.inject(UsuarioService);
    userService = TestBed.inject(UserService);
    empleadoService = TestBed.inject(EmpleadoService);
    sucursalService = TestBed.inject(SucursalService);
    computadoraService = TestBed.inject(ComputadoraService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const user: IUser = { id: 13812 };
      usuario.user = user;

      const userCollection: IUser[] = [{ id: 98506 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call empleado query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const empleado: IEmpleado = { id: 95396 };
      usuario.empleado = empleado;

      const empleadoCollection: IEmpleado[] = [{ id: 97810 }];
      jest.spyOn(empleadoService, 'query').mockReturnValue(of(new HttpResponse({ body: empleadoCollection })));
      const expectedCollection: IEmpleado[] = [empleado, ...empleadoCollection];
      jest.spyOn(empleadoService, 'addEmpleadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(empleadoService.query).toHaveBeenCalled();
      expect(empleadoService.addEmpleadoToCollectionIfMissing).toHaveBeenCalledWith(empleadoCollection, empleado);
      expect(comp.empleadosCollection).toEqual(expectedCollection);
    });

    it('Should call Sucursal query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const sucursals: ISucursal[] = [{ id: 90936 }];
      usuario.sucursals = sucursals;

      const sucursalCollection: ISucursal[] = [{ id: 83006 }];
      jest.spyOn(sucursalService, 'query').mockReturnValue(of(new HttpResponse({ body: sucursalCollection })));
      const additionalSucursals = [...sucursals];
      const expectedCollection: ISucursal[] = [...additionalSucursals, ...sucursalCollection];
      jest.spyOn(sucursalService, 'addSucursalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(sucursalService.query).toHaveBeenCalled();
      expect(sucursalService.addSucursalToCollectionIfMissing).toHaveBeenCalledWith(sucursalCollection, ...additionalSucursals);
      expect(comp.sucursalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Computadora query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const computadoras: IComputadora[] = [{ id: 52245 }];
      usuario.computadoras = computadoras;

      const computadoraCollection: IComputadora[] = [{ id: 53098 }];
      jest.spyOn(computadoraService, 'query').mockReturnValue(of(new HttpResponse({ body: computadoraCollection })));
      const additionalComputadoras = [...computadoras];
      const expectedCollection: IComputadora[] = [...additionalComputadoras, ...computadoraCollection];
      jest.spyOn(computadoraService, 'addComputadoraToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(computadoraService.query).toHaveBeenCalled();
      expect(computadoraService.addComputadoraToCollectionIfMissing).toHaveBeenCalledWith(computadoraCollection, ...additionalComputadoras);
      expect(comp.computadorasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuario: IUsuario = { id: 456 };
      const user: IUser = { id: 95854 };
      usuario.user = user;
      const empleado: IEmpleado = { id: 70961 };
      usuario.empleado = empleado;
      const sucursals: ISucursal = { id: 24921 };
      usuario.sucursals = [sucursals];
      const computadoras: IComputadora = { id: 6832 };
      usuario.computadoras = [computadoras];

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(usuario));
      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.empleadosCollection).toContain(empleado);
      expect(comp.sucursalsSharedCollection).toContain(sucursals);
      expect(comp.computadorasSharedCollection).toContain(computadoras);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuario>>();
      const usuario = { id: 123 };
      jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuario }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioService.update).toHaveBeenCalledWith(usuario);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuario>>();
      const usuario = new Usuario();
      jest.spyOn(usuarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuario }));
      saveSubject.complete();

      // THEN
      expect(usuarioService.create).toHaveBeenCalledWith(usuario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Usuario>>();
      const usuario = { id: 123 };
      jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioService.update).toHaveBeenCalledWith(usuario);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEmpleadoById', () => {
      it('Should return tracked Empleado primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmpleadoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackSucursalById', () => {
      it('Should return tracked Sucursal primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSucursalById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackComputadoraById', () => {
      it('Should return tracked Computadora primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackComputadoraById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedSucursal', () => {
      it('Should return option if no Sucursal is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedSucursal(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Sucursal for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedSucursal(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Sucursal is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedSucursal(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedComputadora', () => {
      it('Should return option if no Computadora is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedComputadora(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Computadora for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedComputadora(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Computadora is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedComputadora(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
