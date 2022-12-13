import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LicenciaCategoriaService } from '../service/licencia-categoria.service';
import { ILicenciaCategoria, LicenciaCategoria } from '../licencia-categoria.model';

import { LicenciaCategoriaUpdateComponent } from './licencia-categoria-update.component';

describe('LicenciaCategoria Management Update Component', () => {
  let comp: LicenciaCategoriaUpdateComponent;
  let fixture: ComponentFixture<LicenciaCategoriaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let licenciaCategoriaService: LicenciaCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LicenciaCategoriaUpdateComponent],
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
      .overrideTemplate(LicenciaCategoriaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LicenciaCategoriaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    licenciaCategoriaService = TestBed.inject(LicenciaCategoriaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const licenciaCategoria: ILicenciaCategoria = { id: 456 };

      activatedRoute.data = of({ licenciaCategoria });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(licenciaCategoria));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LicenciaCategoria>>();
      const licenciaCategoria = { id: 123 };
      jest.spyOn(licenciaCategoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenciaCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: licenciaCategoria }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(licenciaCategoriaService.update).toHaveBeenCalledWith(licenciaCategoria);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LicenciaCategoria>>();
      const licenciaCategoria = new LicenciaCategoria();
      jest.spyOn(licenciaCategoriaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenciaCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: licenciaCategoria }));
      saveSubject.complete();

      // THEN
      expect(licenciaCategoriaService.create).toHaveBeenCalledWith(licenciaCategoria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LicenciaCategoria>>();
      const licenciaCategoria = { id: 123 };
      jest.spyOn(licenciaCategoriaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenciaCategoria });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(licenciaCategoriaService.update).toHaveBeenCalledWith(licenciaCategoria);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
