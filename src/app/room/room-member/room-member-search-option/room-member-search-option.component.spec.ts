import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMemberSearchOptionComponent } from './room-member-search-option.component';

describe('RoomMemberSearchOptionComponent', () => {
  let component: RoomMemberSearchOptionComponent;
  let fixture: ComponentFixture<RoomMemberSearchOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomMemberSearchOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMemberSearchOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
