import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoleSelectorComponent } from './dialog-role-selector.component';

describe('DialogRoleSelectorComponent', () => {
  let component: DialogRoleSelectorComponent;
  let fixture: ComponentFixture<DialogRoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRoleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
