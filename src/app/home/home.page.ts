import { Component } from '@angular/core';
import { PlatziMusicService } from '../services/platzi-music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song = {};

  slideOpts = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };

  constructor(private musicService: PlatziMusicService, private modalController: ModalController) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      console.log('Response: ', newReleases.albums);
      this.artists = this.musicService.getArtists();
      console.log('artists: ', this.artists);
      this.songs = newReleases.albums.items.filter(e => e.album_type === 'single');
      this.albums = newReleases.albums.items.filter(e => e.album_type === 'album');
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });
    return await modal.present();
  }

  play() {
    this.song.playing = true;
  }
  pause() {
    this.song.playing = false;
  }
}
