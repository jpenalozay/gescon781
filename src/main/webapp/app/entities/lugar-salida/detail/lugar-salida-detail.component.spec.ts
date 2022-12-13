import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LugarSalidaDetailComponent } from './lugar-salida-detail.component';

describe('LugarSalida Management Detail Component', () => {
  let comp: LugarSalidaDetailComponent;
  let fixture: ComponentFixture<LugarSalidaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LugarSalidaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ lugarSalida: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LugarSalidaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LugarSalidaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load lugarSalida on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.lugarSalida).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
