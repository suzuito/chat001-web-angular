import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRequestApprovedComponent } from './line-request-approved.component';

describe('LineRequestApprovedComponent', () => {
  let component: LineRequestApprovedComponent;
  let fixture: ComponentFixture<LineRequestApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineRequestApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRequestApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
