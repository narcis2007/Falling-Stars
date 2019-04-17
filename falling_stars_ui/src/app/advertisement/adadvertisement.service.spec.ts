/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdvertisementService } from './advertisement.service';

describe('Service: AddLink', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisementService]
    });
  });

  it('should ...', inject([AdvertisementService], (service: AdvertisementService) => {
    expect(service).toBeTruthy();
  }));
});
