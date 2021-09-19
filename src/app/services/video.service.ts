import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '../models/video';
import { AuthService } from '../shared/auth.service';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videos: Video[];
  tempVideos = [];
  activeVideo: Video;
  showLoader = false;
  showLoadMoreButton = true;
  freeVideos: Video[];
  showFreeVideos = true;
  loadMoreIndex = 1;
  ytIDs = [];
  playlistUrl: string;
  iframePart =
    '?enablejsapi=1&vq=hd1080&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&autoplay=1&loop=1&playlist=';
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.getVideos();
    this.videos = [];
  }

  randomizeVideos() {
    this.videos = this.shuffleArray(this.videos);
  }

  loadMore(index, array) {
    var counter = 0;
    if ((index + 1) * 8 > array.length) {
      this.showLoadMoreButton = false;
    }
    for (var i = index * 8; i < array.length; i++) {
      if (this.authService.isPremiumUser) {
        this.videos.push(array[i]);
        counter++;
      } else {
        if (!array[i].free) {
          this.videos.push(array[i]);
          counter++;
        }
      }

      if (counter >= 8) {
        return;
      }
    }
  }

  getFreeVideos(videos) {
    var freeVideos = [];
    videos.forEach((video) => {
      if (video.free) {
        freeVideos.push(video);
      }
    });
    return freeVideos;
  }

  createPlaylist(ytIds) {
    ytIds = this.shuffleArray(ytIds);
    var url =
      'https://www.youtube.com/embed/' +
      ytIds[0] +
      '?enablejsapi=1&vq=hd1080&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&autoplay=1&loop=1&playlist=';
    ytIds.forEach((element) => {
      url += element + ',';
    });
    this.playlistUrl = url;
  }

  getVideos() {
    this.showLoader = true;
    this.ytIDs = [];
    this.http
      .get(`assets/videos.json`)
      //.get(`${environment.firebase.database}/video.json`)
      .pipe(
        map((responseData) => {
          const videos = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.ytIDs.push(responseData[key].id);

              videos.push({
                ...responseData[key],
                firebaseId: key,
                iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                  'https://www.youtube.com/embed/' +
                    responseData[key].id +
                    this.iframePart +
                    responseData[key].id
                ),
              });
            }
          }
          return this.shuffleArray(videos);
        })
      )
      .subscribe((response) => {
        this.showFreeVideos = true;
        this.freeVideos = this.getFreeVideos(response);
        this.tempVideos = response;
        this.loadMore(0, this.tempVideos);
        this.createPlaylist(this.ytIDs);
        setTimeout(() => {
          this.showLoader = false;
        }, 1000);
      });
  }

  shuffleArray(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  getVideoById(id) {
    this.http
      .get(`assets/videos.json`)
      //.get(`${environment.firebase.database}/video.json`)
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (key == id) {
              return responseData[key];
            }
          }
        })
      )
      .subscribe((responseVideo) => {
        this.activeVideo = responseVideo;
        this.activeVideo.iframeUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://www.youtube.com/embed/' +
              responseVideo.id +
              this.iframePart +
              responseVideo.id
          );
      });
  }

  postVideo(video: Video) {
    this.showLoader = true;
    this.http
      .post(`${environment.firebase.database}/video.json`, video, {
        params: new HttpParams().set(
          'auth',
          this.authService.getCurrentUser().stsTokenManager.accessToken
        ),
      })
      .subscribe((response) => {
        this.showLoader = false;
      });
  }

  searchVideos(searchTerm) {
    this.http
    .get(`assets/videos.json`)
      //.get(`${environment.firebase.database}/video.json`)
      .pipe(
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
                iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                  'https://www.youtube.com/embed/' +
                    responseData[key].id +
                    this.iframePart +
                    responseData[key].id
                ),
              });
            }
          }
          return videos;
        })
      )
      .subscribe((response) => {
        this.showFreeVideos = false;
        this.showLoadMoreButton = false;
        this.videos = response;
      });
  }

  getVideosByLanguage(language) {
    this.http
    .get(`assets/videos.json`)
      //.get(`${environment.firebase.database}/video.json`)
      .pipe(
        map((responseData) => {
          const videos = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key].language == language || language == "all"
            ) {
              videos.push({
                ...responseData[key],
                firebaseId: key,
                iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                  'https://www.youtube.com/embed/' +
                    responseData[key].id +
                    this.iframePart +
                    responseData[key].id
                ),
              });
            }
          }
          return this.shuffleArray(videos);
        })
      )
      .subscribe((response) => {
        this.videos = response;
      });
  }

  //FAVORITES
  markAsFavorite(video) {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http.post(
        `${environment.firebase.database}/favorite/${user.uid}.json`,
        video,
        {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        }
      );
    }
  }

  removeFromFavorite(video) {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http.delete(
        `${environment.firebase.database}/favorite/${user.uid}/${video.firebaseId}.json`,
        {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        }
      );
    }
  }

  getFavoriteVideos() {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http
        .get(`${environment.firebase.database}/favorite/${user.uid}.json`, {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        })
        .pipe(
          map((responseData) => {
            const videos = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                videos.push({
                  ...responseData[key],
                  firebaseId: key,
                  iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://www.youtube.com/embed/' +
                      responseData[key].id +
                      this.iframePart +
                      responseData[key].id
                  ),
                });
              }
            }
            return videos;
          })
        );
    }
  }

  getFavoriteVideoById(id) {
    var user = this.authService.getCurrentUser();
    if (user) {
      this.http
        .get(
          `${environment.firebase.database}/favorite/${user.uid}/${id}.json`,
          {
            params: new HttpParams().set(
              'auth',
              user.stsTokenManager.accessToken
            ),
          }
        )
        .subscribe((responseVideo: Video) => {
          this.activeVideo = responseVideo;
          this.activeVideo.iframeUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' +
                responseVideo.id +
                this.iframePart +
                responseVideo.id
            );
        });
    }
  }

  searchFavoriteVideos(searchTerm) {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http
        .get(`${environment.firebase.database}/favorite/${user.uid}.json`, {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        })
        .pipe(
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
                  iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://www.youtube.com/embed/' +
                      responseData[key].id +
                      this.iframePart +
                      responseData[key].id
                  ),
                });
              }
            }
            return videos;
          })
        );
    }
  }

  getFavoriteVideosByLanguage(language) {
    var user = this.authService.getCurrentUser();
    if (user) {
      return this.http
        .get(`${environment.firebase.database}/favorite/${user.uid}.json`, {
          params: new HttpParams().set(
            'auth',
            user.stsTokenManager.accessToken
          ),
        })
        .pipe(
          map((responseData) => {
            const videos = [];
            for (const key in responseData) {
              if (
                responseData.hasOwnProperty(key) &&
                responseData[key].language == language
              ) {
                videos.push({
                  ...responseData[key],
                  firebaseId: key,
                  iframeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://www.youtube.com/embed/' +
                      responseData[key].id +
                      this.iframePart +
                      responseData[key].id
                  ),
                });
              }
            }
            return videos;
          })
        );
    }
  }
}
