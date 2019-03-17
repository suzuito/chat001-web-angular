import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTextAllWithIcon2Component } from './profile-text-all-with-icon2.component';

describe('ProfileTextAllWithIcon2Component', () => {
  let component: ProfileTextAllWithIcon2Component;
  let fixture: ComponentFixture<ProfileTextAllWithIcon2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTextAllWithIcon2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTextAllWithIcon2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
