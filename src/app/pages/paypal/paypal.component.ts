import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import AOS from 'aos';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { DOCUMENT } from '@angular/common';
declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  planId = 'P-1WH391004G147653JMEA5OQQ';
  showPaypalButtons: boolean;
  offlinePayment = false;
  onlinePayment = false;

  constructor(
    private authService: AuthService,
    public router: Router,
    public paymentService: PaymentService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.document.body.classList.remove('hidden');

    const self = this;
    paypal
      .Buttons({
        style: {
          shape: 'pill',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function (data, actions) {
          return actions.subscription.create({
            plan_id: self.paymentService.activeSubscriptionPlanId,
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        },
        onApprove: (data) => {
          this.paymentService.saveUserPayment(data).subscribe((response) => {
            this.paymentService.checkIsPremiumUser();
            this.router.navigate(['videos']);
          });
        },
        onError: (err) => {
          alert(err.message);
        },
      })
      .render(this.paypalElement.nativeElement);

    AOS.init();
  }


  onlinePaymentClicked() {
    if (!this.authService.isLoggedIn) {
      this.authService.goToPaypalAfterLoginRegistration = true;
      this.authService.loginErrorMessages =
        'Molimo Vas prvo se registrujte/prijavite.';
      this.router.navigate(['auth']);
    }
  }
}
