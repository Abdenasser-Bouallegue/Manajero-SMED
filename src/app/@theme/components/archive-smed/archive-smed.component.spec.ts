import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSMEDComponent } from './archive-smed.component';

describe('ArchiveSMEDComponent', () => {
  let component: ArchiveSMEDComponent;
  let fixture: ComponentFixture<ArchiveSMEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveSMEDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveSMEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
