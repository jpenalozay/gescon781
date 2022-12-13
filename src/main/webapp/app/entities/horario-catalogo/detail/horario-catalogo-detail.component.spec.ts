import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HorarioCatalogoDetailComponent } from './horario-catalogo-detail.component';

describe('HorarioCatalogo Management Detail Component', () => {
  let comp: HorarioCatalogoDetailComponent;
  let fixture: ComponentFixture<HorarioCatalogoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioCatalogoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ horarioCatalogo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HorarioCatalogoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HorarioCatalogoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load horarioCatalogo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.horarioCatalogo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
