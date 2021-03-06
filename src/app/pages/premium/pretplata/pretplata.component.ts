import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-pretplata',
  templateUrl: './pretplata.component.html',
  styleUrls: ['./pretplata.component.scss']
})
export class PretplataComponent implements OnInit {
  showModal = false;
  constructor(public paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  subscriptionStatus(status){
    if(status == 'ACTIVE')
    return 'AKTIVNA';
    else if(status == 'CANCELLED')
    return 'OTKAZANA';
  }

  subscriptionDate(date){
    return  new Date(date);
  }

  cancelPaypalSubscription(){
    this.paymentService.cancelPaypalSubscription();
    this.showModal = false;
  }
}
