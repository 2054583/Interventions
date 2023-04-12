import { TestBed } from '@angular/core/testing';

import { TypeProblemeService } from './type-probleme.service';

describe('TypeProblemeService', () => {
  let service: TypeProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
