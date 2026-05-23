import { TestBed } from '@angular/core/testing';

import { MesuresService } from './mesures.service';

describe('MesuresService', () => {
  let service: MesuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
