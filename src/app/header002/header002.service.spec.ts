import { TestBed } from '@angular/core/testing';

import { Header002Service } from './header002.service';

describe('Header002Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Header002Service = TestBed.get(Header002Service);
    expect(service).toBeTruthy();
  });
});
