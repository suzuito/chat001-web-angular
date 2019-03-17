import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRequesterComponent } from './dialog-requester.component';

describe('DialogRequesterComponent', () => {
  let component: DialogRequesterComponent;
  let fixture: ComponentFixture<DialogRequesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
