import { TestBed, async, inject } from '@angular/core/testing';

import { DeactivateProfileAvatarEditorGuard } from './deactivate-profile-avatar-editor.guard';

describe('DeactivateProfileAvatarEditorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeactivateProfileAvatarEditorGuard]
    });
  });

  it('should ...', inject([DeactivateProfileAvatarEditorGuard], (guard: DeactivateProfileAvatarEditorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
