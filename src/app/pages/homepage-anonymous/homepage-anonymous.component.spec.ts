import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAnonymousComponent } from './homepage-anonymous.component';

describe('HomepageAnonymousComponent', () => {
  let component: HomepageAnonymousComponent;
  let fixture: ComponentFixture<HomepageAnonymousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageAnonymousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
