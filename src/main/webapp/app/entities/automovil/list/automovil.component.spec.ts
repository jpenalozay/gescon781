import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AutomovilService } from '../service/automovil.service';

import { AutomovilComponent } from './automovil.component';

describe('Automovil Management Component', () => {
  let comp: AutomovilComponent;
  let fixture: ComponentFixture<AutomovilComponent>;
  let service: AutomovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AutomovilComponent],
    })
      .overrideTemplate(AutomovilComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutomovilComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AutomovilService);

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
    expect(comp.automovils?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
