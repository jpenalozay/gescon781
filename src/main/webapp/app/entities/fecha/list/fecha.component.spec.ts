import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FechaService } from '../service/fecha.service';

import { FechaComponent } from './fecha.component';

describe('Fecha Management Component', () => {
  let comp: FechaComponent;
  let fixture: ComponentFixture<FechaComponent>;
  let service: FechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FechaComponent],
    })
      .overrideTemplate(FechaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FechaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FechaService);

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
    expect(comp.fechas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
