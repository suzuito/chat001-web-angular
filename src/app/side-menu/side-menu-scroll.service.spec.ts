import { TestBed } from '@angular/core/testing';

import { SideMenuScrollService } from './side-menu-scroll.service';

describe('SideMenuScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideMenuScrollService = TestBed.get(SideMenuScrollService);
    expect(service).toBeTruthy();
  });
});
