import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITypeProjectComponent } from './itype-project.component';

describe('ITypeProjectComponent', () => {
  let component: ITypeProjectComponent;
  let fixture: ComponentFixture<ITypeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ITypeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ITypeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
