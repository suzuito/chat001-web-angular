import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainRoomComponent } from './header-main-room.component';

describe('HeaderMainRoomComponent', () => {
  let component: HeaderMainRoomComponent;
  let fixture: ComponentFixture<HeaderMainRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMainRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
