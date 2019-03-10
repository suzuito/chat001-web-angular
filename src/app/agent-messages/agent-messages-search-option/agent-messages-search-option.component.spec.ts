import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMessagesSearchOptionComponent } from './agent-messages-search-option.component';

describe('AgentMessagesSearchOptionComponent', () => {
  let component: AgentMessagesSearchOptionComponent;
  let fixture: ComponentFixture<AgentMessagesSearchOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMessagesSearchOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMessagesSearchOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
