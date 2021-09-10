import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretplataComponent } from './pretplata.component';

describe('PretplataComponent', () => {
  let component: PretplataComponent;
  let fixture: ComponentFixture<PretplataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretplataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PretplataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
