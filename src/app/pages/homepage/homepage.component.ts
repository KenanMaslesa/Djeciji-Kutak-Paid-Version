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
  addHeaderBtnClass = false;
  showContactUsMessage = false;
  faqs = [];
  constructor(public paypalService: PaypalService, public authService: AuthService, 
    private contactUsService: ContactService, @Inject(DOCUMENT) private document: Document,) {

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
        question: 'Kako da instaliram aplikaciju?',
        howToInstall: true,
        answer: '',
      },
      {
        question: 'Zašto se korištenje stranice/aplikacije naplaćuje?',
        answer: 'Kako je veliki broj ljudi počeo koristiti našu stranicu/aplikaciju došli su nam veći troškovi, a tome se nismo nadali. Imamo mogućnost da zarađujemo na reklamama ali ne želimo djecu izlagati sadržaju koji ne možemo u potpunosti kontrolisati. Odlučili smo da simbolično naplatimo korištenje aplikacije jer smatramo da Vaše malo može mnogo olakšati njen razvoj i održavanje. Često dobijamo nove zahtjeve i ideje a za to su nam potrebna novčana sredstva. Mnogo vremena i truda smo uložili da napravimo aplikaciju i da svaki crtani film i pjesmicu detaljno pregledamo i izbacimo muziku i sve ono što je neprimjereno. Potrebna nam je Vaša novčana podrška kako bismo nastavili sa daljnjim radom i održavanjem.'
      },
      {
        question: 'Da li moram imati paypal da bih se pretplatio?',
        answer: 'Ne morate. Možete platiti preko skoro svih kartica. (Visa, MasterCard, Discover i American Express)'
      },
    
      {
        question: 'Da li se pretplata automatski skida sa kartice/paypal računa?',
        answer: 'Da, sve dok ne otkažete pretplatu. Kada se pretplatite, zavisno od paketa, aplikacija će sama skidati novac sa računa svakog mjeseca, pola godine ili godinu dok ne otkažete pretplatu.',
      },
      
      {
        question: 'Kako da se pretplatim?',
        howToSubs: true,
        answer: '',
      },
      {
        question: 'Kako da otkažem pretplatu?',
        cancelSubs: true,
        answer: '',
      }
     
    ];
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.addHeaderClass = true;
    } else {
      this.addHeaderClass = false;
    }

    if(this.bottomReachedMobileHeaderBtn()){
      this.addHeaderBtnClass = true;
    }
    else{
      this.addHeaderBtnClass = false;
    }
  }

  scrollToElement($element){
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= 1000;
  }

  bottomReachedMobileHeaderBtn(): boolean {
    return window.innerHeight + window.scrollY >= 1450;
  }

  contactForm(data){
    this.contactUsService.sendMessage(data).subscribe(response => {
      this.showContactUsMessage = true;
    }, error => {
      alert('Molimo Vas pokusajte ponovo')
    })
  }
}
