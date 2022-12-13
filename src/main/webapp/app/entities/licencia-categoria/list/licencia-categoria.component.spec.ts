import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LicenciaCategoriaService } from '../service/licencia-categoria.service';

import { LicenciaCategoriaComponent } from './licencia-categoria.component';

describe('LicenciaCategoria Management Component', () => {
  let comp: LicenciaCategoriaComponent;
  let fixture: ComponentFixture<LicenciaCategoriaComponent>;
  let service: LicenciaCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LicenciaCategoriaComponent],
    })
      .overrideTemplate(LicenciaCategoriaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LicenciaCategoriaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LicenciaCategoriaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.licenciaCategorias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
