import { TestBed } from '@angular/core/testing';

import { BcryptHashService } from './bcrypt-hash.service';

describe('BcryptHashService', () => {
  let service: BcryptHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BcryptHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
