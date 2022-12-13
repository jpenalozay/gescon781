import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TeoriaHorarioCatalogoService } from '../service/teoria-horario-catalogo.service';

import { TeoriaHorarioCatalogoComponent } from './teoria-horario-catalogo.component';

describe('TeoriaHorarioCatalogo Management Component', () => {
  let comp: TeoriaHorarioCatalogoComponent;
  let fixture: ComponentFixture<TeoriaHorarioCatalogoComponent>;
  let service: TeoriaHorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TeoriaHorarioCatalogoComponent],
    })
      .overrideTemplate(TeoriaHorarioCatalogoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TeoriaHorarioCatalogoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TeoriaHorarioCatalogoService);

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
    expect(comp.teoriaHorarioCatalogos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
