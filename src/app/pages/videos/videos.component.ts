import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { VideoService } from 'src/app/shared/services/video.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import AOS from 'aos';
import { Video } from 'src/app/shared/models/video';
import { DOCUMENT } from '@angular/common';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit, AfterViewInit {
  favoriteVideos: Video[];
  freeVideos: Video[];
  constructor(
    public videoService: VideoService,
    public authService: AuthService,
    public paymentService: PaymentService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    AOS.init();
    this.videoService.videos = [];
    this.videoService.loadMoreIndex = 1;
    this.videoService.getVideos();

    if (this.authService.getCurrentUser()) {
      this.getFavoriteVideos();
    }
  }

  ngAfterViewInit() {
    this.document.body.classList.remove('hidden');
    this.document.body.classList.add('fixed');

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.document.querySelector('#tm-video').remove();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached() && this.videoService.showLoadMoreButton) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.videoService.loadMore(
      this.videoService.loadMoreIndex++,
      this.videoService.getTempVideosByCurrentLanguage()
    );
  }

  bottomReached(): boolean {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
    );
  }

  searchVideos(searchTerm) {
    this.videoService.searchVideos(searchTerm);
  }

  markAsFavorite(video) {
    if (!this.checkIsFavorite(video)) {
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
    if (this.favoriteVideos == undefined) return false;

    var flag = false;
    this.favoriteVideos.forEach((videoItem) => {
      if (videoItem.id == video.id) {
        flag = true;
        return flag;
      }
    });
    return flag;
  }

  getVideosByLanguage() {
    this.videoService.getVideosByLanguage();
  }

  onChangeLanguage(value) {
    this.videoService.language = value;
    this.getVideosByLanguage();
  }
}
