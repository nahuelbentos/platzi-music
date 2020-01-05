import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  constructor() { }

  getNewReleases() {
    return fetch('https://platzi-music-api.now.sh/browse/new-releases')
    .then(res => res.json());
  }
  getArtists(){
    return dataArtists.items;
  }
}
