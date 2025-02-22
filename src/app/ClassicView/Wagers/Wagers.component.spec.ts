/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WagersComponent } from './Wagers.component';

describe('WagersComponent', () => {
  let component: WagersComponent;
  let fixture: ComponentFixture<WagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
