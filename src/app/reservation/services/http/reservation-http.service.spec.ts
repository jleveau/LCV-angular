import { TestBed, inject } from '@angular/core/testing';

import { ReservationHttpService } from './reservation-http.service';

describe('ReservationHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationHttpService]
    });
  });

  it('should be created', inject([ReservationHttpService], (service: ReservationHttpService) => {
    expect(service).toBeTruthy();
  }));
});
