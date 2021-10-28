import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { VideosComponent } from './pages/videos/videos.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { FavoriteComponent } from './pages/premium/favorite/favorite.component';
import { FavoriteVideoDetailComponent } from './pages/premium/favorite-video-detail/favorite-video-detail.component';
import { PretplataComponent } from './pages/premium/pretplata/pretplata.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, data: { animation: 'HomePage' } },
  {
    path: 'pocetna',
    component: HomepageComponent,
    data: { animation: 'HomePage' },
  },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'premium', loadChildren: () => import('./pages/premium/premium.module').then(m => m.PremiumModule) },
  { path: 'auth', component: AuthComponent, data: { animation: 'AuthPage' } },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'videos',
    component: VideosComponent,
    data: { animation: 'VideoPage' },
  },
  {
    path: 'video/:id',
    component: VideoDetailComponent,
    data: { animation: 'VideoDetailPage' },
  },
  { path: 'paypal', component: PaypalComponent },
  { path: '404', component: NotFoundComponent },
  //{ path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
