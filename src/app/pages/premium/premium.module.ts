import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoriteVideoDetailComponent } from './favorite-video-detail/favorite-video-detail.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PremiumRoutingModule } from './premium-routing.module';
import { PretplataComponent } from './pretplata/pretplata.component';

@NgModule({
  declarations: [
    FavoriteComponent,
    FavoriteVideoDetailComponent,
    PretplataComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    PremiumRoutingModule
  ],
  providers: [],
})
export class PremiumModule { }
