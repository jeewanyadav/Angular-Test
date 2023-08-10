export class Song {
  uri: string;
  name: string;
  type: string;
  singerList: Array<string>

  constructor(uri: string, name: string, type: string, singerList: Array<string>) {
    this.uri = uri
    this.name = name
    this.type = type
    this.singerList = singerList
  }
}
