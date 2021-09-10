import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteVideoDetailComponent } from './favorite-video-detail.component';

describe('FavoriteVideoDetailComponent', () => {
  let component: FavoriteVideoDetailComponent;
  let fixture: ComponentFixture<FavoriteVideoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteVideoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteVideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
