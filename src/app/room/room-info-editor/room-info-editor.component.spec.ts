import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfoEditorComponent } from './room-info-editor.component';

describe('RoomInfoEditorComponent', () => {
  let component: RoomInfoEditorComponent;
  let fixture: ComponentFixture<RoomInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInfoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
