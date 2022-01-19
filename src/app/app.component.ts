import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fade } from './route-animations';
import { PaymentService } from './shared/services/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fade
  ]
})

export class AppComponent {
  constructor(private paymentService: PaymentService){
      // this.paymentService.checkIsPremiumUser(); //paid version
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
}
