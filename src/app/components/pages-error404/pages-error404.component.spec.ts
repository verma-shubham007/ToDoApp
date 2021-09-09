/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagesError404Component } from './pages-error404.component';

describe('PagesError404Component', () => {
  let component: PagesError404Component;
  let fixture: ComponentFixture<PagesError404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesError404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesError404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
