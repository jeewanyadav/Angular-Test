import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongsComponent} from "./components/songs/songs.component";
import {AddSongComponent} from "./components/add-song/add-song.component";

const routes: Routes = [
  { path: '', component: SongsComponent},
  { path: 'add', component: AddSongComponent },
  { path: 'edit/:uri', component: AddSongComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
