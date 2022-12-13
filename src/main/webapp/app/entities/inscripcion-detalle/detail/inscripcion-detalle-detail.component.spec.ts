import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InscripcionDetalleDetailComponent } from './inscripcion-detalle-detail.component';

describe('InscripcionDetalle Management Detail Component', () => {
  let comp: InscripcionDetalleDetailComponent;
  let fixture: ComponentFixture<InscripcionDetalleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionDetalleDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ inscripcionDetalle: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InscripcionDetalleDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InscripcionDetalleDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load inscripcionDetalle on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.inscripcionDetalle).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
