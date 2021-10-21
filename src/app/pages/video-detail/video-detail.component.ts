import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/shared/models/video';
import { VideoService } from 'src/app/shared/services/video.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
})
export class VideoDetailComponent implements OnInit, AfterViewInit {
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
    window.scroll(0, 0);
    this.videoService.getYtIdsAndCreatePlaylist();

    if(this.videoService.videos.length == 0){
      this.videoService.getVideos();
    }
    this.showLoader = false;

    if(this.authService.getCurrentUser()){
      this.getFavoriteVideos();
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.videoService.getVideoByTitle(this.id);
    this.showLoader = true;
  }

  ngAfterViewInit(){
    this.document.body.classList.add('hidden');
    setTimeout(() => {
      this.showLoader = false;
      this.document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    }, 3000);
  }

  searchVideos(searchTerm) {
    this.videoService.searchVideos(searchTerm);
  }

  getVideosByLanguage(language) {
    this.videoService.language = language;
    this.videoService.getVideosByLanguage();
  }

  onChangeLanguage(value) {
    this.getVideosByLanguage(value);
    setTimeout(() => {
      this.playVideo(this.videoService.activeVideo)
    }, 1000);
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
     this.videoService.loadMore(this.videoService.loadMoreIndex++, this.videoService.getTempVideosByCurrentLanguage())
  }

  playVideo(video){
    this.videoService.activeVideo = video;
    var tempUrl = 'https://www.youtube.com/embed/'+video.id+ this.videoService.iframePart + this.videoService.playlistUrl +video.id;
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
