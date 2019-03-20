import { TestBed } from '@angular/core/testing';

import { AppRootService } from './app-root.service';

describe('AppRootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRootService = TestBed.get(AppRootService);
    expect(service).toBeTruthy();
  });
});
