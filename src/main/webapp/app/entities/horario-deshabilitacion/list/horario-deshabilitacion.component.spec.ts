import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HorarioDeshabilitacionService } from '../service/horario-deshabilitacion.service';

import { HorarioDeshabilitacionComponent } from './horario-deshabilitacion.component';

describe('HorarioDeshabilitacion Management Component', () => {
  let comp: HorarioDeshabilitacionComponent;
  let fixture: ComponentFixture<HorarioDeshabilitacionComponent>;
  let service: HorarioDeshabilitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HorarioDeshabilitacionComponent],
    })
      .overrideTemplate(HorarioDeshabilitacionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioDeshabilitacionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HorarioDeshabilitacionService);

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
    expect(comp.horarioDeshabilitacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
