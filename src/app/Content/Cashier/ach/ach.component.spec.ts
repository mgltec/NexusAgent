/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AchComponent } from './ach.component';

describe('AchComponent', () => {
  let component: AchComponent;
  let fixture: ComponentFixture<AchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
