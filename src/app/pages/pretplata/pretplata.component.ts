import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-pretplata',
  templateUrl: './pretplata.component.html',
  styleUrls: ['./pretplata.component.scss']
})
export class PretplataComponent implements OnInit {
  showModal = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkIsSubcriptionActive();
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
    this.authService.cancelPaypalSubscription();
    this.showModal = false;
  }
}
