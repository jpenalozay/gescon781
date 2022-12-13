import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProgramacionDeshabilitacionDetailComponent } from './programacion-deshabilitacion-detail.component';

describe('ProgramacionDeshabilitacion Management Detail Component', () => {
  let comp: ProgramacionDeshabilitacionDetailComponent;
  let fixture: ComponentFixture<ProgramacionDeshabilitacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramacionDeshabilitacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ programacionDeshabilitacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProgramacionDeshabilitacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProgramacionDeshabilitacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load programacionDeshabilitacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.programacionDeshabilitacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
