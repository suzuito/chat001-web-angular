import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMemberComponent } from './room-member.component';

describe('RoomMemberComponent', () => {
  let component: RoomMemberComponent;
  let fixture: ComponentFixture<RoomMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
