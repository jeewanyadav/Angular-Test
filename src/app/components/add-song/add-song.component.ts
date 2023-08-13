import {Component, HostListener, OnDestroy, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {ActivatedRoute, Router} from "@angular/router"
import {DataApiService} from "../../service/data-api.service"
import {filter, Subject, takeUntil} from "rxjs"
import {Song} from "../../model/song"
import {LocalStorageService} from "../../service/local-storage.service";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit, OnDestroy {
  songForm!: FormGroup
  availableTypes = ['pop', 'rock', 'metal']
  private unsubscribe$ = new Subject<void>()
  uri!: string
  isFormSubmit: boolean = false

  constructor(private fb: FormBuilder,
              private activatedRoute:ActivatedRoute,
              private dataApiService:DataApiService,
              private router: Router,
              private localStorageService:LocalStorageService) {}

  ngOnInit() {
    this.songForm = this.fb.group({
      name: ['', Validators.required],
      uri:  ['', Validators.required],
      singerList: ['', Validators.required],
      type: [null, Validators.required],
    })
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe$),
      filter((data) => data != null)
    ).subscribe(uri=> {
      this.uri = uri['uri']
      if (this.uri) {
        this.getSongByUri(uri['uri'])
      } else {
        if (this.localStorageService.getUnSavedSong()) {
          const ls = this.localStorageService.getUnSavedSong()
          if (ls.uri || ls.name || ls.singerList || ls.type) {
            const result = window.confirm('Your previous changes are unsaved. Would you like to proceed?')
            if (result) {
              this.restoreUnsavedData()
            } else {
              this.clearUnsavedData()
            }
          }
        }
      }
    })
  }

  getSongByUri(uri: string) {
    this.dataApiService.getSongsByUri(uri).pipe(
      takeUntil(this.unsubscribe$),
      filter((data) => data != null)
    ).subscribe({next:(res: Song) => {
      this.songForm.patchValue({
        uri: res.uri,
        name: res.name,
        type: res.type,
        singerList: res.singerList.toString()
      })
    },error: err => {
        console.log(err)
      }})
  }

  // save or update Song
  onSubmit() {
    this.isFormSubmit = true
    if (this.uri && this.songForm.valid) {
      this.isFormSubmit = false
      this.dataApiService.updateSong(this.songForm.value).pipe(
        takeUntil(this.unsubscribe$),
        filter((data) => data != null)
      ).subscribe({next: () => {
        this.clearUnsavedData()
        this.router.navigate([''])
      },
      error: err => {
        console.log(err)
      }})
    } else {
      this.songForm.patchValue({uri: this.songForm.value.name.replaceAll(' ', '')})
      if (this.songForm.valid) {
        this.isFormSubmit = false
        const formData = this.songForm.value
        formData.singerList = formData.singerList.split(',').map((item: string) => item.trim())
        this.dataApiService.addSong(formData).pipe(
          takeUntil(this.unsubscribe$),
          filter((data) => data != null)
        ).subscribe({next:(data: Song[])=>{
          this.clearUnsavedData()
          this.router.navigate([''])
        }, error: err => {
            console.log(err)
          }})
      }
    }

  }

  // clear data after save
  clearUnsavedData() {
    this.localStorageService.clearUnSavedData()
  }

  // restore data after unexpected close while adding
  restoreUnsavedData() {
    const unsavedData = this.localStorageService.getUnSavedSong()
    if (unsavedData) {
      this.songForm.patchValue(JSON.parse(unsavedData))
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.songForm.dirty && !this.uri) {
      this.saveUnsavedData()
      $event.returnValue = true
    }
  }

  // Save unsaved data in localStorage
  saveUnsavedData() {
    this.localStorageService.setUnSavedSong( this.songForm.value)
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
