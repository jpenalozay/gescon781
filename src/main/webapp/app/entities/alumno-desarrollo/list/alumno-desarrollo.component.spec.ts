import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AlumnoDesarrolloService } from '../service/alumno-desarrollo.service';

import { AlumnoDesarrolloComponent } from './alumno-desarrollo.component';

describe('AlumnoDesarrollo Management Component', () => {
  let comp: AlumnoDesarrolloComponent;
  let fixture: ComponentFixture<AlumnoDesarrolloComponent>;
  let service: AlumnoDesarrolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AlumnoDesarrolloComponent],
    })
      .overrideTemplate(AlumnoDesarrolloComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoDesarrolloComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlumnoDesarrolloService);

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
    expect(comp.alumnoDesarrollos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
