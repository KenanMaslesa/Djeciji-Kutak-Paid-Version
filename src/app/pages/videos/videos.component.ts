import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/shared/auth.service';
import AOS from 'aos';
import { Video } from 'src/app/models/video';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  favoriteVideos: Video[];
  freeVideos: Video[];
  constructor(
    public videoService: VideoService,
    public authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.document.body.classList.remove('hidden');
    this.document.body.classList.add('fixed');

    AOS.init();
    window.scroll(0, 0);

    if(!this.videoService.videos){
      this.videoService.getVideos();
    }
    else{
      this.videoService.randomizeVideos();
    }

    if(this.authService.getCurrentUser()){
      this.getFavoriteVideos();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached() && this.videoService.showLoadMoreButton) {
      this.loadMore();
    }
  }

  loadMore(): void {
     this.videoService.loadMore(this.videoService.loadMoreIndex++, this.videoService.tempVideos)
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
  }

  searchVideos(searchTerm) {
    this.videoService.searchVideos(searchTerm);
  }

  markAsFavorite(video) {
    if(!this.checkIsFavorite(video)){
      this.videoService.markAsFavorite(video).subscribe((response) => {
        this.getFavoriteVideos();
      });
    }
  }

  getFavoriteVideos() {
    this.videoService.getFavoriteVideos().subscribe((response) => {
      this.favoriteVideos = response;
    });
  }

  checkIsFavorite(video) {
    if(this.favoriteVideos == undefined) return false;

    var flag = false;
    this.favoriteVideos.forEach((videoItem) => {
      if (videoItem.id == video.id) {
        flag = true;
        return flag;
      }
    });
    return flag;
  }


  getVideosByLanguage(language){
      this.videoService.getVideosByLanguage(language);
  }

  onChangeLanguage(value){
    this.getVideosByLanguage(value);
  }
}
