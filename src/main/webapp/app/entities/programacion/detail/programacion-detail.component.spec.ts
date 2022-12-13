import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProgramacionDetailComponent } from './programacion-detail.component';

describe('Programacion Management Detail Component', () => {
  let comp: ProgramacionDetailComponent;
  let fixture: ComponentFixture<ProgramacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ programacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProgramacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProgramacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load programacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.programacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
