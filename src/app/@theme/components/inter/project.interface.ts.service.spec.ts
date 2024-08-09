import { TestBed } from '@angular/core/testing';

import { ProjectInterfaceTsService } from './project.interface.ts.service';

describe('ProjectInterfaceTsService', () => {
  let service: ProjectInterfaceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectInterfaceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
