import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpansComponent } from './spans.component';

describe('SpansComponent', () => {
  let component: SpansComponent;
  let fixture: ComponentFixture<SpansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
