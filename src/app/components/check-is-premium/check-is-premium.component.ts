import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-check-is-premium',
  templateUrl: './check-is-premium.component.html',
  styleUrls: ['./check-is-premium.component.scss']
})
export class CheckIsPremiumComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkIsPremiumUser();
  }

}
