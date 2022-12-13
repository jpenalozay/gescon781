import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlumnoCategoriaDetailComponent } from './alumno-categoria-detail.component';

describe('AlumnoCategoria Management Detail Component', () => {
  let comp: AlumnoCategoriaDetailComponent;
  let fixture: ComponentFixture<AlumnoCategoriaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoCategoriaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ alumnoCategoria: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AlumnoCategoriaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AlumnoCategoriaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load alumnoCategoria on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.alumnoCategoria).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
