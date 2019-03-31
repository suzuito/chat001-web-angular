import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRoomIntroductionComponent } from './line-room-introduction.component';

describe('LineRoomIntroductionComponent', () => {
  let component: LineRoomIntroductionComponent;
  let fixture: ComponentFixture<LineRoomIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineRoomIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRoomIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
