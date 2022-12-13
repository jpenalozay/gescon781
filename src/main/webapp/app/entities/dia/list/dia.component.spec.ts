import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DiaService } from '../service/dia.service';

import { DiaComponent } from './dia.component';

describe('Dia Management Component', () => {
  let comp: DiaComponent;
  let fixture: ComponentFixture<DiaComponent>;
  let service: DiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DiaComponent],
    })
      .overrideTemplate(DiaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DiaService);

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
    expect(comp.dias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
