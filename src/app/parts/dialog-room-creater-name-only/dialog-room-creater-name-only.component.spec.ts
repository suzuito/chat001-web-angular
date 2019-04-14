import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoomCreaterNameOnlyComponent } from './dialog-room-creater-name-only.component';

describe('DialogRoomCreaterNameOnlyComponent', () => {
  let component: DialogRoomCreaterNameOnlyComponent;
  let fixture: ComponentFixture<DialogRoomCreaterNameOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRoomCreaterNameOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoomCreaterNameOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
