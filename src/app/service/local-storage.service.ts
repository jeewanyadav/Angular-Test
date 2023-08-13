import {Injectable} from "@angular/core";
import {Song} from "../model/song";

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  private readonly songsCollection: string = 'songsCollection'
  private readonly unsavedSongData: string = 'unsavedSongData'
  constructor() {
  }

  public setSongCollection(item: Song[]) {
    localStorage.setItem(this.songsCollection, JSON.stringify(item))
  }

  public getISongCollection() {
    try {
      const storedData = localStorage.getItem(this.songsCollection);
      if (storedData) {
        return JSON.parse(storedData);
      }
      return [];
    } catch (error) {
      console.error('Error parsing local storage data:', error);
      return [];
    }
  }

  public setUnSavedSong(songData: Song) {
    localStorage.setItem(this.unsavedSongData, JSON.stringify(songData))
  }

  public getUnSavedSong() {
    try {
      const storedData = localStorage.getItem(this.unsavedSongData);
      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      console.error('Error parsing local storage data:', error);
      return null;
    }
  }

  public clearUnSavedData() {
    localStorage.removeItem(this.unsavedSongData)
  }
}
