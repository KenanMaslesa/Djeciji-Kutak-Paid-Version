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
import { VideosComponent } from './pages/videos/videos.component';
import { VideoDetailComponent } from './pages/video-detail/video-detail.component';
import { PaypalComponent } from './pages/paypal/paypal.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthNavComponent } from './components/navigation/auth-nav/auth-nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PremiumModule } from './pages/premium/premium.module';
import { YoutubeComponent } from './pages/youtube/youtube.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    VideosComponent,
    VideoDetailComponent,
    PaypalComponent,
    HomepageComponent,
    AuthNavComponent,
    NotFoundComponent,
    YoutubeComponent,
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
    SharedModule,
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
