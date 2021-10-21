import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  loginErrorMessages: string;
  signUpErrorMessages: string;
  resetPasswordErrorMessages: string;
  resetPasswordSuccessMessages: string;
  showLoader = false;
  isPremiumUser = false;
  goToPaypalAfterLoginRegistration = false;
  premiumStatusChanged = new EventEmitter<boolean>();
  authStatusChanged = new EventEmitter<boolean>();
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public http: HttpClient
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.isPremiumUser = false;
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.showLoader = true;
    return this.afAuth
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then((result) => {
        this.ngZone.run(() => {
          /*if(this.getCurrentUser()){
            if(this.getCurrentUser().emailVerified != true){
            this.loginErrorMessages = "Molimo Vas verifikujte svoju email adresu. Ako ste već verifikovali onda izadjite i ponovo udjite u aplikaciju (refrešujte stranicu) i bit ćete automatski prijavljeni.";
            this.showLoader = false;
          }
          else{
              this.showLoader = false;
              this.router.navigate(['videos']);
          }
        }
          else{
            setTimeout(() => {
              this.showLoader = false;
              this.router.navigate(['videos']);
            }, 1000);
          }*/

          setTimeout(() => {
            this.showLoader = false;
            this.authStatusChanged.emit(true);

            if (this.goToPaypalAfterLoginRegistration) {
              this.router.navigate(['paypal']);
            } else {
              this.router.navigate(['videos']);
            }
          }, 1000);
        });
      })
      .catch((error) => {
        this.showLoader = false;
        this.loginErrorMessages = this.getErrorMessage(error);
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    this.showLoader = true;

    return this.afAuth
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((result) => {
        setTimeout(() => {
          this.showLoader = false;
          //this.SendVerificationMail();
          if (this.goToPaypalAfterLoginRegistration) {
            this.router.navigate(['paypal']);
          } else {
            this.router.navigate(['videos']);
          }
        }, 2000);
      })
      .catch((error) => {
        this.showLoader = false;
        this.signUpErrorMessages = this.getErrorMessage(error);
      });
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.resetPasswordSuccessMessages =
          'Poslali smo Vam email, molimo Vas provjerite inbox.';
      })
      .catch((error) => {
        this.resetPasswordErrorMessages = this.getErrorMessage(error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.goToPaypalAfterLoginRegistration = false;
      this.router.navigate(['']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return user !== null && user.emailVerified ? true : false;
    return user !== null;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getErrorMessage(error) {
    if (error.code == 'auth/invalid-email') {
      return 'Unesite ispravnu email adresu.';
    }
    if (error.code == 'auth/wrong-password') {
      return 'Lozinka nije tačna.';
    }
    if (error.code == 'auth/user-not-found') {
      return 'Ne postoji korisnik sa tom email adresom.';
    }
    if (error.code == 'auth/weak-password') {
      return 'Lozinka mora imati 6 ili više karaktera';
    }

    if (error.code == 'auth/email-already-in-use') {
      return 'Email adresu već koristi drugi korisnik';
    } else {
      return error.message;
    }
  }
}
