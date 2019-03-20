import { TestBed } from '@angular/core/testing';

import { AppRootResolverService } from './app-root-resolver.service';

describe('AppRootResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRootResolverService = TestBed.get(AppRootResolverService);
    expect(service).toBeTruthy();
  });
});
