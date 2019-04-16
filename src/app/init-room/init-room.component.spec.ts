import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitRoomComponent } from './init-room.component';

describe('InitRoomComponent', () => {
  let component: InitRoomComponent;
  let fixture: ComponentFixture<InitRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
