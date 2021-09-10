import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(message) {
    return this.http
      .post(`${environment.firebase.database}/contact-us.json`, message)
  }

  getMessages() {
    return this.http
      .get(`${environment.firebase.database}/contact-us.json`, {params: new HttpParams().set('auth', this.authService.getCurrentUser().stsTokenManager.accessToken)})
      .pipe(
        map((responseData) => {
          const messages = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              messages.push({
                ...responseData[key],
                firebaseId: key,
              });
            }
          }
          return messages;
        })
      )
  }
}
