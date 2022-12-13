import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlumnoDesarrolloDetailComponent } from './alumno-desarrollo-detail.component';

describe('AlumnoDesarrollo Management Detail Component', () => {
  let comp: AlumnoDesarrolloDetailComponent;
  let fixture: ComponentFixture<AlumnoDesarrolloDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoDesarrolloDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alumnoDesarrollo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlumnoDesarrolloDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlumnoDesarrolloDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alumnoDesarrollo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alumnoDesarrollo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
