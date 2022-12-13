import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RequisitosInscripcionService } from '../service/requisitos-inscripcion.service';

import { RequisitosInscripcionComponent } from './requisitos-inscripcion.component';

describe('RequisitosInscripcion Management Component', () => {
  let comp: RequisitosInscripcionComponent;
  let fixture: ComponentFixture<RequisitosInscripcionComponent>;
  let service: RequisitosInscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RequisitosInscripcionComponent],
    })
      .overrideTemplate(RequisitosInscripcionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RequisitosInscripcionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RequisitosInscripcionService);

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
    expect(comp.requisitosInscripcions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
