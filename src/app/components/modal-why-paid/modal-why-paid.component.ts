import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateModalService } from 'src/app/services/donate-modal/donate-modal.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-modal-why-paid',
  templateUrl: './modal-why-paid.component.html',
  styleUrls: ['./modal-why-paid.component.scss']
})
export class ModalWhyPaidComponent implements OnInit {

  constructor(public authService: AuthService, public donateService: DonateModalService, 
    @Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showModal();
    }, 6000);
  }

  showModal(){
      if (localStorage.getItem('modalAlreadyShown') != 'true') {
          this.donateService.showModal = true;
          this.document.querySelector('body').classList.add('show-modal');
        localStorage.setItem('modalAlreadyShown', 'true');
      }
  }

  donate(){
    this.removeModal();
    this.router.navigate(['/paypal'])
  }

  removeModal(){
    this.donateService.showModal = false;
    this.document.querySelector('body').classList.remove('show-modal');
  }

}
