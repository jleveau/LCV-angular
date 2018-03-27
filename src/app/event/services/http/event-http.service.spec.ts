import { TestBed, inject } from '@angular/core/testing';

import { EventHttpService } from './event-http.service';

describe('EventHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventHttpService]
    });
  });

  it('should be created', inject([EventHttpService], (service: EventHttpService) => {
    expect(service).toBeTruthy();
  }));
});
