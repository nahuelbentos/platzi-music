import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss']
})
export class SongsModalPage {
  songs: any[];
  artist: string;
  album: string;

  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    if (this.navParams.data.artist) {
      this.artist = this.navParams.data.artist;
    }
    if (this.navParams.data.album) {
      this.album = this.navParams.data.album;
    }
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }
}
