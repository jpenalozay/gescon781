import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AsignaturaAdicionesService } from '../service/asignatura-adiciones.service';

import { AsignaturaAdicionesComponent } from './asignatura-adiciones.component';

describe('AsignaturaAdiciones Management Component', () => {
  let comp: AsignaturaAdicionesComponent;
  let fixture: ComponentFixture<AsignaturaAdicionesComponent>;
  let service: AsignaturaAdicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AsignaturaAdicionesComponent],
    })
      .overrideTemplate(AsignaturaAdicionesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsignaturaAdicionesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AsignaturaAdicionesService);

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
    expect(comp.asignaturaAdiciones?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
