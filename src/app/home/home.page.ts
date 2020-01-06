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
  song: any = {};
  currentSong: any = {};
  newTime: any;

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

  async showAlbumSongs(album) {
    const songs = await this.musicService.getAlbumTracks(album.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        album: album.name
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    });
    return await modal.present();
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
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = this.currentSong.currentTime * (1 / this.currentSong.duration);
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time) {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }

      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }

      return minutes + ':' + seconds;
    }
  }
}
