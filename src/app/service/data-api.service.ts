import { Injectable } from '@angular/core'
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs'
import { songsCollection } from '../mockData/songs'
import {Song} from "../model/song"
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class DataApiService {
  // Cache the songs list
  private readonly allSongs: Song[] = songsCollection
  private readonly songListSubject = new BehaviorSubject<Song[]>(this.allSongs)
  songs$ = this.songListSubject.asObservable()
  constructor( private localStorageService:LocalStorageService) {
    const ls = localStorageService.getISongCollection()
    if (ls.length >0) {
      this.allSongs = ls
    }
  }

  /**
   * Get list of songs
   *
   * @returns
   */
  public fetchSongs(): Observable<Song[]> {
    return of(this.allSongs)
  }

  /**
   * Get list of the songs based on song name
   *
   * @param songName
   * @returns
   */
  public getSongsByName(songName: string) {
    const songs = this.allSongs.filter((song: Song) => song.name.includes(songName))
    return new Observable<Song[]>((observer) => {
        observer.next(songs)
        observer.complete()
    })
  }

  public getSongsByUri(songUri: string) {
    const songs = this.allSongs.find((song: Song) => song.uri === songUri)
    return new Observable<Song>((observer) => {
        observer.next(songs)
        observer.complete()
    })
  }

  public addSong(song: Song): Observable<Song []> {
    this.allSongs.push(song)
    this.updateSongList(this.allSongs)
    this.localStorageService.setSongCollection(this.allSongs)
    return of(this.allSongs)
  }

  updateSong(selectedSong: Song) {
    const songIndex = this.allSongs.findIndex((song: Song) => song.uri === selectedSong.uri)
    if (songIndex !== -1) {
      this.allSongs[songIndex] = selectedSong
      this.updateSongList(this.allSongs)
      this.localStorageService.setSongCollection(this.allSongs)
      return of(this.allSongs[songIndex])
    } else {
      return throwError(() => new Error('Song with specified uri not found'))
        .pipe(
          catchError((error: any) => {
            console.error(error)
            throw error
          })
        )
    }
  }

  private updateSongList(newList: Song[]): void {
    this.songListSubject.next([...newList])
  }

}
