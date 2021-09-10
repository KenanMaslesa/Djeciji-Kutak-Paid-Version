import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { AdminService } from 'src/app/services/admin/admin.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.scss']
})
export class AdminVideosComponent implements OnInit {

  videos: Video[];
  editVideoId: any;
  constructor(private adminService: AdminService, public videoService: VideoService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.adminService.getVideos().subscribe((response) => {
      this.videos = response;
    });
  }

  updateVideo(video: Video) {
    var videoId = this.editVideoId;
    this.adminService.updateVideo(videoId, video).subscribe((response) => {this.getVideos()});
  }

  deleteVideo(videoId) {
    this.adminService.deleteVideo(videoId).subscribe((response) => {this.getVideos()});
  }

  addVideo(video: Video){
    this.adminService.addVideo(video).subscribe((response) => {this.getVideos()});
  }

  searchVideos(searchTerm) {
    this.adminService.searchVideos(searchTerm).subscribe((response) => {
      this.videos = response;
    });
  }

}
