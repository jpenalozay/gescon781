import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FechaDetailComponent } from './fecha-detail.component';

describe('Fecha Management Detail Component', () => {
  let comp: FechaDetailComponent;
  let fixture: ComponentFixture<FechaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FechaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ fecha: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FechaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FechaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load fecha on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.fecha).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
