import { TestBed, inject } from '@angular/core/testing';

import { Error.NotifierService } from './error.notifier.service';

describe('Error.NotifierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Error.NotifierService]
    });
  });

  it('should be created', inject([Error.NotifierService], (service: Error.NotifierService) => {
    expect(service).toBeTruthy();
  }));
});
