import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProgressiveComponent } from './dialog-progressive.component';

describe('DialogProgressiveComponent', () => {
  let component: DialogProgressiveComponent;
  let fixture: ComponentFixture<DialogProgressiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProgressiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
