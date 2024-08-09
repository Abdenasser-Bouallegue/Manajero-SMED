import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashSMEDComponent } from './dash-smed.component';

describe('DashSMEDComponent', () => {
  let component: DashSMEDComponent;
  let fixture: ComponentFixture<DashSMEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashSMEDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashSMEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
