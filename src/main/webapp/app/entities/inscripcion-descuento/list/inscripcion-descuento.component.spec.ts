import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InscripcionDescuentoService } from '../service/inscripcion-descuento.service';

import { InscripcionDescuentoComponent } from './inscripcion-descuento.component';

describe('InscripcionDescuento Management Component', () => {
  let comp: InscripcionDescuentoComponent;
  let fixture: ComponentFixture<InscripcionDescuentoComponent>;
  let service: InscripcionDescuentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InscripcionDescuentoComponent],
    })
      .overrideTemplate(InscripcionDescuentoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionDescuentoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InscripcionDescuentoService);

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
    expect(comp.inscripcionDescuentos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
