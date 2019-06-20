import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateService = TestBed.get(StateService);
    expect(service).toBeTruthy();
  });
  
  it('#state should return value from observable',
  (done: DoneFn) => {
	const service: StateService = TestBed.get(StateService);
	service.updateState('observable value');
	service.updateState('observable value1');
    service.state.subscribe(value => {
      expect(value).toBe('observable value1');
      done();
    });
  });
});
