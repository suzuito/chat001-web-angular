import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubMainComponent } from './header-sub-main.component';

describe('HeaderSubMainComponent', () => {
  let component: HeaderSubMainComponent;
  let fixture: ComponentFixture<HeaderSubMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSubMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSubMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
