import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { VideosComponent } from './pages/videos/videos.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { RoleGuard } from './shared/guard/role.guard';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { FavoriteVideoDetailComponent } from './pages/favorite-video-detail/favorite-video-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactMessagesComponent } from './components/admin-components/contact-messages/contact-messages.component';
import { AdminVideosComponent } from './components/admin-components/admin-videos/admin-videos.component';
import { PretplataComponent } from './pages/pretplata/pretplata.component';
import { HomepageAnonymousComponent } from './pages/homepage-anonymous/homepage-anonymous.component';
import { UplatniceComponent } from './components/admin-components/uplatnice/uplatnice.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/videos', pathMatch: 'full' },
  { path: '', component: HomepageAnonymousComponent },
  { path: 'pocetna', component: HomepageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'video/:id', component: VideoDetailComponent },
  { path: 'paypal', component: PaypalComponent },
  { path: 'omiljeno', component: FavoriteComponent, canActivate: [AuthGuard] },
  {
    path: 'omiljeno/:id',
    component: FavoriteVideoDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'pretplata', component: PretplataComponent, canActivate: [AuthGuard] },
  
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] },
  { path: 'admin/uplatnice', component: UplatniceComponent, canActivate: [RoleGuard] },
  { path: 'admin/videos', component: AdminVideosComponent, canActivate: [RoleGuard] },
  { path: 'admin/messages', component: ContactMessagesComponent, canActivate: [RoleGuard] },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
