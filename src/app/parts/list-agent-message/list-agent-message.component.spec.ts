import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgentMessageComponent } from './list-agent-message.component';

describe('ListAgentMessageComponent', () => {
  let component: ListAgentMessageComponent;
  let fixture: ComponentFixture<ListAgentMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAgentMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAgentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
