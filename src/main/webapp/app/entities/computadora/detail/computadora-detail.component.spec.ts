import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComputadoraDetailComponent } from './computadora-detail.component';

describe('Computadora Management Detail Component', () => {
  let comp: ComputadoraDetailComponent;
  let fixture: ComponentFixture<ComputadoraDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComputadoraDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ computadora: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ComputadoraDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ComputadoraDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load computadora on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.computadora).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
