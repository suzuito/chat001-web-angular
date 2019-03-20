import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomMessageEachComponent } from './list-room-message-each.component';

describe('ListRoomMessageEachComponent', () => {
  let component: ListRoomMessageEachComponent;
  let fixture: ComponentFixture<ListRoomMessageEachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoomMessageEachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomMessageEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
