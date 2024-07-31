import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMEDComponent } from './smed.component';

describe('SMEDComponent', () => {
  let component: SMEDComponent;
  let fixture: ComponentFixture<SMEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SMEDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SMEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
