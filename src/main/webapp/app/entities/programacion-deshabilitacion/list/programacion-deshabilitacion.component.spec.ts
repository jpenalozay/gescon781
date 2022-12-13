import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProgramacionDeshabilitacionService } from '../service/programacion-deshabilitacion.service';

import { ProgramacionDeshabilitacionComponent } from './programacion-deshabilitacion.component';

describe('ProgramacionDeshabilitacion Management Component', () => {
  let comp: ProgramacionDeshabilitacionComponent;
  let fixture: ComponentFixture<ProgramacionDeshabilitacionComponent>;
  let service: ProgramacionDeshabilitacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProgramacionDeshabilitacionComponent],
    })
      .overrideTemplate(ProgramacionDeshabilitacionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProgramacionDeshabilitacionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProgramacionDeshabilitacionService);

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
    expect(comp.programacionDeshabilitacions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
