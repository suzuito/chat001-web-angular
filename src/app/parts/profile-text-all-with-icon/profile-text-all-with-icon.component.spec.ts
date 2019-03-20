import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTextAllWithIconComponent } from './profile-text-all-with-icon.component';

describe('ProfileTextAllWithIconComponent', () => {
  let component: ProfileTextAllWithIconComponent;
  let fixture: ComponentFixture<ProfileTextAllWithIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTextAllWithIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTextAllWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
