import { TestBed, inject } from '@angular/core/testing';

import { FragmentService } from './fragment.service';

describe('FragmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FragmentService]
    });
  });

  it('should be created', inject([FragmentService], (service: FragmentService) => {
    expect(service).toBeTruthy();
  }));
});
