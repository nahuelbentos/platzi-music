import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];

  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  constructor(private musicService: PlatziMusicService) {}

  ionViewDidEnter() {

    this.musicService.getNewReleases().then(newReleases => {
      console.log('Response: ', newReleases.albums);
      this.artists = this.musicService.getArtists();
      console.log('artists: ', this.artists);
      this.songs = newReleases.albums.items.filter(e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(e => e.album_type === 'album');
    });
  }
}
