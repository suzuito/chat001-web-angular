import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAvatarEditorComponent } from './profile-avatar-editor.component';

describe('ProfileAvatarEditorComponent', () => {
  let component: ProfileAvatarEditorComponent;
  let fixture: ComponentFixture<ProfileAvatarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAvatarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAvatarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
