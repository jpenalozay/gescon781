import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AlumnoUsuarioService } from '../service/alumno-usuario.service';

import { AlumnoUsuarioComponent } from './alumno-usuario.component';

describe('AlumnoUsuario Management Component', () => {
  let comp: AlumnoUsuarioComponent;
  let fixture: ComponentFixture<AlumnoUsuarioComponent>;
  let service: AlumnoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AlumnoUsuarioComponent],
    })
      .overrideTemplate(AlumnoUsuarioComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoUsuarioComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlumnoUsuarioService);

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
    expect(comp.alumnoUsuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
