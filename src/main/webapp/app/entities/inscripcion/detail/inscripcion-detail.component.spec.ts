import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InscripcionDetailComponent } from './inscripcion-detail.component';

describe('Inscripcion Management Detail Component', () => {
  let comp: InscripcionDetailComponent;
  let fixture: ComponentFixture<InscripcionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ inscripcion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InscripcionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InscripcionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load inscripcion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.inscripcion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
