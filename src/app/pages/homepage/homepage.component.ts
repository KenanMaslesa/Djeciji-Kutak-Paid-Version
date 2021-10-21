import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { ContactService } from 'src/app/services/contact-us/contact.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  addHeaderClass = false;
  addHeaderBtnClass = false;
  showContactUsMessage = false;
  faqs = [];
  constructor(
    public paymentService: PaymentService,
    public authService: AuthService,
    private contactUsService: ContactService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);

    if (this.router.url === '/' && this.authService.isLoggedIn) {
      this.router.navigate(['videos']);
    }

    AOS.init();

    this.faqs = [
      {
        question: 'Da li imate dopuštenje autora za korištenje videozapisa?',
        answer:
          'Da, naravno. Za svaki videozapis koji objavimo imamo dopuštenje njegovog vlasnika. Postavili smo ih na platformu koja omogućava autorima uvid u korištenje njihovih videozapisa te samim tim u svakom momentu imaju mogućnost da dozvole odnosno zabrane korištenje njihovog sadržaja. Sva zarada od videozapisa ide direktno autorima, mi od toga nemamo ništa, samo naplaćujemo korištenje stranice/aplikacije u koju smo uložili i u koju ulažemo dosta truda, vremena i novca.',
      },
      {
        question: 'Kako da instaliram aplikaciju?',
        howToInstall: true,
        answer: '',
      },
      {
        question: 'Da li mogu gledati sadžaj aplikacije na TV uređaju?',
        tv: true,
        answer: '',
      },
      {
        question: 'Kako da Vas kontaktiram?',
        answer:
          'Možete nam se javiti preko chata koji je dostupan na aplikaciji ili na viber/whatsapp na broj 062-889-968.',
      },
      {
        question: 'Zašto se korištenje stranice/aplikacije naplaćuje?',
        answer:
          'Kako je veliki broj ljudi počeo koristiti našu stranicu/aplikaciju došli su nam troškovi kojima se nismo nadali. Imamo mogućnost da zarađujemo na reklamama ali ne želimo djecu izlagati sadržaju koji ne možemo u potpunosti kontrolisati. Odlučili smo da simbolično naplatimo korištenje aplikacije jer smatramo da Vaše malo može mnogo olakšati njen razvoj i održavanje. Često dobijamo nove zahtjeve i ideje a za to su nam potrebna novčana sredstva. Mnogo vremena i truda smo uložili da napravimo aplikaciju i da svaki crtani film i pjesmicu detaljno pregledamo i izbacimo muziku i sve ono što je neprimjereno. Potrebna nam je Vaša novčana podrška kako bismo nastavili sa daljnjim radom i održavanjem.',
      },
      {
        question: 'Da li vršite povrat novca?',
        answer:
          'Da, ako plaćate online. Ako Vam se aplikacija ne svidi javite nam se u roku od 3 dana i vratit ćemo Vam novac na račun preko kojeg ste platili. U slučaju da budete imali poteškoće sa aplikacijom koje smo mi uzrokovali (ako ne budete mogli koristiti aplikaciju i slično), kontaktirajte nas i ako želite vratit ćemo Vam novac za taj period u kojem ste imali poteškoće nezavisno od toga da li ste platili online ili uplatnicom.',
      },
      {
        question: 'Da li moram imati paypal da bih se pretplatio?',
        answer:
          'Ne morate. Možete nam uplatiti novac uplatnicom a ako želite da platite online možete platiti preko skoro svih kartica. (Visa, MasterCard, Discover i American Express)',
      },

      {
        question:
          'Da li se pretplata automatski skida sa kartice/paypal računa?',
        answer:
          'Da, ako ste platili online, sve dok ne otkažete pretplatu. Kada platite online, zavisno od paketa, aplikacija će sama skidati novac sa računa svakog mjeseca, pola godine ili godinu dok ne otkažete pretplatu.',
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
      },
      {
        question: 'Gdje mogu pronaći uplatnice ako ne želim da plaćam online?',
        uplatnice: true,
        answer: '',
      },
      {
        question:
          'Kada se pretplatim da li ću moći gledati sav sadržaj aplikacije?',
        answer:
          'Da, moći ćete gledati sav sadržaj aplikacije koji bude dostupan u tom periodu kada se pretplatite.',
      },
    ];
  }

  ngAfterViewInit(): void {
    this.document.body.classList.remove('hidden');
    this.document.body.classList.remove('fixed');
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.document.querySelector('#tm-video').remove();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.addHeaderClass = true;
    } else {
      this.addHeaderClass = false;
    }

    if (this.bottomReachedMobileHeaderBtn()) {
      this.addHeaderBtnClass = true;
    } else {
      this.addHeaderBtnClass = false;
    }
  }

  scrollToElement($element) {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= 1000;
  }

  bottomReachedMobileHeaderBtn(): boolean {
    return window.innerHeight + window.scrollY >= 1450;
  }

  contactForm(data) {
    this.contactUsService.sendMessage(data).subscribe(
      (response) => {
        this.showContactUsMessage = true;
      },
      (error) => {
        alert('Molimo Vas pokusajte ponovo');
      }
    );
  }
}
