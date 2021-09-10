import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  constructor(public videoService: VideoService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  searchVideos(searchTerm){
    this.videoService.searchVideos(searchTerm);
  }
}
