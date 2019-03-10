import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMessagesComponent } from './agent-messages.component';

describe('AgentMessagesComponent', () => {
  let component: AgentMessagesComponent;
  let fixture: ComponentFixture<AgentMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
