import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import {Song} from "../../model/song"
import {Router} from "@angular/router"

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongListComponent {
  @Input()
  songLists: Song[] = []

  @Output()
  onSongViewDetailClicked: EventEmitter<string> = new EventEmitter<string>()
  headers = ['S.N','Name', 'Type', 'Singers']
  constructor(private router: Router) {}


  /**
   * Emit song id to parent
   *
   * @param song - Selected song
   */
  viewDetail(song: Song) {
    this.onSongViewDetailClicked.emit(song.uri)
  }

  /**
   * Open form with the prefilled data and allow to update the content
   */
  editSongs(uri: string) {
    this.router.navigate([`/edit/${uri}`])
  }

}
