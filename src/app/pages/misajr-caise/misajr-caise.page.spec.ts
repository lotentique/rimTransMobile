import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisajrCaisePage } from './misajr-caise.page';

describe('MisajrCaisePage', () => {
  let component: MisajrCaisePage;
  let fixture: ComponentFixture<MisajrCaisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisajrCaisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisajrCaisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
