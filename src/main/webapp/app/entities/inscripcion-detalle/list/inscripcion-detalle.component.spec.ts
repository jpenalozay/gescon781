import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InscripcionDetalleService } from '../service/inscripcion-detalle.service';

import { InscripcionDetalleComponent } from './inscripcion-detalle.component';

describe('InscripcionDetalle Management Component', () => {
  let comp: InscripcionDetalleComponent;
  let fixture: ComponentFixture<InscripcionDetalleComponent>;
  let service: InscripcionDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InscripcionDetalleComponent],
    })
      .overrideTemplate(InscripcionDetalleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionDetalleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InscripcionDetalleService);

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
    expect(comp.inscripcionDetalles?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
