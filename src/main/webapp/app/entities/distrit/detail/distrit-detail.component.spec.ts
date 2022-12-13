import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DistritDetailComponent } from './distrit-detail.component';

describe('Distrit Management Detail Component', () => {
  let comp: DistritDetailComponent;
  let fixture: ComponentFixture<DistritDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistritDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ distrit: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DistritDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DistritDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load distrit on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.distrit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
