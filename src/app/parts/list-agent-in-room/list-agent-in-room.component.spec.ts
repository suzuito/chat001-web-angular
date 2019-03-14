import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgentInRoomComponent } from './list-agent-in-room.component';

describe('ListAgentInRoomComponent', () => {
  let component: ListAgentInRoomComponent;
  let fixture: ComponentFixture<ListAgentInRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAgentInRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAgentInRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
