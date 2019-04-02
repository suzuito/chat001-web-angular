import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineInputterComponent } from './multi-line-inputter.component';

describe('MultiLineInputterComponent', () => {
  let component: MultiLineInputterComponent;
  let fixture: ComponentFixture<MultiLineInputterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLineInputterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineInputterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
