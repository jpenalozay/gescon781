import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ComputadoraService } from '../service/computadora.service';

import { ComputadoraComponent } from './computadora.component';

describe('Computadora Management Component', () => {
  let comp: ComputadoraComponent;
  let fixture: ComponentFixture<ComputadoraComponent>;
  let service: ComputadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ComputadoraComponent],
    })
      .overrideTemplate(ComputadoraComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ComputadoraComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ComputadoraService);

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
    expect(comp.computadoras?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
