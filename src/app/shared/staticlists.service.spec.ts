import { TestBed } from '@angular/core/testing';

import { StaticlistsService } from './staticlists.service';

describe('StaticlistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticlistsService = TestBed.get(StaticlistsService);
    expect(service).toBeTruthy();
  });
});
