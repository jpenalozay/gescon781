import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InscripcionAdicionalService } from '../service/inscripcion-adicional.service';

import { InscripcionAdicionalComponent } from './inscripcion-adicional.component';

describe('InscripcionAdicional Management Component', () => {
  let comp: InscripcionAdicionalComponent;
  let fixture: ComponentFixture<InscripcionAdicionalComponent>;
  let service: InscripcionAdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InscripcionAdicionalComponent],
    })
      .overrideTemplate(InscripcionAdicionalComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionAdicionalComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InscripcionAdicionalService);

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
    expect(comp.inscripcionAdicionals?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
