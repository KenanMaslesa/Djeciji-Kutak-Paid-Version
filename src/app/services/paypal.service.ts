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
  constructor() {
    this.activeSubscriptionPlanId = this.monthlyPlanId;
   }

  onSubscriptionPlanSelected(planId) {
    this.showPaypalButtons = true;
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
