import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SongsComponent } from './components/songs/songs.component';
import { AddSongComponent } from './components/add-song/add-song.component';

@NgModule({
  declarations: [AppComponent, SongListComponent, SongsComponent, AddSongComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
