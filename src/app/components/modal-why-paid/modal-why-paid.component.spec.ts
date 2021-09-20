import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWhyPaidComponent } from './modal-why-paid.component';

describe('ModalWhyPaidComponent', () => {
  let component: ModalWhyPaidComponent;
  let fixture: ComponentFixture<ModalWhyPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWhyPaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWhyPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
