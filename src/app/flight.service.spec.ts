import { TestBed, inject } from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightService]
    })
 
  })

  it('#getCities should return value from observable',
  (done: DoneFn) => {
    service.getCities().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });


   //   it('#getAirlines should return value from observable',
  //   (done: DoneFn) => {
  //     service.getObservableValue().subscribe(value => {
  //       expect(value).toBe('observable value');
  //       done();
  //     });
  // });
});