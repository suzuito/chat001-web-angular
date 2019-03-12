import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInputterComponent } from './room-inputter.component';

describe('RoomInputterComponent', () => {
  let component: RoomInputterComponent;
  let fixture: ComponentFixture<RoomInputterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInputterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInputterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
