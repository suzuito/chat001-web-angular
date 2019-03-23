import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Header001Component } from './header001.component';

describe('Header001Component', () => {
  let component: Header001Component;
  let fixture: ComponentFixture<Header001Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Header001Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Header001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
