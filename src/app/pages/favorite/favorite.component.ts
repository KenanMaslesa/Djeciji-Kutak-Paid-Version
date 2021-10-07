import { Component, Inject, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/shared/auth.service';
import AOS from 'aos';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteVideos: Video[];
  constructor(public videoService: VideoService, public authService: AuthService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.classList.remove('hidden');
    window.scroll(0, 0);
    AOS.init();
    this.getFavoriteVideos();

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.document.querySelector('#tm-video').remove();
    }
  }

  getFavoriteVideos(){
    this.videoService.getFavoriteVideos().subscribe((response) => {
      this.favoriteVideos = response;
    });
  }

  removeFromFavorite(video){
    this.videoService.removeFromFavorite(video).subscribe((response) => {
        this.getFavoriteVideos();
    });
  }

  searchVideos(searchTerm){
    this.videoService.searchFavoriteVideos(searchTerm).subscribe((response) => (this.favoriteVideos = response));
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

}
