import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LugarSalidaService } from '../service/lugar-salida.service';

import { LugarSalidaComponent } from './lugar-salida.component';

describe('LugarSalida Management Component', () => {
  let comp: LugarSalidaComponent;
  let fixture: ComponentFixture<LugarSalidaComponent>;
  let service: LugarSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LugarSalidaComponent],
    })
      .overrideTemplate(LugarSalidaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LugarSalidaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LugarSalidaService);

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
    expect(comp.lugarSalidas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
