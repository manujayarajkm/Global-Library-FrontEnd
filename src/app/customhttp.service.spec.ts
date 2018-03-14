import { TestBed, inject } from '@angular/core/testing';

import { CustomhttpService } from './customhttp.service';

describe('CustomhttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomhttpService]
    });
  });

  it('should be created', inject([CustomhttpService], (service: CustomhttpService) => {
    expect(service).toBeTruthy();
  }));
});
