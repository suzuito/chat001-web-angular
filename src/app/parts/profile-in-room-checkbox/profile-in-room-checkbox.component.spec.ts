import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInRoomCheckboxComponent } from './profile-in-room-checkbox.component';

describe('ProfileInRoomCheckboxComponent', () => {
  let component: ProfileInRoomCheckboxComponent;
  let fixture: ComponentFixture<ProfileInRoomCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInRoomCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInRoomCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
