import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTextAllComponent } from './profile-text-all.component';

describe('ProfileTextAllComponent', () => {
  let component: ProfileTextAllComponent;
  let fixture: ComponentFixture<ProfileTextAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTextAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTextAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
