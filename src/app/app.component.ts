import { Component } from '@angular/core';
import { PaymentService } from './shared/services/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private paymentService: PaymentService){
      this.paymentService.checkIsPremiumUser();
  }
}
