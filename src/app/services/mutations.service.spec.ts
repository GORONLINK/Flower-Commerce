import { TestBed } from '@angular/core/testing';

import { MutationsService } from './mutations.service';

describe('MutationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MutationsService = TestBed.get(MutationsService);
    expect(service).toBeTruthy();
  });
});
