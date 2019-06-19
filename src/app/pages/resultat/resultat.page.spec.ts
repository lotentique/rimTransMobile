import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatPage } from './resultat.page';

describe('ResultatPage', () => {
  let component: ResultatPage;
  let fixture: ComponentFixture<ResultatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
