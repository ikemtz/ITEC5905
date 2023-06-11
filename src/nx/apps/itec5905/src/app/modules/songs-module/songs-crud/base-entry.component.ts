import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import {
  AlbumProperties,
  ArtistProperties,
  GenreProperties,
  IAlbum,
  IArtist,
  ISongUpsertRequestForm,
  SongUpsertRequestFormGroupFac,
  SongUpsertRequestProperties,
} from '../../../../models/artists-webapi';
import { SongCrudFacade } from './crud.facade';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';
import { IMediaUploadRequest } from '../../../../models/media-webapi';
import {
  fileContentRegex,
  fileTypeRegex,
  photoRestrictions,
} from '../../media-module';
@Component({ template: '' })
export abstract class SongBaseEntryComponent
  extends BaseDataEntryComponent<SongCrudFacade>
  implements OnInit {
  public selectedArtist: IArtist;
  public selectedAlbum: IAlbum;
  public readonly props = SongUpsertRequestProperties;
  public readonly albumProps = AlbumProperties;
  public readonly artistProps = ArtistProperties;
  public readonly albums$: Observable<IAlbum[]>;
  public readonly artists$: Observable<IArtist[]>;
  public readonly albumFilter$ = new BehaviorSubject('');
  public readonly artistFilter$ = new BehaviorSubject('');
  public genres$: Observable<string[]>;
  public addEditForm: FormGroup<ISongUpsertRequestForm>;
  public picture: IMediaUploadRequest;
  public audio: IMediaUploadRequest;
  public pictureRestrictions = photoRestrictions;
  public musicRestrictions: FileRestrictions = {
    allowedExtensions: ['mp3'],
    maxFileSize: 10000000,
  };

  constructor(facade: SongCrudFacade) {
    super(facade);
    this.albums$ = facade.albums$.pipe(
      switchMap((albums) =>
        this.albumFilter$.pipe(
          map((albumFilter) =>
            albumFilter
              ? albums.filter(
                (album) =>
                  album.name &&
                  album.name.toLowerCase().indexOf(albumFilter) >= 0
              )
              : albums
          )
        )
      )
    );
    this.artists$ = facade.artists$.pipe(
      switchMap((artists) =>
        this.artistFilter$.pipe(
          map((artistFilter) =>
            artistFilter
              ? artists.filter(
                (artist) =>
                  artist.stageName &&
                  artist.stageName.toLowerCase().indexOf(artistFilter) >= 0
              )
              : artists
          )
        )
      )
    );
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadAlbums({
      selectors: [
        AlbumProperties.ID,
        AlbumProperties.NAME,
        AlbumProperties.PICTURE_IPFS_HASH,
        AlbumProperties.PICTURE_TYPE,
      ],
    });
    this.facade.loadArtists({
      selectors: [
        ArtistProperties.ID,
        ArtistProperties.STAGE_NAME,
        ArtistProperties.PICTURE_IPFS_HASH,
        ArtistProperties.PICTURE_TYPE,
      ],
    });
    this.facade.loadGenres({ selectors: [GenreProperties.ID] });
    this.genres$ = this.facade.genres$.pipe(
      map((x) => x.map((m) => m.id ?? ''))
    );
  }

  public initForm(): void {
    this.addEditForm = SongUpsertRequestFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleAlbumFilter(value: string) {
    this.albumFilter$.next(value.toLowerCase());
  }

  public handleArtistFilter(value: string) {
    this.artistFilter$.next(value.toLowerCase());
  }

  public selectPicture(e: SelectEvent): void {
    e.files.forEach((file) => {
      if (file && !file.validationErrors) {
        this.picture = {
          referenceType: 'Song',
          fileName: file.name,
        };
        const reader = new FileReader();
        reader.onload = (fileReadProgress) => {
          const result = fileReadProgress.target?.result as string;
          this.picture.content = fileContentRegex.exec(result)?.[0] as string;
          this.picture.fileType = fileTypeRegex.exec(result)?.[0] as string;
        };
        reader.readAsDataURL(file.rawFile as Blob);
      }
    });
  }
  public selectAudio(e: SelectEvent): void {
    e.files.forEach((file) => {
      if (file && !file.validationErrors) {
        this.audio = {
          referenceType: 'Music',
          fileName: file.name,
        };
        const reader = new FileReader();
        reader.onload = (fileReadProgress) => {
          const result = fileReadProgress.target?.result as string;
          this.audio.content = fileContentRegex.exec(result)?.[0] as string;
          this.audio.fileType = fileTypeRegex.exec(result)?.[0] as string;
        };
        reader.readAsDataURL(file.rawFile as Blob);
      }
    });
  }

  public albumSelectionChanged(item: IAlbum): void {
    this.selectedAlbum = item;
    this.addEditForm.controls.albumIds.push(new FormControl(item.id ?? '', { nonNullable: true }));
  }

  public artistSelectionChanged(item: IArtist): void {
    this.selectedArtist = item;
    this.addEditForm.controls.artistIds.push(new FormControl(item.id ?? '', { nonNullable: true }));
  }
}
