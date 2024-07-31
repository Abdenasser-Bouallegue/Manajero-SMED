import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTutoComponent } from './new-tuto.component';

describe('NewTutoComponent', () => {
  let component: NewTutoComponent;
  let fixture: ComponentFixture<NewTutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
