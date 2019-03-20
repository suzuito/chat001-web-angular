import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputterComponent } from './password-inputter.component';

describe('PasswordInputterComponent', () => {
  let component: PasswordInputterComponent;
  let fixture: ComponentFixture<PasswordInputterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordInputterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
