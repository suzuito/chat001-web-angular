import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Header002Component } from './header002.component';

describe('Header002Component', () => {
  let component: Header002Component;
  let fixture: ComponentFixture<Header002Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Header002Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Header002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
