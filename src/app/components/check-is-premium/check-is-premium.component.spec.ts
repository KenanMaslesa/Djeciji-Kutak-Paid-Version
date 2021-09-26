import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIsPremiumComponent } from './check-is-premium.component';

describe('CheckIsPremiumComponent', () => {
  let component: CheckIsPremiumComponent;
  let fixture: ComponentFixture<CheckIsPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIsPremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIsPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
