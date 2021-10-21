import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { VideosComponent } from './pages/videos/videos.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { MobileNavigationComponent } from './components/navigation/mobile-navigation/mobile-navigation.component';
import { FavoriteVideoDetailComponent } from './pages/favorite-video-detail/favorite-video-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminComponent } from './pages/admin/admin.component';
import { ContactMessagesComponent } from './components/admin-components/contact-messages/contact-messages.component';
import { AdminVideosComponent } from './components/admin-components/admin-videos/admin-videos.component';
import { PretplataComponent } from './pages/pretplata/pretplata.component';
import { DesktopNavComponent } from './components/navigation/desktop-nav/desktop-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthNavComponent } from './components/navigation/auth-nav/auth-nav.component';
import { UplatniceComponent } from './components/admin-components/uplatnice/uplatnice.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ShowOnlyForPremiumUsersDirective } from './shared/directives/show-only-for-premium-users.directive';
import { ScrollToAnchorDirective } from './shared/directives/scroll-to-anchor.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    LoaderComponent,
    VideosComponent,
    VideoDetailComponent,
    PaypalComponent,
    HomepageComponent,
    FavoriteComponent,
    MobileNavigationComponent,
    FavoriteVideoDetailComponent,
    AdminComponent,
    ContactMessagesComponent,
    AdminVideosComponent,
    PretplataComponent,
    DesktopNavComponent,
    FooterComponent,
    AuthNavComponent,
    UplatniceComponent,
    NotFoundComponent,
    ShowOnlyForPremiumUsersDirective,
    ScrollToAnchorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
