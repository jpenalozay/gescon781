import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AsignaturaRequisitoService } from '../service/asignatura-requisito.service';

import { AsignaturaRequisitoComponent } from './asignatura-requisito.component';

describe('AsignaturaRequisito Management Component', () => {
  let comp: AsignaturaRequisitoComponent;
  let fixture: ComponentFixture<AsignaturaRequisitoComponent>;
  let service: AsignaturaRequisitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AsignaturaRequisitoComponent],
    })
      .overrideTemplate(AsignaturaRequisitoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AsignaturaRequisitoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AsignaturaRequisitoService);

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
    expect(comp.asignaturaRequisitos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
