import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectSMEDComponent } from './new-project-smed.component';

describe('NewProjectSMEDComponent', () => {
  let component: NewProjectSMEDComponent;
  let fixture: ComponentFixture<NewProjectSMEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectSMEDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectSMEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
