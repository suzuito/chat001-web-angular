import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmerComponent } from './dialog-confirmer.component';

describe('DialogConfirmerComponent', () => {
  let component: DialogConfirmerComponent;
  let fixture: ComponentFixture<DialogConfirmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
