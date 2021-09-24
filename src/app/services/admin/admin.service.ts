import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Video } from 'src/app/models/video';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getVideos() {
    return this.http.get(`${environment.firebase.database}/video.json`).pipe(
      map((responseData) => {
        const videos = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            videos.push({
              ...responseData[key],
              firebaseId: key,
            });
          }
        }
        return videos;
      })
    );
  }

  addVideo(video: Video) {
    return this.http.post(
      `${environment.firebase.database}/video.json`,
      video,
      {
        params: new HttpParams().set(
          'auth',
          this.authService.getCurrentUser().stsTokenManager.accessToken
        ),
      }
    );
  }

  updateVideo(videoId, video: Video) {
    return this.http.patch(
      `${environment.firebase.database}/video/${videoId}.json`,
      video,
      {
        params: new HttpParams().set(
          'auth',
          this.authService.getCurrentUser().stsTokenManager.accessToken
        ),
      }
    );
  }

  deleteVideo(videoId) {
    return this.http.delete(
      `${environment.firebase.database}/video/${videoId}.json`,
      {
        params: new HttpParams().set(
          'auth',
          this.authService.getCurrentUser().stsTokenManager.accessToken
        ),
      }
    );
  }

  searchVideos(searchTerm) {
    return this.http.get(`${environment.firebase.database}/video.json`).pipe(
      map((responseData) => {
        const videos = [];
        for (const key in responseData) {
          if (
            responseData[key].title
              .toLowerCase()
              .indexOf(searchTerm.toLowerCase()) != -1
          ) {
            videos.push({
              ...responseData[key],
              firebaseId: key,
            });
          }
        }
        return videos;
      })
    );
  }

  saveUplatnica(data) {
    return this.http.post(
      `${environment.firebase.database}/uplatnice/${data.userUid}.json`,
      {
        uplatnica: data,
      }
    );
  }

 
  
 
}
