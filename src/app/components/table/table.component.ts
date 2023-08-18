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

  /**
   * Combine List of singers in the form of
   * eg.
   * [A] -> A
   * [A,B] -> A and B
   * [A,B,B] -> A, B and C
   * [A,B,C,D] -> A, B , C and D
   * [A,B,C,D,E,F] -> A, B, C, D, E and 1 Others
   * [A,B,C,D,E,F,G] -> A, B, C, D, E and 2 Others
   * @param valueArray
   * @returns
   */
  combineSingerList(valueArray: Array<any>) {
    const maxVisibleSingers = 10;
    const remainingSingerCount = valueArray.length - maxVisibleSingers;

    if (valueArray.length === 1) {
      return valueArray[0];
    } else if (valueArray.length <= maxVisibleSingers) {
      return valueArray.slice(0, -1).join(', ') + ' and ' + valueArray[valueArray.length - 1];
    } else {
      return valueArray.slice(0, maxVisibleSingers).join(', ') + `, and ${remainingSingerCount} Other${remainingSingerCount > 1 ? 's' : ''}`;
    }
  }
  detail(song: Song) {
    this.details.emit(song)
  }
  songTrackBy(index: number) {
    return index
  }
}
