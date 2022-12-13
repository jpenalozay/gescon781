import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DistritService } from '../service/distrit.service';

import { DistritComponent } from './distrit.component';

describe('Distrit Management Component', () => {
  let comp: DistritComponent;
  let fixture: ComponentFixture<DistritComponent>;
  let service: DistritService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DistritComponent],
    })
      .overrideTemplate(DistritComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DistritComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DistritService);

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
    expect(comp.distrits?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
