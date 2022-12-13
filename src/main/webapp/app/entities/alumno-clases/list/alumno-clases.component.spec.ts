import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AlumnoClasesService } from '../service/alumno-clases.service';

import { AlumnoClasesComponent } from './alumno-clases.component';

describe('AlumnoClases Management Component', () => {
  let comp: AlumnoClasesComponent;
  let fixture: ComponentFixture<AlumnoClasesComponent>;
  let service: AlumnoClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AlumnoClasesComponent],
    })
      .overrideTemplate(AlumnoClasesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoClasesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlumnoClasesService);

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
    expect(comp.alumnoClases?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
