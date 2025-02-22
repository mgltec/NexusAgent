/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FiguresComponent } from './Figures.component';

describe('FiguresComponent', () => {
  let component: FiguresComponent;
  let fixture: ComponentFixture<FiguresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiguresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
