import {Component, OnDestroy, OnInit} from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import {Song} from "../../model/song";
import {SongType} from "../../enum/SongType";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit, OnDestroy {
  songLists: Song[] = [];
  searchText: string = '';

  selectedSong: Song = {
    uri: '',
    name: '',
    type: '',
    singerList: []
  }
  metal: string = SongType.Metal
  private unsubscribe$ = new Subject<void>();

  constructor(private dataApiService: DataApiService) {}

  ngOnInit() {
    this.dataApiService.songs$.pipe(
      takeUntil(this.unsubscribe$),
      filter((data) => data != null)
    ).subscribe(data => {
      this.songLists = [...data]
    })
    this.fetchSongs()
  }

  // fetch Song
  fetchSongs() {
    this.dataApiService.fetchSongs().pipe(
      takeUntil(this.unsubscribe$),
      filter((data) => data != null)
    ).subscribe({next: (value: Song[]) => {
      this.songLists = value
      },
    error: err => {
      console.log(err)
    }})
  }

  /**
   * Search songs based on the song name
   *
   * @param name - Name of the song
   */
  searchSongs(name: string) {
    this.dataApiService.getSongsByName(name).pipe(
      takeUntil(this.unsubscribe$),
      filter((data) => data != null)
    ).subscribe({next:(res: Song[]) => {
      this.songLists = res;
    },
    error: err => {
      console.log(err)
    }});
  }

  /**
   * Show song detail
   *
   * @param songId
   */
  showDetails(songId: string) {
    this.selectedSong = this.songLists.find((song: Song) => song.uri === songId)!;
  }

  /**
   * Change the selected song into the metal
   */
  changeSongToMetal() {
    this.selectedSong.type = SongType.Metal;

    // FIXME Weird behavior, type get updated in the songs list but it is not reflected in the table
    this.dataApiService.updateSong(this.selectedSong)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((data) => !!data)
      )
      .subscribe({next: () => {
      },
      error: err => {
        console.log(err)
      }});
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
