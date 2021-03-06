import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/app/shared/models/payment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  showPaypalButtons = false;
  subscriptionID: any;
  activeSubscriptionPlanId;
  subscriptionDetails: any;
  subscriptionMessage: string;
  isSubscriptionActive = false;
  offlinePayment = false;
  showPaymentLoader = false;
  monthlyPlanId = environment.paypalMonthlyPlanId;
  halfyearlyPlanId = environment.paypalHalfYearlyPlanId;
  yearlyPlanId = environment.paypalYearlyPlanId;
  monthlyName = 'month';
  halfyearlyName = 'halfYear';
  yearlyName = 'year';
  monthlyRegularPriceEUR: number;
  monthlyDiscountPriceEUR = 1.8;
  monthlyPriceKM = 3.5;
  halfYearlyRegularPriceEUR = 10.8;
  halfYearlyDiscountPriceEUR = 9;
  halfYearlyPriceKM = 17.5;
  yearlyRegularPriceEUR = 21.6;
  yearlyDiscountPriceEUR = 15;
  yearlyPriceKM = 29.30;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.activeSubscriptionPlanId = this.monthlyPlanId;

    this.authService.authStatusChanged.subscribe((authStatusChanged) => {
      if(authStatusChanged){
        if(this.authService.isLoggedIn){
          // this.checkIsPremiumUser(); //paid version
          this.authService.isPremiumUser = true;
        }
        else{
          this.subscriptionMessage = null;
        }
      }
    })
  }

  onSubscriptionPlanSelected(planId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.showPaypalButtons = true;
    }
    this.activeSubscriptionPlanId = planId;
  }

  getPlanNameById(planId) {
    if (planId == this.monthlyPlanId) {
      return this.monthlyName;
    } else if (planId == this.halfyearlyPlanId) {
      return this.halfyearlyName;
    } else if (planId == this.yearlyPlanId) {
      return this.yearlyName;
    }
  }

  checkPaypalSubcription(subcriptionId) {
    const self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.subscriptionDetails = JSON.parse(this.responseText);
        self.showPaymentLoader = false;

        var dateNow = new Date();
        var next_billing_time = self.setNextPaymentDate(
          self.subscriptionDetails.plan_id,
          self.subscriptionDetails.start_time
        );
        self.subscriptionDetails.billing_info.next_billing_time =
          next_billing_time;

        if (self.subscriptionDetails.status != 'ACTIVE') {
          self.subscriptionMessage =
            'Va??a pretplata je otkazana, aplikaciju mo??ete koristiti do datuma: ';
          if (dateNow > next_billing_time) {
            self.authService.isPremiumUser = false;
            self.authService.premiumStatusChanged.emit(true);
            self.isSubscriptionActive = false;
            self.removeSubscription();
          }
        } else {
          self.authService.isPremiumUser = true;
          self.authService.premiumStatusChanged.emit(true);
          self.isSubscriptionActive = true;
          self.showPaymentLoader = false;
        }
      }
      else if (this.readyState === 4 && this.status !== 200){
        self.showPaymentLoader = false;
        self.authService.isPremiumUser = false;
      }
    };
    xhttp.open(
      'GET',
      `${environment.paypalSubscriptionApi}/${subcriptionId}`,
      true
    );
    xhttp.setRequestHeader('Authorization', environment.paypalBasicAuth);

    xhttp.send();
  }

  setNextPaymentDate(planId, startDate) {
    var date = new Date(startDate);
    if (this.getPlanNameById(planId) == this.monthlyName) {
      date = new Date(date.setMonth(date.getMonth() + 1));
    }
    if (this.getPlanNameById(planId) == this.halfyearlyName) {
      date = new Date(date.setMonth(date.getMonth() + 6));
    }
    if (this.getPlanNameById(planId) == this.yearlyName) {
      date = new Date(date.setFullYear(date.getFullYear() + 1));
    }
    return date;
  }

  cancelPaypalSubscription() {
    const self = this;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 204) {
        self.checkIsSubcriptionActive();
      }
    };
    xhttp.onerror = function () {
      alert(xhttp.responseText);
    };

    if (this.subscriptionID) {
      xhttp.open(
        'POST',
        `${environment.paypalSubscriptionApi}/${this.subscriptionID}/cancel`,
        true
      );
      xhttp.setRequestHeader('Authorization', environment.paypalBasicAuth);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.setRequestHeader(
        'Access-Control-Allow-Origin',
        'http://localhost:4200'
      );
      xhttp.send();
    } else {
      alert('Ve?? ste otkazali pretplatu');
    }
  }

  checkIsSubcriptionActive() {
    var user = this.authService.getCurrentUser();
    if (user) {
      this.getSubscriptionDetails().subscribe((responseData: Payment) => {
        if (responseData != null) {
          this.authService.isPremiumUser = true;
          for (const key in responseData) {
            this.subscriptionID = responseData[key].subID;
          }
          this.checkPaypalSubcription(this.subscriptionID);
        }
      }, error => {
        if(error.status == 401 || error.status == 501){ //delete
          location.reload();
        }
      });
    }
  }

  getSubscriptionDetails() {
    var user = this.authService.getCurrentUser();

    if (user) {
      return this.http.get(
        `${environment.firebase.database}/${
          environment.firebase.subscriptions
        }/${user.uid}.json`
      );
    }
  }

  removeSubscription() {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http
        .delete(
          `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`)
        .subscribe((response) => {
          alert('izbrisana pretplata')
          this.authService.authStatusChanged.emit(true);
          this.subscriptionID = null;
        });
    }
  }

  checkIsUplatnicaActive() {
    var user = this.authService.getCurrentUser();

    if (user) {
      return this.http
        .get(`${environment.firebase.database}/uplatnice/${user.uid}.json`)
        .subscribe((responseData) => {
          this.showPaymentLoader = false;
          if (responseData != null) {
            for (const key in responseData) {
              var date = new Date(responseData[key].uplatnica.date);
              var endDate = new Date();

              if (responseData[key].uplatnica.pretplata == 'year') {
                endDate = new Date(date.setFullYear(date.getFullYear() + 1));
              } else if (responseData[key].uplatnica.pretplata == 'halfyear') {
                endDate = new Date(date.setMonth(date.getMonth() + 6));
              }

              var now = new Date();
              if (now > endDate) {
                this.authService.isPremiumUser = false;
              } else {
                this.authService.isPremiumUser = true;
                this.offlinePayment = true;
                this.subscriptionDetails = {
                  start_time: new Date(responseData[key].uplatnica.date),
                  next_billing_time: endDate,
                };
              }
              this.authService.premiumStatusChanged.emit(true);
            }
          }
        });
    }
  }

  saveUserPayment(data) {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http.post(
        `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`,
        {
          subID: data.subscriptionID,
        }
        );
    }
  }

  checkIsPremiumUser() {
    var user = this.authService.getCurrentUser();
    if (user) {
      this.showPaymentLoader = true;
      return this.http
        .get(
          `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`)
        .subscribe((responseData) => {
          if (responseData != null) {
            this.checkIsSubcriptionActive();
          } else {
            this.checkIsUplatnicaActive();
            this.authService.isPremiumUser = false;
            this.authService.premiumStatusChanged.emit(true);
          }
        });
    }
  }
}
