import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LicenciaCategoriaDetailComponent } from './licencia-categoria-detail.component';

describe('LicenciaCategoria Management Detail Component', () => {
  let comp: LicenciaCategoriaDetailComponent;
  let fixture: ComponentFixture<LicenciaCategoriaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenciaCategoriaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ licenciaCategoria: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LicenciaCategoriaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LicenciaCategoriaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load licenciaCategoria on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.licenciaCategoria).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
