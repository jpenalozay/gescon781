import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SucursalSerieService } from '../service/sucursal-serie.service';

import { SucursalSerieComponent } from './sucursal-serie.component';

describe('SucursalSerie Management Component', () => {
  let comp: SucursalSerieComponent;
  let fixture: ComponentFixture<SucursalSerieComponent>;
  let service: SucursalSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SucursalSerieComponent],
    })
      .overrideTemplate(SucursalSerieComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SucursalSerieComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SucursalSerieService);

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
    expect(comp.sucursalSeries?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
