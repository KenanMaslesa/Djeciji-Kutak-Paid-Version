import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video/video.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-favorite-video-detail',
  templateUrl: './favorite-video-detail.component.html',
  styleUrls: ['./favorite-video-detail.component.scss']
})
export class FavoriteVideoDetailComponent implements OnInit {
  public id: string;
  favoriteVideos:  Video [];
  showLoader = false;
  constructor(public videoService: VideoService, private route: ActivatedRoute, private router: Router,private sanitizer: DomSanitizer, public authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.classList.add('hidden');
    this.getFavoriteVideosOnInit();
    this.showLoader = true;
    setTimeout(() => {
      this.document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      this.showLoader = false;
    }, 3000);
  }

  searchVideos(searchTerm){
    this.videoService.searchFavoriteVideos(searchTerm).subscribe((response) => (this.favoriteVideos = response));
  }

  getFavoriteVideos(){
    this.videoService.getFavoriteVideos().subscribe(response => {
      this.favoriteVideos = response;
      this.videoService.createFavoritePlaylist(this.videoService.favoriteYtIDs);

    })
  }

  getFavoriteVideosOnInit(){
    this.videoService.getFavoriteVideos().subscribe(response => {
      this.favoriteVideos = response;
      this.videoService.createFavoritePlaylist(this.videoService.favoriteYtIDs);
      window.scroll(0, 0);
      this.id = this.route.snapshot.paramMap.get('id');
      this.videoService.getVideoByTitle(this.id);
    })
  }

  getVideosByLanguage(language){
    if(language == 'all'){
      this.getFavoriteVideos();
      return;
    }
    this.videoService.getFavoriteVideosByLanguage(language).subscribe((response) => {
      this.favoriteVideos = response;
    });
  }

  onChangeLanguage(value){
    this.getVideosByLanguage(value);
  }

  playVideo(video){
    this.showLoader = true;
    this.videoService.activeVideo = video;
    var tempUrl = 'https://www.youtube.com/embed/'+video.id+ this.videoService.iframePart + (this.videoService.favoritePlaylistUrl!=undefined? this.videoService.favoritePlaylistUrl:video.id) ;
    this.videoService.activeVideo.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempUrl);
    setTimeout(() => {
      this.document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      this.showLoader = false;
    }, 3000);
  }
}
