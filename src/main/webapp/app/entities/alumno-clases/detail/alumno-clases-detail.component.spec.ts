import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlumnoClasesDetailComponent } from './alumno-clases-detail.component';

describe('AlumnoClases Management Detail Component', () => {
  let comp: AlumnoClasesDetailComponent;
  let fixture: ComponentFixture<AlumnoClasesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoClasesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alumnoClases: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlumnoClasesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlumnoClasesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alumnoClases on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alumnoClases).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
