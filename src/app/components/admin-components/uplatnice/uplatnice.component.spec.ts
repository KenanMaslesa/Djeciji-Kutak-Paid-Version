import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplatniceComponent } from './uplatnice.component';

describe('UplatniceComponent', () => {
  let component: UplatniceComponent;
  let fixture: ComponentFixture<UplatniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplatniceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UplatniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
