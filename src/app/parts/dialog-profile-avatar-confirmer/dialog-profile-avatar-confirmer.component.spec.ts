import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileAvatarConfirmerComponent } from './dialog-profile-avatar-confirmer.component';

describe('DialogProfileAvatarConfirmerComponent', () => {
  let component: DialogProfileAvatarConfirmerComponent;
  let fixture: ComponentFixture<DialogProfileAvatarConfirmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProfileAvatarConfirmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProfileAvatarConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
