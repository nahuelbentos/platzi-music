import { Injectable } from '@angular/core';
import * as dataArtists from './artists.json';

@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {
  constructor() {}

  getNewReleases() {
    return fetch('https://platzi-music-api.now.sh/browse/new-releases').then(res => res.json());
  }
  getArtists() {
    return dataArtists.items;
  }
  getArtistTopTracks(artistId) {
    return fetch(`https://platzi-music-api.now.sh/artists/${artistId}/top-tracks?country=UY`).then(res => res.json());
  }

  getAlbumTracks(albumId) {
    return fetch(`https://platzi-music-api.now.sh/albums/${albumId}/tracks?country=CO`).then(response => response.json());
  }
  
  searchTracks(text) {
    return fetch(`https://platzi-music-api.now.sh/search?q=${text}&type=track`).then(response => response.json());
  }
}
