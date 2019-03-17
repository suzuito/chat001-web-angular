import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEntranceComponent } from './room-entrance.component';

describe('RoomEntranceComponent', () => {
  let component: RoomEntranceComponent;
  let fixture: ComponentFixture<RoomEntranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomEntranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
