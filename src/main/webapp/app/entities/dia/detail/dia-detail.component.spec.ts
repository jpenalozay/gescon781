import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DiaDetailComponent } from './dia-detail.component';

describe('Dia Management Detail Component', () => {
  let comp: DiaDetailComponent;
  let fixture: ComponentFixture<DiaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dia: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DiaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DiaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dia on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dia).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
