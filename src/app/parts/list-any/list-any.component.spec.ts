import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnyComponent } from './list-any.component';

describe('ListAnyComponent', () => {
  let component: ListAnyComponent;
  let fixture: ComponentFixture<ListAnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
