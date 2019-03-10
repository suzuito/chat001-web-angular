import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithIconComponent } from './checkbox-with-icon.component';

describe('CheckboxWithIconComponent', () => {
  let component: CheckboxWithIconComponent;
  let fixture: ComponentFixture<CheckboxWithIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxWithIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
