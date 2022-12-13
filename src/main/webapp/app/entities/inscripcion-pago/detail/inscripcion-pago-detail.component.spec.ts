import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InscripcionPagoDetailComponent } from './inscripcion-pago-detail.component';

describe('InscripcionPago Management Detail Component', () => {
  let comp: InscripcionPagoDetailComponent;
  let fixture: ComponentFixture<InscripcionPagoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionPagoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ inscripcionPago: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(InscripcionPagoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InscripcionPagoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load inscripcionPago on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.inscripcionPago).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
