import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRequestComponent } from './line-request.component';

describe('LineRequestComponent', () => {
  let component: LineRequestComponent;
  let fixture: ComponentFixture<LineRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
