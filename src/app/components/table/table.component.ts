import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Song} from "../../model/song"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() tableHeaders: string[] = []
  @Input() tableData: Song[] = []
  @Input() isAction: boolean = false
  @Output() editSongs = new EventEmitter<string>()
  @Output() details = new EventEmitter<Song>()

  editSong(uri: string) {
    this.editSongs.emit(uri)
  }
  detail(song: Song) {
    this.details.emit(song)
  }
}
