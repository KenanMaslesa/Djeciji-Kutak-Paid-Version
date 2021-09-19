import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
})
export class VideoDetailComponent implements OnInit {
  public id: string;
  favoriteVideos: Video[];
  showLoader = false;

  constructor(
    public videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.document.body.classList.add('hidden');
    this.showLoader = false;

    if(this.authService.getCurrentUser()){
      this.getFavoriteVideos();
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoByTitle(this.id);
    this.videoService.getVideos();
    window.scroll(0, 0);
    this.showLoader = true;
    setTimeout(() => {
      this.document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      this.showLoader = false;
    }, 3000);
  }

  searchVideos(searchTerm) {
    this.videoService.searchVideos(searchTerm);
  }

  getVideosByLanguage(language) {
    this.videoService.getVideosByLanguage(language);
  }

  onChangeLanguage(value) {
    this.getVideosByLanguage(value);
  }
  getFavoriteVideos() {
    this.videoService.getFavoriteVideos().subscribe((response) => {
      this.favoriteVideos = response;
    });
  }
  checkIsFavorite(video) {
    if(this.favoriteVideos == undefined) return false;

    var flag = false;
    if(video != undefined){
      this.favoriteVideos.forEach((videoItem) => {
        if (videoItem.id == video.id) {
          flag = true;
          return flag;
        }
      });
    }
    return flag;
  }

  markAsFavorite(video) {
    if(!this.checkIsFavorite(video)){
      this.videoService.markAsFavorite(video).subscribe((response) => {
        this.getFavoriteVideos();
      });
    }
  }

  loadMore(): void {
     this.videoService.loadMore(this.videoService.loadMoreIndex++, this.videoService.tempVideos)
  }

  playVideo(video){
    this.videoService.activeVideo = video;
    var tempUrl = 'https://www.youtube.com/embed/'+video.id+ this.videoService.iframePart + this.videoService.playlistUrl;
    this.videoService.activeVideo.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tempUrl);
    this.showLoader = true;
    setTimeout(() => {
      this.document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      this.showLoader = false;
    }, 3000);
  }

  back(){
    this.showLoader = true;
    setTimeout(() => {
      this.router.navigate(["videos"]);
    }, 100);
  }
}
