import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favorite-video-detail',
  templateUrl: './favorite-video-detail.component.html',
  styleUrls: ['./favorite-video-detail.component.scss']
})
export class FavoriteVideoDetailComponent implements OnInit {
  public id: string;
  favoriteVideos:  Video [];
  constructor(public videoService: VideoService, private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.getFavoriteVideosOnInit();
  }

  searchVideos(searchTerm){
    this.videoService.searchFavoriteVideos(searchTerm).subscribe((response) => (this.favoriteVideos = response));
  }

  getFavoriteVideos(){
    this.videoService.getFavoriteVideos().subscribe(response => {
      this.favoriteVideos = response;
      this.videoService.createPlaylist(this.videoService.favoriteYtIDs);

    })
  }

  getFavoriteVideosOnInit(){
    this.videoService.getFavoriteVideos().subscribe(response => {
      this.favoriteVideos = response;
      this.videoService.createPlaylist(this.videoService.favoriteYtIDs);
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
}
