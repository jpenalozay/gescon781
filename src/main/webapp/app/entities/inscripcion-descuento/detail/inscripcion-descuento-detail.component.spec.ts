import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InscripcionDescuentoDetailComponent } from './inscripcion-descuento-detail.component';

describe('InscripcionDescuento Management Detail Component', () => {
  let comp: InscripcionDescuentoDetailComponent;
  let fixture: ComponentFixture<InscripcionDescuentoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionDescuentoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ inscripcionDescuento: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InscripcionDescuentoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InscripcionDescuentoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load inscripcionDescuento on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.inscripcionDescuento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
