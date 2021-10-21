import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  styleUrls: ['./desktop-nav.component.scss']
})
export class DesktopNavComponent implements OnInit {
  addHeaderClass = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.addHeaderClass = true;
    } else {
      this.addHeaderClass = false;
    }
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= 1000;
  }
}
