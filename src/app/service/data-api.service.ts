import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { songsCollection } from '../mockData/songs';
import {Song} from "../model/song";

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  // Cache the songs list
  private readonly allSongs: Song[] = songsCollection;
  private readonly songListSubject = new BehaviorSubject<Song[]>(this.allSongs);
  songs$ = this.songListSubject.asObservable();
  constructor() {}

  /**
   * Get list of songs
   *
   * @returns
   */
  public fetchSongs(): Observable<Song[]> {
    return of(this.allSongs);
  }

  /**
   * Get list of the songs based on song name
   *
   * @param songName
   * @returns
   */
  public getSongsByName(songName: string) {
    const songs = this.allSongs.filter((song: Song) => song.name.includes(songName));

    return new Observable<Song[]>((observer) => {
      setTimeout(() => {
        observer.next(songs);
        observer.complete()
      }, 2000);
    });
  }

  public getSongsByUri(songUri: string) {
    const songs = this.allSongs.find((song: Song) => song.uri === songUri);

    return new Observable<Song>((observer) => {
      setTimeout(() => {
        observer.next(songs);
        observer.complete()
      }, 2000);
    });
  }

  public addSong(song: Song): Observable<Song []> {
    songsCollection.push(song)
    this.updateSongList(songsCollection);
    return of(songsCollection);
  }

  public updateSong(selectedSong: Song): Observable<Song> {
    const songIndex = songsCollection.findIndex((song) => song.uri === selectedSong.uri);
    if (songIndex !== -1) {
      songsCollection[songIndex] = selectedSong;
      this.updateSongList(songsCollection);
      return of(songsCollection[songIndex]);
    } else {
      return throwError('Song with specified uri not found');
    }
  }

  private updateSongList(newList: Song[]): void {
    this.songListSubject.next([...newList]);
  }
}
