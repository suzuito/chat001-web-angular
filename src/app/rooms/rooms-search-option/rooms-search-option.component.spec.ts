import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSearchOptionComponent } from './rooms-search-option.component';

describe('RoomsSearchOptionComponent', () => {
  let component: RoomsSearchOptionComponent;
  let fixture: ComponentFixture<RoomsSearchOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsSearchOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsSearchOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
