import { TestBed } from '@angular/core/testing';

import { SideMenuWidthService } from './side-menu-width.service';

describe('SideMenuWidthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideMenuWidthService = TestBed.get(SideMenuWidthService);
    expect(service).toBeTruthy();
  });
});
