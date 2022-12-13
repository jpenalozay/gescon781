import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HorarioDeshabilitacionDetailComponent } from './horario-deshabilitacion-detail.component';

describe('HorarioDeshabilitacion Management Detail Component', () => {
  let comp: HorarioDeshabilitacionDetailComponent;
  let fixture: ComponentFixture<HorarioDeshabilitacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioDeshabilitacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ horarioDeshabilitacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HorarioDeshabilitacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HorarioDeshabilitacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load horarioDeshabilitacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.horarioDeshabilitacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
