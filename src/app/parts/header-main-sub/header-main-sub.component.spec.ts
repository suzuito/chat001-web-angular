import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainSubComponent } from './header-main-sub.component';

describe('HeaderMainSubComponent', () => {
  let component: HeaderMainSubComponent;
  let fixture: ComponentFixture<HeaderMainSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMainSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
