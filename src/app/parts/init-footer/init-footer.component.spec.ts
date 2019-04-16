import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitFooterComponent } from './init-footer.component';

describe('InitFooterComponent', () => {
  let component: InitFooterComponent;
  let fixture: ComponentFixture<InitFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
