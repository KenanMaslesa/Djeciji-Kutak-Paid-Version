import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guard/auth.guard";
import { FavoriteVideoDetailComponent } from "./favorite-video-detail/favorite-video-detail.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { PretplataComponent } from "./pretplata/pretplata.component";

const routes : Routes = [
  {
    path: 'omiljeno',
    component: FavoriteComponent,
    canActivate: [AuthGuard],
    data: { animation: 'FavoritePage' },
  },
  {
    path: 'omiljeno/:id',
    component: FavoriteVideoDetailComponent,
    canActivate: [AuthGuard],
    data: { animation: 'FavoriteDetailPage' },
  },
  {
    path: 'pretplata',
    component: PretplataComponent,
    canActivate: [AuthGuard],
    data: { animation: 'SubscriptionPage' },
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule{

}
