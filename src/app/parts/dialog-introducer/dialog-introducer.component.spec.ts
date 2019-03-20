import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIntroducerComponent } from './dialog-introducer.component';

describe('DialogIntroducerComponent', () => {
  let component: DialogIntroducerComponent;
  let fixture: ComponentFixture<DialogIntroducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIntroducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIntroducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
