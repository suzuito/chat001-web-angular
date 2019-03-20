import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListEachComponent } from './room-list-each.component';

describe('RoomListEachComponent', () => {
  let component: RoomListEachComponent;
  let fixture: ComponentFixture<RoomListEachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListEachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
