import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import AOS from 'aos';
import { PaypalService } from 'src/app/services/paypal.service';
import { FacebookService, InitParams } from 'ngx-facebook';
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
    public paypalService: PaypalService,
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
            plan_id: self.paypalService.activeSubscriptionPlanId,
            application_context: {
              shipping_preference: 'NO_SHIPPING',
            },
          });
        },
        onApprove: (data) => {
          this.authService.saveUserPayment(data).subscribe((response) => {
            this.authService.checkIsPremiumUser();
            this.router.navigate(['videos']);
          });
        },
        onError: (err) => {
          this.authService.errorMessage = err.message;
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
