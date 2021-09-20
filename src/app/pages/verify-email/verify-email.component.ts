import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.showLoader = true;
    setTimeout(() => {
      this.authService.showLoader = false;
      if(this.authService.getCurrentUser().emailVerified && this.authService.isLoggedIn){
        this.router.navigate(['videos']);
      }
    }, 3000);
    
  }

}
