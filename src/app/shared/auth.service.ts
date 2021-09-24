import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { PaypalService } from '../services/paypal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  errorMessage: string;
  sucessMessage: string;
  loginErrorMessages: string;
  signUpErrorMessages: string;
  resetPasswordErrorMessages: string;
  resetPasswordSuccessMessages: string;
  showLoader = false;
  isPremiumUser = false;
  isSubscriptionActive = false;
  subscriptionID: any;
  subscriptionDetails: any;
  subscriptionMessage: string;
  showSubscriptionLoader = false;
  goToPaypalAfterLoginRegistration = false;
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public http: HttpClient,
    public paypalService: PaypalService
  ) {
    if(this.isLoggedIn){
      this.checkIsSubcriptionActive();
      this.checkIsPremiumUser();
    }
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        //this.checkIsPremiumUser();
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
      .signInWithEmailAndPassword(email, password)
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
            if (this.goToPaypalAfterLoginRegistration) {
              this.router.navigate(['paypal']);
            } else {
              this.router.navigate(['videos']);
            }
          }, 2000);
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
      .createUserWithEmailAndPassword(email, password)
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

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    //return user !== null && user.emailVerified ? true : false;
    return user !== null;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  //FIREBASE

  saveUserPayment(data) {
    var user = this.getCurrentUser();
    if (user) {
      return this.http.post(
        `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`,
        {
          subID: data.subscriptionID,
        },
        {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        }
      );
    }
  }

  checkIsPremiumUser() {
    var user = this.getCurrentUser();
    if (user) {
      return this.http
        .get(
          `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`,
          {
            params: new HttpParams().set(
              'auth',
              user.stsTokenManager.accessToken
            ),
          }
        )
        .subscribe((responseData) => {
          if (responseData != null) {
            this.isPremiumUser = true;
            return true;
          } else {
            this.checkIsUplatnicaActive();
            this.isPremiumUser = false;
            return false;
          }
        });
    } else {
    }
  }

  getSubscriptionDetails() {
    var user = this.getCurrentUser();

    if (user) {
      return this.http.get(
        `${environment.firebase.database}/${
          environment.firebase.subscriptions
        }/${this.getCurrentUser().uid}.json`,
        {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        }
      );
    }
  }

  removeSubscription() {
    var user = this.getCurrentUser();
    if (user) {
      return this.http
        .delete(
          `${environment.firebase.database}/${environment.firebase.subscriptions}/${user.uid}.json`,
          {
            params: new HttpParams().set(
              'auth',
              user.stsTokenManager.accessToken
            ),
          }
        )
        .subscribe((response) => {
          this.subscriptionID = null;
        });
    }
  }
  checkIsSubcriptionActive() {
    var user = this.getCurrentUser();
    if (user) {
      this.getSubscriptionDetails().subscribe((responseData: Payment) => {
        if (responseData != null) {
          for (const key in responseData) {
            this.subscriptionID = responseData[key].subID;
            this.checkPaypalSubcription(this.subscriptionID);
          }
        } 
      });
    }
  }

  checkIsUplatnicaActive() {
    var user = this.getCurrentUser();

    if (user) {
      return this.http
        .get(
          `${environment.firebase.database}/uplatnice/${
            user.uid
          }.json`,
          {
            params: new HttpParams().set(
              'auth',
              user.stsTokenManager.accessToken
            ),
          }
        )
        .subscribe((responseData) => {
          if (responseData != null) {
            for (const key in responseData) {
              var date = new Date(responseData[key].uplatnica.date);
              var endDate = new Date();

              if (responseData[key].uplatnica.pretplata == 'year') {
                 endDate = new Date(
                  date.setFullYear(date.getFullYear() + 1)
                );
                
              } else if (responseData[key].uplatnica.pretplata == 'halfyear') {
                 endDate = new Date(date.setMonth(date.getMonth() + 6));
              }

              var now = new Date();
              if(now > endDate){
                this.isPremiumUser = false
              }
              else{
                this.isPremiumUser = true;
              }

            }
          }
        });
    }
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

  //PAYPAL

  checkPaypalSubcription(subcriptionId) {
    const self = this;
    this.showSubscriptionLoader = true;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        self.subscriptionDetails = JSON.parse(this.responseText);
        self.showSubscriptionLoader = false;

        var dateNow = new Date();
        var next_billing_time = self.setNextPaymentDate(
          self.subscriptionDetails.plan_id,
          self.subscriptionDetails.start_time
        );
        self.subscriptionDetails.billing_info.next_billing_time =
          next_billing_time;

        if (self.subscriptionDetails.status != 'ACTIVE') {
          self.subscriptionMessage =
            'Vaša pretplata je otkazana, aplikaciju možete koristiti do datuma: ';
          if (dateNow >= next_billing_time) {
            self.isPremiumUser = false;
            self.isSubscriptionActive = false;
            self.removeSubscription();
          }
        } else {
          self.isPremiumUser = true;
          self.isSubscriptionActive = true;
        }
      }
    };
    xhttp.open(
      'GET',
      `${environment.paypalSubscriptionApi}/${subcriptionId}`,
      true
    );
    xhttp.setRequestHeader('Authorization', environment.paypalBasicAuth);

    xhttp.send();
  }

  setNextPaymentDate(planId, startDate) {
    var date = new Date(startDate);
    if (
      this.paypalService.getPlanNameById(planId) ==
      this.paypalService.monthlyName
    ) {
      date = new Date(date.setMonth(date.getMonth() + 1));
    }
    if (
      this.paypalService.getPlanNameById(planId) ==
      this.paypalService.halfyearlyName
    ) {
      date = new Date(date.setMonth(date.getMonth() + 6));
    }
    if (
      this.paypalService.getPlanNameById(planId) ==
      this.paypalService.yearlyName
    ) {
      date = new Date(date.setFullYear(date.getFullYear() + 1));
    }
    return date;
  }

  cancelPaypalSubscription() {
    const self = this;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 204) {
        self.checkIsSubcriptionActive();
      }
    };
    xhttp.onerror = function () {
      self.errorMessage = xhttp.responseText;
    };

    if (this.subscriptionID) {
      xhttp.open(
        'POST',
        `${environment.paypalSubscriptionApi}/${this.subscriptionID}/cancel`,
        true
      );
      xhttp.setRequestHeader('Authorization', environment.paypalBasicAuth);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.setRequestHeader(
        'Access-Control-Allow-Origin',
        'http://localhost:4200'
      );
      xhttp.send();
    } else {
      self.errorMessage = 'Već ste otkazali pretplatu';
    }
  }
}
