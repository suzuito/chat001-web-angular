import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomMessageComponent } from './list-room-message.component';

describe('ListRoomMessageComponent', () => {
  let component: ListRoomMessageComponent;
  let fixture: ComponentFixture<ListRoomMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRoomMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoomMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
