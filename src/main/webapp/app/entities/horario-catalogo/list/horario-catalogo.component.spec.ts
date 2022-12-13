import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HorarioCatalogoService } from '../service/horario-catalogo.service';

import { HorarioCatalogoComponent } from './horario-catalogo.component';

describe('HorarioCatalogo Management Component', () => {
  let comp: HorarioCatalogoComponent;
  let fixture: ComponentFixture<HorarioCatalogoComponent>;
  let service: HorarioCatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HorarioCatalogoComponent],
    })
      .overrideTemplate(HorarioCatalogoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioCatalogoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HorarioCatalogoService);

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
    expect(comp.horarioCatalogos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
