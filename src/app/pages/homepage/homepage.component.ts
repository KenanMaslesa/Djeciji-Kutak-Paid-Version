import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import AOS from 'aos';
import { ContactService } from 'src/app/services/contact-us/contact.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  addHeaderClass = false;
  showContactUsMessage = false;
  faqs = [];
  constructor(public paypalService: PaypalService, public authService: AuthService, 
    private contactUsService: ContactService, @Inject(DOCUMENT) private document: Document) {

  }
  

  ngOnInit(): void {
    this.document.body.classList.remove('hidden');
    this.document.body.classList.remove('fixed');

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.document.querySelector('#tm-video').remove();
    }
    
    this.authService.checkIsPremiumUser();
    AOS.init();
    window.scroll(0, 0);
    
    this.faqs = [
      {
        question: 'Zašto se korištenje stranice/aplikacije naplaćuje?',
        answer: 'Kako je veliki broj ljudi počeo koristiti našu stranicu/aplikaciju došli su nam veći troškovi a i zahtjevi. Odlučili smo da simbolično naplatimo korištenje naše aplikacije kako bi tim sredstvima mogli platiti troškove i unaprijediti razvoj i održavanje stranice/aplikacije.'
      },
      {
        question: 'Da li moram imati paypal da bih se pretplatio?',
        answer: 'Ne morate. Možete platiti preko skoro svih kartica. (Visa, MasterCard, Discover i American Express)'
      },
      {
        question: 'Kako da se pretplatim?',
        answer: 'Uskoro ćemo snimiti video.',
      },
      {
        question: 'Da li se pretplata automatski skida sa kartice/paypal računa?',
        answer: 'Da, sve dok ne otkažete pretplatu. Kada se pretplatite, zavisno od paketa, aplikacija će sama skidati novac sa računa svakog mjeseca, pola godine ili godinu dok ne otkažete pretplatu.',
      },
      {
        question: 'Kako da otkazem pretplatu?',
        isPremium: true,
        answer: '',
      },
    ];
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

  contactForm(data){
    this.contactUsService.sendMessage(data).subscribe(response => {
      this.showContactUsMessage = true;
    }, error => {
      alert('Molimo Vas pokusajte ponovo')
    })
  }
}
