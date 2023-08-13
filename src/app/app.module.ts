import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SongsComponent } from './components/songs/songs.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { TableComponent } from './components/table/table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, SongListComponent, SongsComponent, AddSongComponent, TableComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({}, {}), EffectsModule.forRoot([])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
