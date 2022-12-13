import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SucursalSerieDetailComponent } from './sucursal-serie-detail.component';

describe('SucursalSerie Management Detail Component', () => {
  let comp: SucursalSerieDetailComponent;
  let fixture: ComponentFixture<SucursalSerieDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalSerieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sucursalSerie: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SucursalSerieDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SucursalSerieDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sucursalSerie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sucursalSerie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
