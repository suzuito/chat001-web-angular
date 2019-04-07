import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileRoomComponent } from './dialog-profile-room.component';

describe('DialogProfileRoomComponent', () => {
  let component: DialogProfileRoomComponent;
  let fixture: ComponentFixture<DialogProfileRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProfileRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProfileRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
