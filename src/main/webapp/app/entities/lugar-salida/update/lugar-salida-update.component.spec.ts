import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LugarSalidaService } from '../service/lugar-salida.service';
import { ILugarSalida, LugarSalida } from '../lugar-salida.model';

import { LugarSalidaUpdateComponent } from './lugar-salida-update.component';

describe('LugarSalida Management Update Component', () => {
  let comp: LugarSalidaUpdateComponent;
  let fixture: ComponentFixture<LugarSalidaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lugarSalidaService: LugarSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LugarSalidaUpdateComponent],
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
      .overrideTemplate(LugarSalidaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LugarSalidaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lugarSalidaService = TestBed.inject(LugarSalidaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const lugarSalida: ILugarSalida = { id: 456 };

      activatedRoute.data = of({ lugarSalida });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(lugarSalida));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LugarSalida>>();
      const lugarSalida = { id: 123 };
      jest.spyOn(lugarSalidaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lugarSalida });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lugarSalida }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(lugarSalidaService.update).toHaveBeenCalledWith(lugarSalida);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LugarSalida>>();
      const lugarSalida = new LugarSalida();
      jest.spyOn(lugarSalidaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lugarSalida });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lugarSalida }));
      saveSubject.complete();

      // THEN
      expect(lugarSalidaService.create).toHaveBeenCalledWith(lugarSalida);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LugarSalida>>();
      const lugarSalida = { id: 123 };
      jest.spyOn(lugarSalidaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lugarSalida });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(lugarSalidaService.update).toHaveBeenCalledWith(lugarSalida);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
