import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordInputterComponent } from './dialog-password-inputter.component';

describe('DialogPasswordInputterComponent', () => {
  let component: DialogPasswordInputterComponent;
  let fixture: ComponentFixture<DialogPasswordInputterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPasswordInputterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswordInputterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
