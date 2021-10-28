import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { DesktopNavComponent } from '../components/navigation/desktop-nav/desktop-nav.component';
import { MobileNavigationComponent } from '../components/navigation/mobile-navigation/mobile-navigation.component';
import { ScrollToAnchorDirective } from './directives/scroll-to-anchor.directive';
import { ShowOnlyForPremiumUsersDirective } from './directives/show-only-for-premium-users.directive';

@NgModule({
  declarations: [
    FooterComponent,
    LoaderComponent,
    DesktopNavComponent,
    MobileNavigationComponent,
    ScrollToAnchorDirective,
    ShowOnlyForPremiumUsersDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    LoaderComponent,
    DesktopNavComponent,
    MobileNavigationComponent,
    ScrollToAnchorDirective,
    ShowOnlyForPremiumUsersDirective,
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
