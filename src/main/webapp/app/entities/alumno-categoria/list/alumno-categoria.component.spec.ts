import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AlumnoCategoriaService } from '../service/alumno-categoria.service';

import { AlumnoCategoriaComponent } from './alumno-categoria.component';

describe('AlumnoCategoria Management Component', () => {
  let comp: AlumnoCategoriaComponent;
  let fixture: ComponentFixture<AlumnoCategoriaComponent>;
  let service: AlumnoCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AlumnoCategoriaComponent],
    })
      .overrideTemplate(AlumnoCategoriaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AlumnoCategoriaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AlumnoCategoriaService);

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
    expect(comp.alumnoCategorias?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
