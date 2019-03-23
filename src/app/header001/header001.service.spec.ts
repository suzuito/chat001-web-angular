import { TestBed } from '@angular/core/testing';

import { Header001Service } from './header001.service';

describe('Header001Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Header001Service = TestBed.get(Header001Service);
    expect(service).toBeTruthy();
  });
});
