import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InscripcionPagoService } from '../service/inscripcion-pago.service';

import { InscripcionPagoComponent } from './inscripcion-pago.component';

describe('InscripcionPago Management Component', () => {
  let comp: InscripcionPagoComponent;
  let fixture: ComponentFixture<InscripcionPagoComponent>;
  let service: InscripcionPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InscripcionPagoComponent],
    })
      .overrideTemplate(InscripcionPagoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionPagoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InscripcionPagoService);

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
    expect(comp.inscripcionPagos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
