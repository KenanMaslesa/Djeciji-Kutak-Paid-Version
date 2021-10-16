import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  showPaypalButtons = false;
  activeSubscriptionPlanId;
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
  constructor() {
    this.activeSubscriptionPlanId = this.monthlyPlanId;
   }

  onSubscriptionPlanSelected(planId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user!=null){
      this.showPaypalButtons = true;
    }
    this.activeSubscriptionPlanId = planId;
  }

  getPlanNameById(planId){
    if(planId == this.monthlyPlanId){
      return this.monthlyName;
    }
    else if(planId == this.halfyearlyPlanId){
      return this.halfyearlyName;
    }
    else if(planId == this.yearlyPlanId){
      return this.yearlyName;
    }
  }
}
